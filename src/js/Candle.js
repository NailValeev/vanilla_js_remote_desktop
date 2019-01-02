/**
* Class for candle light
*
* @author Nail Valeev
* @version 1.1.0
*/
export default class Candle {
  /**
  * Candle will be created with pre-defined coordinates and activity status
  * @constructor
  * @param {number} x x coordinate for the candle light
  * @param {number} y y coordinate for the candle light
  * @param {Boolean} activityStatus status to define display candle light or not
  */
  constructor (x, y, activityStatus) {
    this.x = x
    this.y = y
    this.active = activityStatus
  }
}
