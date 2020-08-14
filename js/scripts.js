const root = document.documentElement;
const btnPlay = document.getElementById('play');
const btnEmoji = document.getElementById('btnEmoji');
const arrCountdown = ['🆚', '1️⃣', '2️⃣', '3️⃣'];
const arrEmojis = ['✊', '✋', '✌', '👌', '🖖'];

/*
  Generate random number
  Minimum included, maximum excluded
*/
const numRandom = (min, max) => {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

/*
  Countdown to cycle through arrCountdown and display it on screen
*/
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

/*
  Determine Game Winner
  The options USER can win with are added to the arrangement
  TRUE: user win - FALSE: computer win
*/
const playGame = (user, computer) => {
  const arrGame = [];
  switch (user) {
    case '✊': {
      arrGame.push('✌', '👌');
      break;
    }
    case '✋': {
      arrGame.push('✊', '🖖');
      break;
    }
    case '✌': {
      arrGame.push('✋', '👌');
      break;
    }
    case '👌': {
      arrGame.push('✋', '🖖');
      break;
    }
    case '🖖': {
      arrGame.push('✊', '✌');
      break;
    }
    default: {
      return false;
    }
  }
  return arrGame.includes(computer);
}

/* Starts the countdown */
btnPlay.addEventListener('click', () => {
  btnPlay.classList.add('none');
  countdown();
});

/*
  Here the game begins
*/
btnEmoji.addEventListener('click', (e) => {
  const btn = e.target.dataset;
  let result = '';

  if (btn.emoji !== undefined) {
    const emojiUser = btn.emoji;
    const emojiComputer = arrEmojis[numRandom(0, 5)];
    if (emojiUser === emojiComputer) {
      result = 'tied';
      return console.log(result);
    }

    result = playGame(emojiUser, emojiComputer) === true ? 'win' : 'lost';
    return console.log(result);
  }
});
