/**
 * The memory game application.
 *
 * @author Nail Valeev
 * @version 1.1.0
 */

import { PWDWindow } from './PWDWindow.js'
import Deck from './Deck.js'

export default class Memory extends PWDWindow {
  constructor (gameId) {
    super('Memory', gameId)
    this.gameId = gameId
  }

  begin () {
    console.log('new Memory game ' + this.gameId + ' begins')
    let self = this

    let holder = this.templ.querySelector('.window-content')

    let gameFrame = document.querySelector('#template-app').content.cloneNode(true)

    let run44 = gameFrame.querySelector('#run44')
    run44.addEventListener('click', function (e) { self.init(4, 4) })

    this.gameBody = gameFrame.querySelector('.app-body')
    this.gameBody.classList.toggle('memory-body')
    this.gameBoard = gameFrame.querySelector('.app-board')

    holder.appendChild(gameFrame)

    this.expose()
  }

  init (rows, cols) {
    console.log('init Memory game with ' + rows + ' rows and ' + cols + ' columns')
    // Defaults
    this.rows = rows || 2
    this.cols = cols || 2

    let numberOfCards = this.rows * this.cols
    this.carsdArray = new Deck(numberOfCards).getDeck()

    let board = document.createElement('div')
    board.classList.toggle('memory-board')

    this.gameBoard.appendChild(board)

    let cardIndex = 0
    for (let i = 0; i < this.rows; i++) {
      let newRow = document.createElement('div')
      newRow.classList.toggle('memory-row')

      for (let k = 0; k < this.cols; k++) {
        let newCard = document.createElement('div')
        newCard.classList.toggle('memory-card')
        newCard.setAttribute('id', this.carsdArray[cardIndex].id)
        newCard.setAttribute('name', this.carsdArray[cardIndex].picId)
        // newCard.style.backgroundImage = "url('image/0.jpg')"
        newRow.appendChild(newCard)
        cardIndex++
      }
      board.appendChild(newRow)
    }
  }
}
