const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

//quando o botão 'focoBt' receber o evento 'click', chamamos uma função
focoBt.addEventListener('click', () => {
    //a função vai dar o valor 'foco' ao atributo 'data-contexto'
    html.setAttribute('data-contexto', 'foco');
});

curtoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
});

longoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
});