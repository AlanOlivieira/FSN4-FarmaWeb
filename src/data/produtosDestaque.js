import produtos from "./produtos";


const produtosDestaque = Object.values(produtos)
    .flat()
    .filter(produto => produto.destaque);

export default produtosDestaque
