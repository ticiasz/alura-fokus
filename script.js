const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

//quando o botão 'focoBt' receber o evento 'click', chamamos uma função
focoBt.addEventListener('click', () => {
    //a função vai dar o valor 'foco' ao atributo 'data-contexto'
    //html.setAttribute('data-contexto', 'foco');
    //banner.setAttribute('src', '/imagens/foco.png');
    alterarContexto('foco');
});

curtoBt.addEventListener('click', () => {
    //html.setAttribute('data-contexto', 'descanso-curto');
    //banner.setAttribute('src', '/imagens/descanso-curto.png')
    alterarContexto('descanso-curto');
});

longoBt.addEventListener('click', () => {
    //html.setAttribute('data-contexto', 'descanso-longo');
    //banner.setAttribute('src', '/imagens/descanso-longo.png')
    alterarContexto('descanso-longo');
});

//função para alterar os botões 'junto'
function alterarContexto(contexto){
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