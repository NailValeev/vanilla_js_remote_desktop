// eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd
/**
 * The memory game application.
 *
 * @author Nail Valeev
 * @version 1.1.0
 */

import { PWDWindow } from './PWDWindow.js'

export default class Chat extends PWDWindow {
  constructor (chatId) {
    super('Chat', chatId)
  }

  begin () {
    console.log('new Chat application')
    let self = this

    let holder = this.templ.querySelector('.window-content')

    let gameFrame = document.querySelector('#template-chat').content.cloneNode(true)

    gameFrame.querySelector('#run44').addEventListener('click', function (e) { self.init(4, 4) })
    gameFrame.querySelector('#run22').addEventListener('click', function (e) { self.init(2, 2) })
    gameFrame.querySelector('#run24').addEventListener('click', function (e) { self.init(2, 4) })

    this.gameBody = gameFrame.querySelector('.app-body')
    this.gameBody.classList.toggle('chat-body')
    this.gameBoard = gameFrame.querySelector('.app-board')
    this.infoBlock = gameFrame.querySelector('.app-info')

    holder.appendChild(gameFrame)

    this.expose()
  }

  init () {
    // TODO check if user has name filled
  }
}
