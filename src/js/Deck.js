/**
* Class for memory card deck
*
* @author Nail Valeev
* @version 1.1.0
*/

import Card from './Card.js'

export default class Deck {
  /**
  * Deck will be created with pre-defined cards number
  * @constructor
  * @param {number} number number of cards in the deck
  */
  constructor (number) {
    console.log('Deck constructor for ' + number + ' cards')
    this.deck = []

    for (let i = 0; i < number / 2; i++) {
      // Pair of cards with same picture ID
      let j = i + 1
      let card1 = new Card('card' + j + 'a', j)
      let card2 = new Card('card' + j + 'b', j)
      this.deck.push(card1)
      this.deck.push(card2)
    }
  }
  getDeck () {
    return this.deck
  }
}
