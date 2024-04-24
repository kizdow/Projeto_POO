export class Produto{
    constructor(id, nome, preco, quantidade){
        // criar atributos protegidos(protected)
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this._quantidade = quantidade;
    }

    // métodos getter
    get nome(){
        return this._nome;
    }
    get quantidade(){
        return this._quantidade;
    }
    get preco(){
        return this._preco;
    }

    // métodos setter
    set quantidade(novaQuantidade){
        this._quantidade = novaQuantidade;
    }
    set nome(novoNome){
        this._nome = novoNome;
    }
    set preco(novoPreco){
        this._preco = novoPreco;
    }

    descricao(){
        return `${this._nome} custa R$${this._preco} e temos ${this._quantidade} em estoque`;
    }
}