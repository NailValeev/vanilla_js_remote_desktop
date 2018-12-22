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
      let card1 = new Card('a' + j)
      let card2 = new Card('b' + j)
      this.deck.push(card1)
      this.deck.push(card2)
    }
    this.shuffle()
  }
  getDeck () {
    return this.deck
  }

  /**
  * Shuffle and return array with playing cards
  *
  * @param {none} this.deck will be shuffled
  * @returns {undefined} void, this.deck will be shuffled
  * @throws {none} because embedded validation
  */
  shuffle () {
    if (Array.isArray(this.deck) && this.deck.length > 0) {
      let m = this.deck.length
      let i

      while (m) {
        i = Math.floor(Math.random() * m--) // Fisher-Yates Shuffle
        let swapCard = this.deck[m]
        this.deck[m] = this.deck[i]
        this.deck[i] = swapCard
      }
    }
  }
}
