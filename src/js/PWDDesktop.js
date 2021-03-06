/**
 * Module for desktop.
 * @author Nail Valeev
 * @version 1.1.0
 */

import Memory from './Memory.js'
import Chat from './Chat.js'
import Game from './Game.js'

export default class PWDDesktop {
  /**
  * @constructor no parameters, property indexZ == 0 by default
  */
  constructor () {
    this.indexZ = 0
    this.globalID = 0
    this.globalLeft = 20
    this.globalTop = 20
    this.DEFAULT_WINDOW_HEIGHT = 400
    this.DEFAULT_WINDOW_WIDTH = 400
    // Separate counters for any type of application
    this.memoryGameCounter = 0
    this.chatCounter = 0
    this.gameCounter = 0

    this.tabIndex = 0
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

    this.memoryGameCounter = 0
  }

  /**
  * Returns options to stack the windows properly
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {Object options} options for new window
  */
  getNewWindowOptions () {
    let options = {}

    options.zIndex = ++this.indexZ
    options.id = ++this.globalID
    options.tabIndex = ++this.tabIndex

    this.globalLeft = (this.globalLeft > this.globalWidth - this.DEFAULT_WINDOW_WIDTH) ? 20 : this.globalLeft += 20
    options.left = this.globalLeft + 'px'

    this.globalTop = (this.globalTop > this.globalHeight - this.DEFAULT_WINDOW_HEIGHT) ? 20 : this.globalTop += 20
    options.top = this.globalTop + 'px'

    options.width = this.DEFAULT_WINDOW_WIDTH + 'px'
    options.height = this.DEFAULT_WINDOW_HEIGHT + 'px'

    return options
  }

  /**
  * Returns incremented z-index to stack the windows properly
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {number} z-index for window to be placed on the top
  */
  getNextZ () {
    return ++this.indexZ
  }

  /**
  * Returns z-index to stack the windows properly
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {number} z-index to compare with z-index
  */
  getCurrentZ () {
    return this.indexZ
  }

  /**
  * Starts the Memory game
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {undefined } void
  */
  startMemory (rows, lines) {
    this.memoryGameCounter++
    let memoryGame = new Memory(this.memoryGameCounter)
    memoryGame.begin()
  }

  /**
  * Starts the chat application
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {undefined } void
  */
  startChat () {
    this.chatCounter++
    let chatApp = new Chat(this.chatCounter)
    chatApp.begin()
  }

  /**
  * Starts the additional Game application
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {undefined } void
  */
  startGame () {
    this.gameCounter++
    let gameApp = new Game(this.gameCounter)
    gameApp.begin()
  }
}
