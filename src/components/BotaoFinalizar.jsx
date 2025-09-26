import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function BotaoFinalizar({ onClick }) {
  const [hover, setHover] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!currentUser) {
      navigate('/login-required');
      return;
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? '#fff' : '#0052b4',
        color: hover ? '#0052b4' : '#fff',
        border: `2px solid #0052b4`,
        padding: '10px 16px',
        width: '100%',
        fontSize: '16px',
        borderRadius: '6px',
        marginTop: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      Finalizar Compra
    </button>
  );
}

export default BotaoFinalizar;