const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtImg = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('sons/luna-rise-part-one.mp3');
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const somAlertaFimTempo = new Audio('sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

//quando o botão 'focoBt' receber o evento 'click', chamamos uma função
focoBt.addEventListener('click', () => {
    //a função vai dar o valor 'foco' ao atributo 'data-contexto'
    //html.setAttribute('data-contexto', 'foco');
    //banner.setAttribute('src', '/imagens/foco.png');
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    //html.setAttribute('data-contexto', 'descanso-curto');
    //banner.setAttribute('src', '/imagens/descanso-curto.png')
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    //html.setAttribute('data-contexto', 'descanso-longo');
    //banner.setAttribute('src', '/imagens/descanso-longo.png')
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

// //o change é o evento que usamos para checkbox
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

//função para alterar os botões 'junto'
function alterarContexto(contexto){
    mostrarTempo();
    //para cada botão, eu chamo uma função
    //a função recebe contexto, que é específico para cada botão e só é ativado quando o botão é clicado
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            //alterar algo dentro do html, um conteúdo
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    //quando o tempo zerar, chamamos a função zerar e mostramos um alerta
    if (tempoDecorridoEmSegundos <= 0){
        somAlertaFimTempo.play();
        alert('Tempo finalizado!');
        //se o pomodoro estiver no modo foco, o focoAtivo receberá algo
        //quer dizer que estamos fazendo uma tarefa
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            //instanciando uma classe para criar um evento
            const evento = new CustomEvent('FocoFinalizado');
            //permitindo que outras partes possam ouvir e reagir a esse evento
            document.dispatchEvent(evento);
        }
        zerar();
        return //para interromper o código
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    //se o intervaloId tiver um valor, ou seja, estiver contando e não for zero, podemos clicar no botão para zerar
    if(intervaloId){
        zerar();
        somPause.play();
        return
    }
    //usamos o setInterval para executar um método a cada intervalo de tempo (em milissegundos)
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    iniciarOuPausarBtImg.setAttribute('src', 'imagens/pause.png');
}

function zerar(){
    //usamos o clearInterval para parar a execução iniciada anteriormente, e depois voltamos com o valor de intervaloId para null
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarOuPausarBtImg.setAttribute('src', 'imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo(){
    //o método date fornece algumas configurações padrão para datas, horários...
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();