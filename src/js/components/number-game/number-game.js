/**
 * The number game web component module.
 *
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
#board {
  margin: 0 auto;
  max-width: 40%;
  height: fit-content;
  border: solid black 4px;
  border-radius: 20px;
  padding: 1.2em;
}

h1 {
  text-align: center;
  color: cadetblue;
  width: 100%;
}

button {
  background-color: white;
  border: solid black 2px;
  margin-left: 80%;
  height: 50px;
  width: 50px;
  border-radius: 20px;
  font-weight: bold;
}

button:hover {
  background-color: lightgray;
}

#helloMessage {
  font-family: Book Antiqua;
  font-size: 1.2rem;
  max-width: 50%;
  margin-left: 30%;
  overflow-wrap: break-word;
}

#poems {
  color: black;
  max-width: 50%;
  margin-left: 30%;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  white-space: pre;
  text-align: left;
}

#topicImage {
  max-width: 20%;
  justify-content: left;
  float: left;
}

#wrapper {
  text-align: center;
}

#wrapper #inputName {
  height: 20px;
  font-size: 1.2em;
}

h2 {
  text-align: center;
  color: cadetblue;
  border-radius: 10px;
}

#author {
  text-align: right;
  color: cadetblue;
  font-weight: bold;
}

#title {
  text-align: left;
  color: cadetblue;
  font-weight: bold;
  max-width: 50%;
  margin-left: 30%;
  overflow-wrap: break-word;
}

p {
  font-size: 1.4em;
}

</style>

<template id="nameTemplate">
<div id="wrapper">
  <h2>Welcome to the hello app! <br> Please enter your name: </h2>
  <input id="inputName"><button>Submit</button>
</div>
</template>
<template id="topicTemplate">
<form id="form">
    <p>Choose a topic for the poem:</p>
      <div>
        <input type="radio" id="a" name="choice" checked>
        <label for="a">Dog</label>
      </div>
      <div>
        <input type="radio" id="b" name="choice">
        <label for="b">Water</label>
      </div>
      <div>
        <input type="radio" id="c" name="choice">
        <label for="c">Butterfly</label>
      </div>
      <div>
        <input type="radio" id="d" name="choice">
        <label for="d">Crow</label>
      </div>
      <div>
        <button type="submit" id="submit">Submit</button>
      </div>
  </form>
</template>
<template id="helloTemplate">
<p id="helloMessage"></p>
<p id="title"></p>
<img id="topicImage" src="${IMG_URLS[0]}" alt="A topic">
<p id="poems"></p>
<p id="author"></p>
</template>
<div id="board">
</div>
`

customElements.define('number-game',
  /**
   * Represents a number-game element.
   */
  class extends HTMLElement {
    /**
     * The number-game element.
     *
     * @type {HTMLDivElement}
     */
     #list

     /**
      * Creates an instance of the current type.
      */
     constructor () {
       super()

       // Attach a shadow DOM tree to this element and
       // append the template to the shadow root.
       this.attachShadow({ mode: 'open' })
         .appendChild(template.content.cloneNode(true))

       // Get the high-score element in the shadow root.
       this.#list = this.shadowRoot.querySelectorAll('.list')
     }

     /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
        this.getRandomNumber()
      }

     /**
      * Writes the user's score in the high-score element.
      *
      * @param {string} name - The user's nickname.
      * @param {string} result - The user's score.
      */
     getRandomNumber () {
        const randomNumber= Math.floor(Math.random() * 100)
        console.log(randomNumber)
     }
  }
)