const root = document.documentElement;
const btnPlay = document.getElementById('play');
const arrCountdown = ['🆚', '1️⃣', '2️⃣', '3️⃣'];
const arrEmojis = ['✊', '✋', '✌', '👌', '🖖'];

const countdown = () => {
  let index = arrCountdown.length - 1;
  const timeInterval = setInterval(() => {
    root.style.setProperty('--emoji-count', `"${arrCountdown[index]}"`);
    index -= 1;
    if (index < 0) {
      return clearInterval(timeInterval);
    }
  }, 1000);
};

const emojiRandom = (min, max) => {
  setInterval(() => {
    const numRandom = Math.floor(Math.random() * (max - min)) + min;
    root.style.setProperty('--emoji-game', `"${arrEmojis[numRandom]}"`);
  }, 1000);
}

btnPlay.addEventListener('click', () => {
  btnPlay.classList.add('none');
  countdown();
});

emojiRandom(0, arrEmojis.length);
