import { Produto } from "./Produto.js";

export class ProdutoPerecivel extends Produto{
    constructor(id, nome, preco, quantidade, dataValidade){
        super(id, nome, preco, quantidade);
        this._dataValidade = dataValidade;
    }

    descricao(){
        return `${super.descricao()} Expira em: ${this._dataValidade}`;
    }

}