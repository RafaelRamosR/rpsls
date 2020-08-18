const root = document.documentElement;
const btnPlay = document.getElementById('play');
const btnEmoji = document.getElementById('btnEmoji');
const modal = document.getElementById('modal');
const titleResult = document.getElementById('titleResult');
const arrCountdown = ['🆚', '1️⃣', '2️⃣', '3️⃣'];
const arrEmojis = ['✊', '✋', '✌', '👌', '🖖'];
const arrLives = ['🖤🖤🖤', '🖤🖤💖', '🖤💖💖'];
let emojiUser = '';

const setItem = (key, item) => {
  return localStorage.setItem(key, item);
}

const getItem = (key) => {
  return parseInt(localStorage.getItem(key));
}

// Reset localstorage and CSS variables
const restart = () => {
  root.style = '';
  btnPlay.classList.toggle('none');
  setItem('round', 1);
  setItem('user-live', 3);
  setItem('computer-live', 3);
}

/*
  Generate random number
  Minimum included, maximum excluded
*/
const numRandom = (min, max) => {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// Countdown to cycle through arrCountdown and display it on screen
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
}

/*
  Modify the lives of the players according to the outcome of the game
  TRUE: 0 lives - FALSE: Tie
*/
const livesPlayer = (result) => {
  switch (result) {
    case 'win':
      setItem('computer-live', getItem('computer-live') - 1);
      root.style.setProperty('--lives-computer', `"${arrLives[getItem('computer-live')]}"`);
      break;
    case 'lost':
      setItem('user-live', getItem('user-live') - 1);
      root.style.setProperty('--lives-user', `"${arrLives[getItem('user-live')]}"`);
      break;
    default:
      return false;
  }

  if (getItem('user-live') === 0 || getItem('computer-live') === 0) {
    return true;
  }
}

/*
  The number of lives of the player is altered and the number of rounds is increased
  until a player has no life or the rounds reach 5
*/
const newRound = (result) => {
  const lives = livesPlayer(result);
  const userLive = getItem('user-live');
  const computerLive = getItem('computer-live');
  const round = getItem('round') + 1;

  if (round > 5 || lives === true) {
    let result = '';
    if (userLive > computerLive) {
      result = 'WIN';
    } else if (userLive < computerLive) {
      result = 'LOST';
    } else {
      result = 'TIED';
    }
    modal.classList.add('modal-show');
    return titleResult.innerText = `YOU ${result}`;
  }

  root.style.setProperty('--img-user', `url(../img/user-round${round}.svg)`);
  root.style.setProperty('--img-computer', `url(../img/computer-round${round}.svg)`);
  setItem('round', round);

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

  switch (emojiUser) {
    case emojiComputer: {
      return newRound('tied');
    }
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

// Starts the countdown
btnPlay.addEventListener('click', () => {
  restart();
  root.style.setProperty('--img-user', `url(../img/user-round1.svg)`);
  root.style.setProperty('--img-computer', `url(../img/computer-round1.svg)`);
  countdown();
});

// Here the game begins
btnEmoji.addEventListener('click', (e) => {
  const btn = e.target.dataset;

  if (btn.emoji !== undefined) {
    emojiUser = btn.emoji;
    root.style.setProperty('--emoji-user', `"${emojiUser}"`);
  }
});

/* Modal */
modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      modal.classList.remove('modal-show');
      restart();
    }
})
