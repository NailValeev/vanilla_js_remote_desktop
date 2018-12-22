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
  }

  init (rows, cols) {
    console.log('init Memory game with ' + rows + ' rows and ' + cols + ' columns')
    let numberOfCards = rows * cols
    this.carsdArray = new Deck(numberOfCards).getDeck()
    let holder = this.templ.querySelector('.window-content')

    this.carsdArray.forEach(function (card) {
      let newCard = document.createElement('div')
      newCard.innerHTML = card.id + ', ' + card.picId
      holder.appendChild(newCard)
    })

    this.expose()
  }
}
