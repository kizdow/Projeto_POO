import { Produto } from "./Produto.js";
import { ProdutoPerecivel } from "./ProdutoPerecivel.js";

export class Estoque{
    constructor(){
        this.produtos = this.carregarProdutos();
    }

    adicionarProduto(produto){
        this.produtos.push(produto);
        this.salvarProdutos();
    }

    atualizarProduto(produtoAtualizado){
        const index = this.produtos.findIndex(produto => produto._id === produtoAtualizado._id);
        if(index >= 0){
            this.produtos[index] = produtoAtualizado;
            this.salvarProdutos();
        }
    }

    salvarProdutos(){
        localStorage.setItem('produtos', JSON.stringify(this.produtos));
    }


    removerProduto(id) {
        this.produtos = this.produtos.filter(produto => produto._id !== id);
        this.salvarProdutos();
    }

    carregarProdutos(){
        const produtosData = localStorage.getItem('produtos');
        if(produtosData){
            return JSON.parse(produtosData).map(produto => {
                if(produto._dataValidade){
                    return new ProdutoPerecivel(
                            produto._id, 
                            produto._nome,
                            produto._preco, 
                            produto._quantidade, 
                            produto._dataValidade
                        );
                }
                return new Produto(
                    produto._id, 
                    produto._nome,
                    produto._preco, 
                    produto._quantidade
                );
            });
        }
        return [];
    }
}