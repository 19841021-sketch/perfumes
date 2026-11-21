
// ===================================
// PERSONALIZA AQUÍ TUS MENSAJES
// ===================================

const gifts = [
  "Quiero que recuerdes lo especial que eres y lo mucho que valen los pequeños momentos.",
  "Cada recuerdo tiene algo bonito que merece quedarse guardado.",
  "Espero que esta sorpresa consiga sacarte una sonrisa.",
  "Esto es solamente una pequeña forma de demostrarte cuánto te aprecio."
];

const photos = [
  { src: "imagenes/foto1.jpg", caption: "Primera foto contigo JAJAJA" },
  { src: "imagenes/foto2.jpg", caption: "Momento bonito" },
  { src: "imagenes/foto3.jpg", caption: "Amando tus ojos chinos :<" },
  { src: "imagenes/foto4.jpg", caption: "Ojitosss" },
  { src: "imagenes/foto5.jpg", caption: "Cuando te di el primer detalle" },
  { src: "imagenes/foto6.jpg", caption: "Recuerdo que valen mucho" },
  { src: "imagenes/foto7.jpg", caption: "Siempre seras un" },
  { src: "imagenes/foto8.jpg", caption: "niño con un corazon " },
  { src: "imagenes/foto9.jpg", caption: "y me alegro de haberte conocido" },
  { src: "imagenes/foto10.jpg", caption: "Eres una personita muy especial" }
];

const reasons = [
  "Porque haces bonitos hasta los momentos más sencillos. Hay recuerdos que parecen pequeños, pero que con el tiempo se vuelven de los más especiales.",
  "Porque tienes una manera muy tuya de quedarte en los recuerdos. Y qué bonito es poder guardar tantos momentos que llevan un poquito de ti.",
  "Porque hay personas que hacen la diferencia sin darse cuenta. Y tú eres una de esas personas que hacen más bonitos los días de quienes te rodean.",
  "Porque eres de esas personas que vale la pena conocer. De las que dejan recuerdos bonitos y motivos para sonreír al mirar atrás.",
  "Porque tienes una esencia que no se encuentra en cualquiera. Y espero que nunca pierdas esa forma tan tuya de ser.",
  "Porque no solo eres especial para mí, también para quienes te rodean. Tienes personas que te quieren, que disfrutan de tu compañía y que se sienten felices de tenerte en sus vidas. Nunca olvides lo querido que eres."
];

const letter = `Quiero dedicarte estas palabras porque hay personas que llegan a nuestras vidas y, sin darse cuenta, se convierten en alguien muy especial. Personas que hacen que ciertos momentos tengan un significado diferente y que dejan recuerdos que vale la pena conservar. Y tú eres una de esas personas.

A veces quisiera que pudieras verte desde mis ojos, para que entendieras lo mucho que vales y todas las cosas bonitas que hay en ti. Me gustaría que nunca dudaras de lo importante que eres, de tu forma de ser y de todo lo bueno que tienes para ofrecer. No necesitas ser perfecto ni tener siempre todo resuelto para merecer cariño.

Quiero que sepas que deseo de corazón que te vaya bonito en todo lo que hagas, que puedas cumplir cada una de tus metas y que nunca pierdas las ganas de seguir adelante. Que siempre encuentres motivos para sonreír, que te sientas orgulloso de tus logros y que tengas personas a tu alrededor que sepan apreciar lo especial que eres.

También quiero que recuerdes que no tienes que estar bien todo el tiempo. Está bien cansarse, equivocarse y tener días difíciles. Lo importante es que nunca olvides lo capaz que eres y que todavía te esperan muchísimas experiencias bonitas por vivir.

Espero que esta pequeña sorpresa consiga recordarte, aunque sea por un momento, lo mucho que vales y lo bonito que es tenerte en mi vida, apesar de que ya no seamos los mismos de antes y nos alejamos. Pero eso no impide nada, Me alegra haber coincidido contigo y poder guardar tantos pequeños recuerdos que, de una u otra manera, significan mucho para mí.

Con muchísimo cariño.❤️`;

// ===================================
// MÚSICA
// ===================================

const songs = [
  {
    title: "Canción especial",
    artist: "Para ti",
    src: "musica/Ben E. King — Stand By Me [Letra + Video] - armxndo.mp3"
  },
  {
    title: "Otro recuerdo",
    artist: "Una melodía para ti",
    src: "musica/cancion2.mp3"
  }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const record = document.querySelector(".record");

// ===================================
// NAVEGACIÓN
// ===================================

function goTo(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const destination = document.getElementById(id);

  if (destination) {
    destination.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ===================================
// CUENTA REGRESIVA
// ===================================

let countdownTimer;

function startCountdown() {
  clearInterval(countdownTimer);

  let number = 3;
  const numberElement = document.getElementById("number");

  numberElement.textContent = number;
  goTo("countdown");

  countdownTimer = setInterval(() => {
    number--;

    if (number > 0) {
      numberElement.textContent = number;
    } else {
      clearInterval(countdownTimer);
      numberElement.textContent = "♥";

      setTimeout(() => {
        goTo("welcome");
      }, 700);
    }
  }, 1000);
}

// ===================================
// SOBRE
// ===================================

function openEnvelope() {
  const envelope = document.getElementById("envelope");
  const startBtn = document.getElementById("startBtn");

  if (envelope.classList.contains("opened")) return;

  envelope.classList.add("opened");

  setTimeout(() => {
    startBtn.classList.remove("hidden");
  }, 700);
}

document.getElementById("envelope").addEventListener("click", openEnvelope);

// ===================================
// REGALOS
// ===================================

function showGift(index) {
  document.getElementById("giftText").textContent = gifts[index];
  document.getElementById("giftMessage").classList.remove("hidden");
}

function closeGift() {
  document.getElementById("giftMessage").classList.add("hidden");
}

// ===================================
// REPRODUCTOR
// ===================================

function loadSong() {
  const song = songs[currentSong];

  audio.src = song.src;
  document.getElementById("songTitle").textContent = song.title;
  document.getElementById("songArtist").textContent = song.artist;

  audio.load();
  updatePlayButton();
}

async function playMusic() {
  try {
    await audio.play();
  } catch (error) {
    console.log("No se pudo reproducir la canción:", error);
  }
}

function toggleMusic() {
  if (audio.paused) {
    playMusic();
  } else {
    audio.pause();
  }
}

function updatePlayButton() {
  const playing = !audio.paused;

  playBtn.textContent = playing ? "Ⅱ" : "▶";
  record.classList.toggle("playing", playing);
}

function changeSong(direction) {
  const wasPlaying = !audio.paused;

  currentSong = (currentSong + direction + songs.length) % songs.length;

  loadSong();

  if (wasPlaying || direction === 1) {
    playMusic();
  }
}

function nextSong() {
  changeSong(1);
}

function previousSong() {
  changeSong(-1);
}

audio.addEventListener("play", updatePlayButton);
audio.addEventListener("pause", updatePlayButton);
audio.addEventListener("ended", nextSong);

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.value = (audio.currentTime / audio.duration) * 100;

  document.getElementById("currentTime").textContent =
    formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  document.getElementById("duration").textContent =
    formatTime(audio.duration);

  document.getElementById("currentTime").textContent = "0:00";
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

// ===================================
// GALERÍA DE FOTOGRAFÍAS
// ===================================

function createGallery() {
  const gallery = document.getElementById("galleryGrid");
  gallery.innerHTML = "";

  photos.forEach(photo => {
    const card = document.createElement("div");
    card.className = "photo";

    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.caption;
    image.loading = "lazy";

    image.onerror = () => {
      image.alt = "Agrega tu fotografía en la carpeta imagenes";
      image.style.opacity = ".25";
    };

    const caption = document.createElement("p");
    caption.textContent = photo.caption;

    card.appendChild(image);
    card.appendChild(caption);

    card.addEventListener("click", () => {
      openLightbox(photo);
    });

    gallery.appendChild(card);
  });
}

function openLightbox(photo) {
  document.getElementById("lightboxImage").src = photo.src;
  document.getElementById("lightboxCaption").textContent = photo.caption;
  document.getElementById("lightbox").classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

// ===================================
// RAZONES
// ===================================

function createReasons() {
  const list = document.getElementById("reasonList");
  list.innerHTML = "";

  reasons.forEach((reason, index) => {
    const item = document.createElement("div");
    item.className = "reason";
    item.textContent = `${String(index + 1).padStart(2, "0")} — ${reason}`;
    list.appendChild(item);
  });
}

// ===================================
// CARTA
// ===================================

function loadLetter() {
  document.getElementById("letterContent").textContent = letter;
}

// ===================================
// SORPRESA FINAL
// ===================================

function revealSecret() {
  document.getElementById("secretMessage").classList.remove("hidden");
}

// ===================================
// REINICIAR
// ===================================

function restart() {
  audio.pause();
  audio.currentTime = 0;

  currentSong = 0;
  loadSong();

  document.getElementById("secretMessage").classList.add("hidden");
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("envelope").classList.remove("opened");
  document.getElementById("giftMessage").classList.add("hidden");
  document.getElementById("lightbox").classList.add("hidden");

  startCountdown();
}

// INICIALIZACIÓN

loadSong();
createReasons();
loadLetter();
startCountdown();


