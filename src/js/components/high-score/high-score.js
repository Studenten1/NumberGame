/**
 * The high-score web component module.
 *
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    #score {
      font-size: 2em;
      color:white;
      background-color: #333;
      margin-top: 20px;
      padding: 10px;
    }
    .list {
      display: block;
      margin-right: 4rem;
    }
  </style>
  <div id="score">
    <ul>
      <li class="list"></li>
      <li class="list"></li>
      <li class="list"></li>
      <li class="list"></li>
      <li class="list"></li>
    </ul>
  </div>
`

customElements.define('high-score',
  /**
   * Represents a high-score element.
   */
  class extends HTMLElement {
    /**
     * The high-score element.
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
      * Writes the user's score in the high-score element.
      *
      * @param {string} name - The user's nickname.
      * @param {string} result - The user's score.
      */
    getHighscores (name, result) {
      const person = {
        username: name,
        score: result,
        present: `${name} got the score: ${result}`
      }
      const presentList = JSON.parse(window.localStorage.getItem('highscore'))
      console.log(presentList)
      if (presentList === null) {
        for (let i = 0; i < 5; i++) {
          this.#list[i].textContent = ''
        }
        const arrayHighscore = []
        arrayHighscore[0] = person
        window.localStorage.setItem('highscore', JSON.stringify(arrayHighscore))
      } else if (presentList.length > 0) {
        presentList.push(person)
        // sort by score
        presentList.sort(function (a, b) {
          return (b.score - a.score)
        })
        window.localStorage.setItem('highscore', JSON.stringify(presentList))
      }

      // Write the highscore-list
      const theList = JSON.parse(window.localStorage.getItem('highscore'))
      for (let i = 0; i < 5; i++) {
        if (theList[i] === undefined) {
          i = 10
        } else {
          this.#list[i].textContent = `${(i + 1)}. ` + `${theList[i].present}`
        }
      }
    }
  }
)
