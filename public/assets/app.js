import { Estoque } from "../Estoque.js";
import { Produto } from "../Produto.js";
import { ProdutoPerecivel } from "../ProdutoPerecivel.js";

// Criando o primeiro Objeto
const estoque = new Estoque();
let produtoSelecionado = null;
document.addEventListener('DOMContentLoaded', () => {
    const btnAdicionar = document.getElementById('adicionarProdutoBtn');
    const btnAtualizar = document.getElementById('atualizarProdutoBtn');
    
    btnAdicionar.addEventListener('click', adicionarOuAtualizarProduto);
    btnAtualizar.addEventListener('click', adicionarOuAtualizarProduto);
    atualizarListaProdutos(estoque);
});

function adicionarOuAtualizarProduto(){

    const id = produtoSelecionado ? produtoSelecionado._id : Date.now();
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const dataValidade = document.getElementById('dataValidade').value;

    let produto;
    if(dataValidade){
        produto = new ProdutoPerecivel(id, nome, preco, quantidade, dataValidade);
    }else{
        produto = new Produto(id, nome, preco, quantidade);
    }

    if(produtoSelecionado){
        estoque.atualizarProduto(produto);
        mostrarMensagem('Produto atualizado com sucesso!');
    }else{
        estoque.adicionarProduto(produto);
        mostrarMensagem('Produto adicionado com sucesso!');
    }
    resetarFormulárioELista(estoque);
}

function resetarFormulárioELista(){
    produtoSelecionado = null;
    document.getElementById('produtoForm').reset();
    atualizarListaProdutos(estoque);
    document.getElementById('adicionarProdutoBtn').classList.remove('d-none');
    document.getElementById('atualizarProdutoBtn').classList.add('d-none');
}

function atualizarListaProdutos(estoque){
    const produtosListados = document.getElementById('produtosListados');
    produtosListados.innerHTML = '';
    estoque.produtos.forEach(produto => {
        const item = document.createElement('div');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const texto = document.createElement('span');
        texto.textContent = produto.descricao();
        item.appendChild(texto);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn btn-info ml-2';
        btnEditar.onclick = () => selecionarProdutoParaEditar(produto);
        

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btn btn-danger ml-2';
        btnExcluir.onclick = () => removerProduto(produto._id);
        item.appendChild(btnEditar);
        item.appendChild(btnExcluir);
        produtosListados.appendChild(item);
    });
}

function removerProduto(id) {
    estoque.removerProduto(id);
    mostrarMensagem("Produto removido com sucesso!");
    atualizarListaProdutos(estoque);
}

function selecionarProdutoParaEditar(produto){
    document.getElementById('nome').value = produto._nome;
    document.getElementById('preco').value = produto._preco;
    document.getElementById('quantidade').value = produto._quantidade;
    document.getElementById('dataValidade').value = produto._dataValidade || '';
    document.getElementById('adicionarProdutoBtn').classList.add('d-none');
    document.getElementById('atualizarProdutoBtn').classList.remove('d-none');
    produtoSelecionado = produto;
}

function mostrarMensagem(texto, tipo = 'success'){
    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = `alert alert-${tipo} mt-3`;
    mensagemDiv.textContent = texto;
    document.querySelector('.container').prepend(mensagemDiv);
    setTimeout(() => {
        mensagemDiv.remove();
    }, 3000);
}