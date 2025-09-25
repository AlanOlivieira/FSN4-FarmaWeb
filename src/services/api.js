import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", 
});

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("accessToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!refreshToken || !user) {
          throw new Error("Sem refresh token");
        }

        const res = await axios.post("http://localhost:3000/auth/refresh", {
          userId: user.id,
          role: user.role,
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken, user: newUser } =
          res.data;

        setAuthToken(accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("user", JSON.stringify(newUser));

        return api(originalRequest);
      } catch (err) {
        console.error("Erro ao renovar token:", err);
        setAuthToken(null);
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default api;
