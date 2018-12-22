/**
* Class for memory card
*
* @author Nail Valeev
* @version 1.1.0
*/

export default class Card {
/**
 * Card will be created with pre-defined id and picId
 * @constructor
 * @param {String} id the card identifier in array
 * @param {number} picId the path generator to the picture of the card & key to compare, too
 */
  constructor (id, picId) {
    this.id = id
    this.picId = picId
  }
}
