const root = document.documentElement;
const btnPlay = document.getElementById('play');
const btnEmoji = document.getElementById('btnEmoji');
const arrCountdown = ['🆚', '1️⃣', '2️⃣', '3️⃣'];
const arrEmojis = ['✊', '✋', '✌', '👌', '🖖'];
let emojiUser = '';

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
      playGame();
      return clearInterval(timeInterval);
    }
  }, 1000);
};

/*
  The number of lives of the player is altered and the number of rounds is increased
  until a player has no life or the rounds reach 5
*/
const newRound = (result) => {
  const userLive = localStorage.getItem('user-live');
  const liveComputer = localStorage.getItem('computer-live');
  const round = localStorage.getItem('round');
  switch (result) {
    case 'win':
      localStorage.setItem('computer-live', liveComputer - 1);
      break;
    case 'lost':
      localStorage.setItem('user-live', userLive - 1);
      break;
  }
  localStorage.setItem('round', parseInt(round) + 1);
  console.log(`Round ${round}`);
  console.log(`You ${result}`);
  if (round == 5 || userLive == 0 || liveComputer == 0) {
    console.log('GAME OVER');
    const win = userLive > liveComputer ? 'WIN' : 'LOST'
    return console.log(`YOU ${win}`);
  }
  return countdown();
}

/*
  Determine Game Winner
  The options USER can win with are added to the arrangement
  TRUE: user win - FALSE: computer win
*/
const playGame = () => {
  const arrGame = [];
  const emojiComputer = arrEmojis[numRandom(0, 5)];
  root.style.setProperty('--emoji-computer', `"${emojiComputer}"`);

  if (emojiUser === emojiComputer) {
    return newRound('tied');
  }

  switch (emojiUser) {
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
      return newRound('lost');
    }
  }
  const result = arrGame.includes(emojiComputer) === true ? 'win' : 'lost';
  return newRound(result);
}

/* Starts the countdown */
btnPlay.addEventListener('click', () => {
  btnPlay.classList.add('none');
  localStorage.setItem('round', 1);
  localStorage.setItem('user-live', 3);
  localStorage.setItem('computer-live', 3);
  countdown();
});

/*
  Here the game begins
*/
btnEmoji.addEventListener('click', (e) => {
  const btn = e.target.dataset;

  if (btn.emoji !== undefined) {
    emojiUser = btn.emoji;
    root.style.setProperty('--emoji-user', `"${emojiUser}"`);
  }
});
