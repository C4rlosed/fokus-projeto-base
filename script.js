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
const imgIcone = document.querySelector('.app__card-primary-butto-icon')
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


let tempoDecorridoEmSegundos = 1500
let intervaloId

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

//QUANDO O BOTÃO FOCO FOR CLICADO
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoFoco
    alterarContexto('foco')
    focoBt.classList.add('active')
})
//QUANDO O BOTÃO DESCANSO CURTO FOR CLICADO
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoDescansoCurto
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
//QUANDO O BOTÃO DESCANSO LONGO FOR CLICADO
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoDescansoLongo
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

//ALTERAR O TEXTO PRINCIPAL, A IMAGEM E O FOCO DO BOTÃO AO CLICAR
function alterarContexto(contexto) {
    mostrarTempo();
    //PARA CADA BOTÃO NÃO CLICADO, REMOVER A CLASSE 'ACTIVE'
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')

    });
    //MUDANDO A COR
    html.setAttribute('data-contexto', contexto)
    //MUDANDO A IMAGEM
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    //MUDANDO O TEXTO
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

//CONTAGEM DE TEMPO
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somTempoFinalizado.play();
        alert('Tempo finalizado.')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

//BOTÃO DE INICIAR E PAUSAR O TEMPO
startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    //QUANDO PAUSAR
    if (intervaloId) {
        somPause.play();
        zerar()
        return
    }
    //DAR PLAY
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    // startOuPauseBt.innerHTML = `Pausar`
    startOuPauseBt.textContent = "Pausar"
    alterarIcone('pause')
}

//LIMPAR A CONTAGEM
function zerar() {
    clearInterval(intervaloId)
    // startOuPauseBt.innerHTML = `Começar`
    startOuPauseBt.textContent = "Começar"
    alterarIcone('play_arrow')
    intervaloId = null
}

//ALTERAR O ICONE
function alterarIcone(icone) {
    imgIcone.setAttribute('src', `/imagens/${icone}.png`)
}

//MOSTRAR O TEMPO NA TELA
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    displayTempo.innerHTML = `${tempoFormatado}`
}
//SEMPRE MOSTRAR NA TELA
mostrarTempo();