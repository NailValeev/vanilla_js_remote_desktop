/**
 * Module for desktop.
 * @author Nail Valeev
 * @version 1.1.0
 */

export default class Desktop {
  /**
     * Static functions created
     * @constructor no parameters, propertyzIndex == 0 by default
     */
  constructor () {
    this.zIndex = 0
  }

  /**
    * Creates a desktop
    *
    * @param {none}
    * @throws {none} nothing crucial to throw
    * @returns {undefined} void
    */
  create () {
    let desktop = document.createElement('div')
    desktop.classList.add('desktop')
    let dock = document.querySelector('.dock')
    document.body.insertBefore(desktop, dock)
  }
}
