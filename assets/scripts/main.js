// Mascara do CEP e CPF
$(document).ready(function () {
  var $maskCpf = $('#CPF');
  $maskCpf.mask('000.000.000-00', { reverse: true });

  var $maskCep = $('#CEP');
  $maskCep.mask('00000-000', { reverse: true });
});

// Função para preencher o formulário
const preencherFormulario = endereco => {
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
};

// integração de API com o campo 'CEP'
const pesquisarCep = async () => {
  const cep = document.getElementById('CEP').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  // Validação do CEP
  const cepValido = cep => cep.length == 9;

  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();

    if (endereco.hasOwnProperty('erro')) {
      alert('CEP inválido');
    } else {
      preencherFormulario(endereco);
    }
  } else {
    alert('CEP inválido');
  }
};

// Função de clicar fora do campo para auto-preencher
document.getElementById('CEP').addEventListener('focusout', pesquisarCep);

document.getElementById('CPF').addEventListener('focusout', validaCpf);

// Validação do CPF
function validaCpf() {
  var cpf = document.getElementById('CPF').value,
    cpfSoNumero = cpf.replace(/\.|-/g, ''),
    dezPrimeirosNumeros = cpfSoNumero.substr(0, 10),
    somaDosNovePrimeirosNumeros = multiplicarNumeros(9, cpfSoNumero, 10),
    somaDosDezPrimeirosNumeros = multiplicarNumeros(10, cpfSoNumero, 11);

  var resultadoModulo1 = (somaDosNovePrimeirosNumeros * 10) % 11;
  var resultadoModulo2 = (somaDosDezPrimeirosNumeros * 10) % 11;

  if (
    resultadoModulo1.toString() + resultadoModulo2.toString() ===
    cpfSoNumero.substr(9, 2)
  ) {
    return true;
  } else {
    alert('CPF inválido');
  }
}

function multiplicarNumeros(quantidadeDeNumeros, cpfSoNumero, multiplicador) {
  var primeirosNumeros = cpfSoNumero.substr(0, quantidadeDeNumeros),
    somaDosNumeros = 0;

  for (var i = 0; i < primeirosNumeros.length; i++) {
    var numero = primeirosNumeros.substr(i, 1);
    console.log(numero);
    somaDosNumeros += numero * multiplicador;
    multiplicador--;
  }

  return somaDosNumeros;
}
