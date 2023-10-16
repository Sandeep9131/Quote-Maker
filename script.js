const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const simpsonsQuoteBtn = document.getElementById('simpson-quote');
const imgSimpsonCharacter = document.getElementById('simpson-character');
const loader = document.getElementById('loader');
let quote = '';
let author = '';

// Backend API URL
const apiUrl = 'http://localhost:3000/getQuote';


function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function showCharacterImage(imageUrl) {
  if (imageUrl) {
    imgSimpsonCharacter.hidden = false;
    imgSimpsonCharacter.src = imageUrl;
  } else {
    hideCharacterImage();
  }
}

function hideCharacterImage() {
  imgSimpsonCharacter.hidden = true;
}

async function getQuote(quoteType) {
  showLoadingSpinner();
  hideCharacterImage();

  try {
    let url = apiUrl;
    if (quoteType === 'simpsons quote') {
      url = simpsonsQuoteUrl;
    }

    const response = await fetch(url);
    const data = await response.json();

    //check if simpsons quote requested
    if (quoteType === 'simpsons quote') {
      quote = data.quote;
      author = data.character;
      showCharacterImage(data.image);
    } else {
      quote = data.quote;
      author = data.author;
    }

    // If response has no author, set it to 'Unknown'
    if (!author) {
      author = 'Unknown';
    }
    authorText.innerText = author;

    // Dynamically reduce quote font size for long quotes
    const maxQuoteLength = 80;
    if (quote.length > maxQuoteLength) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = quote;

    removeLoadingSpinner();
  } catch (error) {
    quoteText.innerText = 'Oops...Sorry. There was an error. Please try again later.';
    console.error('Error fetching quote: ' + error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Add Event Listeners to New Quote and Tweet buttons
newQuoteBtn.addEventListener('click', () => {
  getQuote('new quote');
});
simpsonsQuoteBtn.addEventListener('click', () => {
  getQuote('simpsons quote');
});
twitterBtn.addEventListener('click', tweetQuote);

// Call getQuote on document Load
getQuote('new quote');
