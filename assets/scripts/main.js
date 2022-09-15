// Mascara do CEP e CPF 
$(document).ready(function () { 
    var $maskCpf = $("#CPF");
    $maskCpf.mask('000.000.000-00', {reverse: true});

    var $maskCep = $("#CEP");
    $maskCep.mask('00000-000', {reverse: true});
});

// Função para preencher o formulário

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

// integração de API com o campo 'CEP'

const pesquisarCep = async() => {
    const cep = document.getElementById('CEP').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    const dados = await fetch(url);
    const endereco = await dados.json();
    console.log(endereco);
}

//função de clicar fora do campo para auto-preencher

document.getElementById('CEP')
        .addEventListener('focusout', pesquisarCep);