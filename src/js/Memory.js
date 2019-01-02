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
  /**
  * Memory game beginning, handling of DOM
  *
  * @param {none} _ , template defined in the index file
  * @returns {undefined} void, handling of this and DOM
  */
  begin () {
    let holder = this.templ.querySelector('.window-content')
    let gameFrame = document.querySelector('#template-app').content.cloneNode(true)

    gameFrame.querySelector('#run44').addEventListener('click', (e) => { this.init(4, 4) })
    gameFrame.querySelector('#run22').addEventListener('click', (e) => { this.init(2, 2) })
    gameFrame.querySelector('#run24').addEventListener('click', (e) => { this.init(2, 4) })

    this.gameBody = gameFrame.querySelector('.app-body')
    this.gameBody.classList.toggle('memory-body')
    this.gameBoard = gameFrame.querySelector('.app-board')
    this.infoBlock = gameFrame.querySelector('.app-info')
    this.timerBlock = gameFrame.querySelector('.app-timer')
    this.timerBlock.innerHTML = ''

    holder.appendChild(gameFrame)

    this.expose()
    this.init()
  }

  /**
  * Memory game initialization
  *
  * @param {number} rows number of rows with memory cards
  * @param {number} cols number of rows with memory cards
  * @returns {undefined} void, handling of this
  */
  init (rows, cols) {
    this.pause()
    // Defaults, if missing parameters
    this.rows = rows || 2
    this.cols = cols || 2

    this.turnedCards = []
    this.turnedCardsCounter = 0
    this.guessedCounter = 0
    this.attemptCounter = 0

    this.infoBlock.innerHTML = ''
    this.timerBlock.innerHTML = ''

    this.numberOfCards = this.rows * this.cols
    this.carsdArray = new Deck(this.numberOfCards).getDeck()
    this.countdown = 60

    let board = document.createElement('div')
    board.classList.toggle('memory-board')

    while (this.gameBoard.childElementCount > 0) {
      this.gameBoard.removeChild(this.gameBoard.firstChild) // To clear old game
    }

    this.gameBoard.appendChild(board)

    let cardIndex = 0
    for (let i = 0; i < this.rows; i++) {
      let newRow = document.createElement('div')
      newRow.classList.toggle('memory-row')

      for (let k = 0; k < this.cols; k++) {
        let newCard = document.createElement('div')
        newCard.classList.toggle('memory-card')
        newCard.classList.toggle('suit')
        newCard.setAttribute('id', this.carsdArray[cardIndex].id)
        newCard.addEventListener('click', (e) => { if (this.turnedCardsCounter < 2) this.turn(e.target); e.stopPropagation() })
        newRow.appendChild(newCard)
        cardIndex++
      }
      board.appendChild(newRow)
    }
  }
  
  /**
  * GUI handling on game over
  *
  * @param {String} message text to be displayed for player
  * @param {Boolean} winnerFlag to indicate is player winner or not
  * @returns {undefined} void, handling of this
  */
  message (message, winnerFlag) {
    let board = document.createElement('div')
    board.classList.toggle('memory-board')

    while (this.gameBoard.childElementCount > 0) {
      this.gameBoard.removeChild(this.gameBoard.firstChild) // To clear old game
    }

    this.gameBoard.appendChild(board)

    let infoSpan = document.createElement('span')
    infoSpan.classList.toggle('alert-msg')
    infoSpan.innerHTML = message

    let ImgDiv = document.createElement('div')
    ImgDiv.classList.toggle('alert-img-holder')

    if (winnerFlag) {
      ImgDiv.classList.toggle('alert-winner-holder')
    } else {
      ImgDiv.classList.toggle('alert-loser-holder')
    }

    board.appendChild(infoSpan)
    board.appendChild(ImgDiv)
  }

  /**
  * Turning the memory card
  *
  * @param {Card} card card object to be turned, compared etc
  * @returns {undefined} void, handling of this
  */
  turn (card) {
    if (!card.classList.contains('suit')) {
      return // already turned
    }
    
    if (this.countdown === 60) this.startTimer()
    
    this.attemptCounter++
    this.infoBlock.innerHTML = 'Attempts : ' + this.attemptCounter

    this.turnedCardsCounter++

    card.classList.toggle('suit')
    let cardID = card.id.substring(1)
    let bckgrndUrl = 'url(../image/' + cardID + '.jpg'
    card.style.backgroundImage = bckgrndUrl

    if (this.turnedCards.length > 1) return // Quick user clicks more than 2 cards :)
    setTimeout(() => {
      if (this.turnedCards.length > 0) { // 0 or 1, no more
        // Compare current card with card from array
        let oldCard = this.turnedCards[0]
        let oldCardID = this.turnedCards[0].id.substring(1)
        if (oldCardID === cardID) { // Match!
          this.guessedCounter += 2
          card.removeEventListener('click', (e) => { this.turn(e.target) })
          card.style.backgroundImage = 'none'
          oldCard.removeEventListener('click', (e) => { this.turn(e.target) })
          oldCard.style.backgroundImage = 'none'
        } else {
          card.classList.toggle('suit')
          card.style.backgroundImage = 'url(../image/0.jpg'
          oldCard.classList.toggle('suit')
          oldCard.style.backgroundImage = 'url(../image/0.jpg'
        }
        this.turnedCards = []
        this.turnedCardsCounter = 0
        if (this.guessedCounter === this.numberOfCards) {
          this.pause()
          this.message('YOU WIN !!!', true)
        }
      } else {
        this.turnedCards.push(card)
      }
    }, 500)
  }

  /**
  * Handling UI elements and the countdown functionality
  *
  * @param {none}
  * @returns {undefined} void
  */
  startTimer () {
    this.intervalHandler = setInterval(() => {
      this.countdown--
      if (this.countdown <= 0) {
        clearInterval(this.intervalHandler)
        this.message('YOU LOSE !!!', false)
      } else {
        this.timerBlock.innerHTML = this.countdown
      }
    }, 1000)
  }

  /**
  * To stop the timer / countdowns
  *
  * @param {none}
  * @returns {undefined} void
  */
  pause () {
    clearInterval(this.intervalHandler)
  }
}
