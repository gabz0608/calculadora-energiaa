// Removemos o alert fantasma para não travar a página
const botaoSimples = document.getElementById("botao-simples");
const botaoAvancado = document.getElementById("botao-avancada");

const telaSimples = document.getElementById("calc-simples");
const telaAvancada = document.getElementById("calc-avancada");

// ELEMENTOS DA CALCULADORA SIMPLES
const seletorEquipamento = document.getElementById('seletor');
const inputHorasSimples = document.getElementById('horas'); // Ajustado para evitar conflito de escopo
const inputDiasSimples = document.getElementById('dias');   // Ajustado para evitar conflito de escopo
const botaoCalcularSimples = document.getElementById('botao-resultado');

// ELEMENTOS DA CALCULADORA AVANÇADA
const inputNome = document.getElementById('nome-equipamento');
const inputPotencia = document.getElementById('potencia');
const inputHorasAvancada = document.getElementById('horas-uso');
const inputDiasAvancada = document.getElementById('dias-uso');

const adicionar = document.getElementById('adicionar-item');
const calculototal = document.getElementById('botao-calculo-total');
const tabelaCorpo = document.getElementById('lista-equipamentos');

// ELEMENTOS DE RESULTADO (Compartilhados ou duplicados conforme IDs fornecidos)
const resultadokwhhoras = document.getElementById('kwh-hora');
const resultadoreaishora = document.getElementById('reais-hora');
const resultadoreaismes = document.getElementById('reais-mes');

const tarifakwh = 1.02; 
let listaEquipamentos = [];

// ALTERNÂNCIA DE ABAS
botaoAvancado.addEventListener("click", function() {
    telaAvancada.style.display = "block";
    telaSimples.style.display = "none";

    botaoAvancado.classList.add("aba-active");
    botaoSimples.classList.remove("aba-active");
});

botaoSimples.addEventListener("click", function() {
    telaSimples.style.display = "block";
    telaAvancada.style.display = "none";

    botaoSimples.classList.add("aba-active");
    botaoAvancado.classList.remove("aba-active");
});

// LÓGICA DA CALCULADORA SIMPLES
botaoCalcularSimples.addEventListener('click', function() {
    const PotenciaTexto = seletorEquipamento.value.replace('W', '');
    const PotenciaNumero = parseInt(PotenciaTexto) || 0;

    let horasDigitadas = inputHorasSimples.value;
    let diasDigitados = inputDiasSimples.value;

    const horasUso = Number(horasDigitadas) || 0;
    const diasUso = Number(diasDigitados) || 0;

    const consumoKwhhora = (PotenciaNumero * horasUso * diasUso) / 1000;

    const custoReaisMes = consumoKwhhora * tarifakwh;
    const custoReaisHora = (PotenciaNumero / 1000) * tarifakwh;

    resultadokwhhoras.innerText = consumoKwhhora.toFixed(2) + " kWh/mês";
    resultadoreaismes.innerText = "R$ " + custoReaisMes.toFixed(2) + "/mês";
    resultadoreaishora.innerText = "R$ " + custoReaisHora.toFixed(2) + "/h";
});

// LÓGICA DA CALCULADORA AVANÇADA
adicionar.addEventListener('click', function() {
    const nome = inputNome.value;
    const potencia = parseFloat(inputPotencia.value);
    const horas = parseFloat(inputHorasAvancada.value);
    const dias = parseFloat(inputDiasAvancada.value);

    if (!nome || isNaN(potencia) || isNaN(horas) || isNaN(dias)) {
        return;
    }

    listaEquipamentos.push({ nome, potencia, horas, dias });

    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${potencia}W</td>
        <td>${horas}h/dia (${dias} dias)</td>
    `;
    tabelaCorpo.appendChild(novaLinha);

    inputNome.value = '';
    inputPotencia.value = '';
    inputHorasAvancada.value = '';
    inputDiasAvancada.value = '';
});

calculototal.addEventListener('click', function() {
    if (listaEquipamentos.length === 0) {
        return;
    }

    let totalKwhMes = 0;
    let totalReaisHora = 0;

    listaEquipamentos.forEach(item => {
        const kwhDoItem = (item.potencia * item.horas * item.dias) / 1000;
        totalKwhMes += kwhDoItem;

        const custoHoraDoItem = (item.potencia / 1000) * tarifakwh;
        totalReaisHora += custoHoraDoItem;
    });

    const totalReaisMes = totalKwhMes * tarifakwh;

    resultadokwhhoras.innerText = `${totalKwhMes.toFixed(2)} kWh/mês`;
    resultadoreaishora.innerText = `R$ ${totalReaisHora.toFixed(2)}/h`;
    resultadoreaismes.innerText = `R$ ${totalReaisMes.toFixed(2)}/mês`;
});