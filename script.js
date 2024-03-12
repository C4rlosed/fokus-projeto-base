const html = document.querySelector('html');

//BOTÕES 
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
//TEMPORIZADOR
const displayTempo = document.querySelector('#timer');
//IMAGEM
const banner = document.querySelector('.app__image');
const iconePlay = document.querySelector('.app__card-primary-butto-icon')
//TÍTULO
const titulo = document.querySelector('.app__title');
//BOTÃO COMEÇAR
const botaoIniciar = document.querySelector('.app__card-primary-button');
//DURAÇÃO
const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;
//MUSICA
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPause = new Audio('/sons/pause.mp3')
const somPlay = new Audio('/sons/play.wav')
const somTempoFinalizado = new Audio('/sons/beep.mp3')
//START
const startPauseBt = document.querySelector('#start-pause');
const startOuPauseBt = document.querySelector('#start-pause span');


let tempoDecorridoEmSegundos = 5
let intervaloId

musica.loop = true;

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})


focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
        
    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        somTempoFinalizado.play();
        alert('Tempo finalizado.')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        somPause.play();
        // startOuPauseBt.innerHTML = `Começar`
        startOuPauseBt.textContent = "Começar"
        zerar()
        return
    }else{
        somPlay.play();
        // startOuPauseBt.innerHTML = `Pausar`
        startOuPauseBt.textContent = "Pausar"
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}