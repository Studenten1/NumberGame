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

#wrapper #inputNumber {
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

<template id="numberTemplate">
    <div id="wrapper">
        <h2>Welcome to the number game app! <br> Choose a number from 0 to 99: </h2>
        <input id="inputNumber"><button>Submit</button>
    </div>
</template>
<template id="resultTemplate">
    <h2 id="resultMessage"></h2>
    <h2 id="numberTries"></h2>
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
     * The div elements.
     *
     * @type {HTMLDivElement}
     */
    #board

    /**
     * The number-game element.
     *
     * @type {HTMLDivElement}
     */
    #numberTemplate
    #resultTemplate

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
      this.#board = this.shadowRoot.querySelector('#board')
      this.#numberTemplate = this.shadowRoot.querySelector('#numberTemplate')
      this.#resultTemplate = this.shadowRoot.querySelector('#resultTemplate')

      this.chosenNumber = 0
      this.numberOfTries = 0
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      const template = this.#numberTemplate.content.cloneNode(true)
      this.#board.appendChild(template)

      this.#board.querySelector('#inputNumber').focus()
      this.#board.querySelector('button').addEventListener('click', event => {
        this.chosenNumber = this.#board.querySelector('#inputNumber').value
        this.numberOfTries++
        this.compareNumbers(randomInt)
        event.preventDefault()
        event.stopPropagation()
      })
      const randomInt = this.getRandomNumber()
    }

    /**
      * Gets the random number.
      *
      * @return {int} randomNumber - The random number.
      */
    getRandomNumber () {
      const randomNumber = Math.floor(Math.random() * 100)
      console.log(randomNumber)
      return randomNumber
    }

    /**
     * Compare.
     *
     */
    compareNumbers (randomInt) {
      const templateNew = this.#resultTemplate.content.cloneNode(true)
      this.#board.appendChild(templateNew)

      if (Number(this.chosenNumber) === randomInt) {
        this.#board.removeChild(this.#board.firstChild)

        this.#board.querySelector('#resultMessage').textContent = 'True. Hello, well done!'
      } else {
        this.#board.querySelector('#resultMessage').textContent = 'False. Not correct answer! Try again.'
      }

      this.#board.querySelector('#numberTries').textContent = `You have tried ${this.numberOfTries} times`
    }
  }
)
