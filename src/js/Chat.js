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
    this.server = 'ws://vhost3.lnu.se:20080/socket/'
    this.apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    this.nickname = ''
    this.connection = null
    this.connected = false
  }

  begin () {
    console.log('new Chat application')
    // TODO check if user has nickname saved
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
      this.infoBlock.innerHTML = 'Input your nickname for the chat'
    })
    this.input.addEventListener('keyup', (e) => {
      this.infoBlock.innerHTML = this.input.value
      this.nickname = this.input.value
    })

    if (this.nickname) {
      this.btn.innerHTML = 'Start chat as ' + this.nickname
      this.btn.addEventListener('click', function (e) { self.init() })
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
    console.log('Chat application in action :)')
    this.infoBlock.innerHTML = 'Connecting to server...'
    let infoBox = document.createElement('div')
    infoBox.classList.toggle('checking-holder')
    this.chatBoard.appendChild(infoBox)

    this.connection = this.connect()
  }

  saveNickname () {
    let nick = this.nickname.trim()
    if (nick.length > 0) {
      window.localStorage.setItem('nickname', nick)
      this.init()
    } else {
      this.infoBlock.innerHTML = 'Please fill the form field'
    }
  }

  connect () {
    let conn = new WebSocket(this.server)

    conn.onerror = function (event) {
      console.log('conection error' + event)
    }

    conn.onclose = function (event) {
      console.log('conection closed' + event)
      // TODO fire custom event ?
    }

    conn.onopen = function (event) {
      console.log('conection opened' + event)
      return conn
    }

    conn.onmessage = function (event) {
      console.log('New message' + event)
    }
  }
}
