/**
 * Module for desktop.
 * @author Nail Valeev
 * @version 1.1.0
 */
import { PWDWindow } from './PWDWindow.js'

export default class PWDDesktop {
  /**
  * @constructor no parameters, property indexZ == 0 by default
  */
  constructor () {
    this.indexZ = 0
    this.globalID = 0
    this.globalLeft = 20
    this.globalTop = 20
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

  /**
  * Refreshing of a desktop
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {undefined} void
  */
  refresh () {
    let desktop = document.querySelector('.desktop')
    while (desktop.childElementCount > 0) {
      desktop.removeChild(desktop.firstChild) // To clear all old windows
    }
    this.indexZ = 0
    this.globalID = 0
    this.globalLeft = 20
    this.globalTop = 20
  }

  /**
  * Returns increased indexZ to stack the windows properly
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {Object options} options for new window
  */
  getNewWindowOptions () {
    let options = {}

    options.indexZ = ++this.indexZ
    options.id = ++this.globalID

    this.globalLeft += 20
    options.left = this.globalLeft + 'px'

    this.globalTop += 20
    options.top = this.globalTop + 'px'

    console.log('options to set' + options.id)
    return options

  }
}
