// Máscara do CEP e CPF
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

// Integração de API com o campo 'CEP'
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
    somaDosNovePrimeirosNumeros = multiplicarNumeros(9, cpfSoNumero, 10),
    somaDosDezPrimeirosNumeros = multiplicarNumeros(10, cpfSoNumero, 11),
    resultadoModulo1 = obterDigitoVerificador(somaDosNovePrimeirosNumeros),
    resultadoModulo2 = obterDigitoVerificador(somaDosDezPrimeirosNumeros);

  if (
    resultadoModulo1 + resultadoModulo2 === cpfSoNumero.substr(9, 2)
  ) {
    return true;
  } else {
    alert('CPF inválido');
  }
}

function obterDigitoVerificador(soma) {
    var resultado = (soma * 10) % 11;
    return resultado.toString();
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
// Função pra adicionar e remover caixa de texto no input do hobby
var counter = 1;
var textBox = "";
const hob = document.getElementById("hob");
function addBox() {
  var div = document.createElement("div");
  
  div.setAttribute("class","input");
  div.setAttribute("id","box_"+counter);

  textBox = '<div class="input"><span class="input-group-text" id="inputGroup-sizing-default">Hobby '+counter+'</span><input type="text" id="hobby_'+counter+'" name="hobby[]" class="myinput form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required /> <input type="button" class="mybox" value="-" onclick="removeBox(this)" /></div>';
  div.innerHTML = textBox;

  hob.appendChild(div);

  counter++;
}

function removeBox(ele) {
  (ele.parentNode.remove());
}
