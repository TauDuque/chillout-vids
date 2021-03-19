const image = document.querySelector("img");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const title = document.getElementById("title");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//musicas
const musicas = [
  {
    name: "a-agua-e-uma-so",
    displayName: "A Água é Uma Só",
  },
  {
    name: "capital-do-nordeste",
    displayName: "Capital do Nordeste",
  },
  {
    name: "fundacao-sem-fundamento",
    displayName: "Fundação Sem Fundamento",
  },
  {
    name: "tarabando",
    displayName: "Tarabando",
  },
  {
    name: "xote-dos-recursos",
    displayName: "Xote dos Recursos",
  },
];

// verificar se toca
let taTocando = false;

//play
function tocarMusica() {
  taTocando = true;
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  music.play();
}

//pausar
function pausarMusica() {
  taTocando = false;
  playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  music.pause();
}

// tocar ou pausar event listener
playBtn.addEventListener("click", () =>
  taTocando ? pausarMusica() : tocarMusica()
);

// atualizar DOM
function carregarMusica(musicas) {
  title.textContent = musicas.displayName;
  music.src = `music/${musicas.name}.mp3`;
  image.src = `img/${musicas.name}.jpg`;
}

// musica atual
let songIndex = 0;

//ultima musica
function musicaAntes() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = musicas.length - 1;
  }
  carregarMusica(musicas[songIndex]);
  tocarMusica();
}

//proxima musica
function musicaDepois() {
  songIndex++;
  if (songIndex > musicas.length - 1) {
    songIndex = 0;
  }
  carregarMusica(musicas[songIndex]);
  tocarMusica();
}

// On Load - selecionar musica
carregarMusica(musicas[songIndex]);

// atualizar barra de progresso e tempo
function atualizarProgresso(e) {
  if (taTocando) {
    const { duration, currentTime } = e.srcElement;
    // atualizar barra de progresso
    const percentualProgresso = (currentTime / duration) * 100;
    progress.style.width = `${percentualProgresso}%`;
    //calcular duração das musicas
    const minutosDur = Math.floor(duration / 60);
    let segundosDur = Math.floor(duration % 60);
    if (segundosDur < 10) {
      segundosDur = `0${segundosDur}`;
    }
    //atrasar troca da duração p/ evitar NaN
    if (segundosDur) {
      durationEl.textContent = `${minutosDur}:${segundosDur}`;
    }
    //calcular tempo atual das musicas
    const minutosAtual = Math.floor(currentTime / 60);
    let segundosAtual = Math.floor(currentTime % 60);
    if (segundosAtual < 10) {
      segundosAtual = `0${segundosAtual}`;
    }
    currentTimeEl.textContent = `${minutosAtual}:${segundosAtual}`;
  }
}

//definir barra de progresso
function barraProgressiva(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// event listeners
prevBtn.addEventListener("click", musicaAntes);
nextBtn.addEventListener("click", musicaDepois);
music.addEventListener("ended", musicaDepois);
music.addEventListener("timeupdate", atualizarProgresso);
progressContainer.addEventListener("click", barraProgressiva);
