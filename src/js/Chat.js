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
    // TODO check if user has nickname saved
    this.nickname = ''
    if (window.localStorage.getItem('nickname')) {
      this.nickname = window.localStorage.getItem('nickname')
    }

    let self = this
    let holder = this.templ.querySelector('.window-content')
    let chatFrame = document.querySelector('#template-chat').content.cloneNode(true)
    this.btn = chatFrame.querySelector('#text-btn')
    this.input = chatFrame.querySelector('#text-input')
    this.input.addEventListener('click', (e) => {
      e.stopPropagation()
      console.log('input')
    })

    if (this.nickname) {
      this.btn.innerHTML = 'Start chat as ' + this.nickname
      this.btn.addEventListener('click', function (e) { self.init(true) })
      this.input.style.display = 'none'
    } else {
      // TODO handle nickname input
      this.input.placeholder = 'Nickname'
      this.btn.innerHTML = 'Submit'
      this.btn.addEventListener('click', function (e) {
        e.stopPropagation()
        self.saveNickname(true)
      })
    }

    this.chatBody = chatFrame.querySelector('.app-body')
    this.chatBody.classList.toggle('chat-body')
    this.chatBoard = chatFrame.querySelector('.app-board')
    this.infoBlock = chatFrame.querySelector('.app-info')

    holder.appendChild(chatFrame)

    this.expose()
  }

  init () {

  }
}
