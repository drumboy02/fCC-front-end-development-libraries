import React from "https://esm.sh/react"
import ReactDOM from "https://esm.sh/react-dom/client"

const QUOTES = [
  {
    lyric: "We're just two lost souls swimming in a fish bowl.",
    artist: "Pink Floyd",
    song: "Wish You Were Here"
  },
  {
    lyric: "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality.",
    artist: "Queen",
    song: "Bohemian Rhapsody"
  },
  {
    lyric: "There's a lady who's sure all that glitters is gold, and she's buying a stairway to heaven.",
    artist: "Led Zeppelin",
    song: "Stairway to Heaven"
  },
  {
    lyric: "And you run and you run to catch up with the sun, but it's sinking. Racing around to come up behind you again.",
  artist: "Pink Floyd",
  song: "Time"
  },
  {
    lyric: "Oh, let the sun beat down upon my face, stars to fill my dream. I am a traveler of both time and space, to be where I have been.",
    artist: "Led Zeppelin",
    song: "Kashmir"
  },
  {
    lyric: "Reach out your hand, if your cup be empty If your cup is full, may it be again Let it be known there is a fountain That was not made by the hands of men",
    artist: "The Grateful Dead",
    song: "Ripple"
  },
  {
    lyric: "Into this house we're born, into this world we're thrown.",
    artist: "The Doors",
    song: "Riders on the Storm"
  },
  {
    lyric: "But if I stay here with you, girl, things just couldn't be the same. 'Cause I'm as free as a bird now, and this bird you cannot change.",
    artist: "Lynyrd Skynyrd",
    song: "Free Bird"
  },
  {
    lyric: "You can check out anytime you like, but you can never leave.",
    artist: "The Eagles",
    song: "Hotel California"
  },
  {
    lyric: "It's better to burn out Than fade away My my, hey hey ",
    artist: "Neil Young",
    song: "My My Hey Hey (Out of the Blue)"
  },
  {
    lyric: "People are Strange, when you're a stranger. Faces look ugly when you're alone.",
    artist: "The Doors",
    song: "People are Strange"
  },
  {
    lyric: "Here comes the sun Here comes the sun, and I say It’s alright",
    artist: "The Beatles",
    song: "Here Comes the Sun"
  }
]

const App = () => { 
  return (
    <>
      <QuoteBox />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

const QuoteBox = () => {
  const [quote, setQuote] = React.useState(QUOTES[0])
  const lyric = quote.lyric

  const handleNewQuote = () => {
    const randomQuote = Math.floor(Math.random() * QUOTES.length)
    setQuote(QUOTES[randomQuote])
  }
  
  return (
    <div id="quote-box">
      <Quote quote={quote} />
      <UserInputs handleNewQuote={handleNewQuote} lyric={lyric} />
    </div>
  )
}

const Quote = ({ quote }) => {
  return (
    <>
      <blockquote id="text">
        <em>{quote.lyric}</em>
      </blockquote>
      <span id="author">
        – {quote.artist}, <em>{quote.song}</em>
      </span>
    </>
  )
}

const UserInputs = ({ handleNewQuote, lyric }) => {
  const tweetText = lyric.replace(/\s/g, "%20")
  const tweetUrl = "https://twitter.com/intent/tweet?text=".concat(tweetText)

  return (
    <div id="user-inputs">
      <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
      <a href={tweetUrl} id="tweet-quote">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM351.3 199.3v0c0 86.7-66 186.6-186.6 186.6c-37.2 0-71.7-10.8-100.7-29.4c5.3 .6 10.4 .8 15.8 .8c30.7 0 58.9-10.4 81.4-28c-28.8-.6-53-19.5-61.3-45.5c10.1 1.5 19.2 1.5 29.6-1.2c-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3c-9-6-16.4-14.1-21.5-23.6s-7.8-20.2-7.7-31c0-12.2 3.2-23.4 8.9-33.1c32.3 39.8 80.8 65.8 135.2 68.6c-9.3-44.5 24-80.6 64-80.6c18.9 0 35.9 7.9 47.9 20.7c14.8-2.8 29-8.3 41.6-15.8c-4.9 15.2-15.2 28-28.8 36.1c13.2-1.4 26-5.1 37.8-10.2c-8.9 13.1-20.1 24.7-32.9 34c.2 2.8 .2 5.7 .2 8.5z"/></svg>
      </a>
    </div>
  )
}

