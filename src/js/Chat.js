/**
 * Chat application
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
    this.outputMessage = ''
    this.channel = 'open-channel-1dv022-3'

    this.connection = null
    this.connecting = false
    this.connected = false
    this.messages = []
  }

  /**
  * Chat beginning, handling of DOM
  *
  * @param {none} _ template defined in the index file
  * @returns {undefined} void, handling of this and DOM
  */
  begin () {
    // Show not connected status - will be connected on init only
    this.showDisconnected()
    if (window.localStorage.getItem('nickname')) {
      this.nickname = window.localStorage.getItem('nickname')
    }
    let holder = this.templ.querySelector('.window-content')
    let chatFrame = document.querySelector('#template-chat').content.cloneNode(true)

    this.btnBlock = chatFrame.querySelector('.app-buttons')
    this.msgInputBlock = chatFrame.querySelector('.msg-input-block')
    this.nameInputBlock = chatFrame.querySelector('.name-input-block')

    this.startBtn = chatFrame.querySelector('#start-btn')
    this.startBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.init()
    })
    this.resetBtn = chatFrame.querySelector('#reset-btn')
    this.resetBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      window.localStorage.removeItem('nickname')
      this.nickname = ''
      this.checkNickname()
    })
    this.nameInput = chatFrame.querySelector('#name-input')
    this.nameInput.addEventListener('click', (e) => {
      e.stopPropagation()
    })
    this.nameInput.addEventListener('keyup', (e) => {
      this.nickname = this.nameInput.value
    })
    this.saveBtn = chatFrame.querySelector('#save-btn')
    this.saveBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.saveNickname()
    })
    this.msgInput = chatFrame.querySelector('#msg-input')
    this.msgInput.addEventListener('click', (e) => {
      e.stopPropagation()
    })
    this.msgInput.addEventListener('keyup', () => {
      this.outputMessage = this.msgInput.value
    })
    this.sendBtn = chatFrame.querySelector('#send-btn')
    this.sendBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.sendMessage()
    })
    this.chatBody = chatFrame.querySelector('.app-body')
    this.chatBody.classList.toggle('chat-body')
    this.chatBoard = chatFrame.querySelector('.app-board')

    holder.appendChild(chatFrame)

    this.checkNickname()
    this.expose()
  }

  /**
  * Checking localstorage for nickname saved, propmt to input if not
  *
  * @param {none} _ , this.nickname used
  * @returns {undefined} void, handling of this and DOM
  */
  checkNickname () {
    if (this.nickname !== '') { // Actually, if(this.nickname) works, too
      this.resetBtn.style.display = 'inline'
      if (this.btnBlock.querySelector('.name-holder') === null) {
        let nameHolder = document.createElement('span')
        nameHolder.classList.toggle('name-holder')
        nameHolder.innerHTML = 'Hi, ' + this.nickname
        nameHolder.style.cssFloat = 'left'
        this.btnBlock.insertBefore(nameHolder, this.resetBtn)
      } else {
        this.btnBlock.querySelector('.name-holder').innerHTML = 'Hi, ' + this.nickname
      }

      if (!this.connected) { // name will be changed, chat has been initialized
        this.startBtn.style.display = 'inline'
        this.startBtn.innerHTML = 'Start chat as ' + this.nickname
        this.nameInputBlock.style.display = 'none'
      }
    } else {
      // TODO handle nickname input
      this.nameInputBlock.style.display = 'block'
      this.nameInput.placeholder = 'Nickname'
    }
  }

  /**
  * Chat initialization
  *
  * @param {none} _ this.* properties used
  * @returns {undefined} void, handling of this and DOM
  */
  init () {
    if (this.connecting) return // Already trying to connect, prevent multiple clicks

    this.connecting = true

    let infoBox = document.createElement('div')
    infoBox.classList.toggle('checking-holder')
    if (!this.chatBoard.classList.contains('.checking-holder')) {
      this.chatBoard.appendChild(infoBox)
    }
    this.connection = new window.WebSocket(this.server)
    this.connection.onerror = (event) => { console.log(this.domId + ' conection error' + event) }
    this.connection.onclose = (event) => {
      console.log('Chat ' + this.domId + ' connection closed')
      this.connected = false
      this.showDisconnected()
    }
    this.connection.onopen = (event) => {
      this.connected = true
      this.showConnected()
    }

    this.connection.onmessage = (event) => {
      let msg = JSON.parse(event.data)
      if (msg.type === 'heartbeat') {
        // console.log('Heartbeat from the ' + msg.username) // Ignore
      } else if (msg.type === 'notification' && msg.data === 'You are connected!') {
        setTimeout(() => {
          this.chatBoard.removeChild(this.chatBoard.firstChild) // Connecting image
          let messenger = document.createElement('div')
          messenger.classList.toggle('messenger')
          this.chatBoard.appendChild(messenger) // Connecting image
          this.messenger = this.chatBoard.querySelector('.messenger')

          this.msgInputBlock.style.display = 'block'
          this.msgInput.value = ''

          this.msgInput.placeholder = 'Your message'

          this.messages = this.getMessages()
          this.messages.forEach((msg) => this.displayMessage(msg))
        }, 1000)
      } else if (msg.type === 'message') {
        this.saveMessage(msg)
        this.displayMessage(msg)
      }
    }
  }

  /**
  * Saving nickname to localstorage
  *
  * @param {none} _ this.* properties used
  * @returns {undefined} void, handling of this and local storage
  */
  saveNickname () {
    let nick = this.nickname.trim()
    if (nick.length > 0) {
      window.localStorage.setItem('nickname', nick)
      this.nameInputBlock.style.display = 'none'
      this.checkNickname()
    }
  }

  /**
  * Handling of GUI if connection was not established
  *
  * @param {none} _ this.* properties used
  * @returns {undefined} void, handling DOM and this
  */
  showDisconnected () {
    let icon = document.createElement('img')
    icon.classList.toggle('window-icon')
    icon.classList.toggle('conn-icon')
    icon.src = 'image/disconnect.png'
    this.windowHeader.appendChild(icon)
  }

  /**
  * Handling of GUI when connection was established
  *
  * @param {none} _ this.* properties used
  * @returns {undefined} void, handling DOM and this
  */
  showConnected () {
    this.windowHeader.querySelector('.conn-icon').src = 'image/connected.png'
    this.startBtn.style.display = 'none'
  }

  /**
  * Sending message to the server
  *
  * @param {none} _ this.* properties used
  * @returns {undefined} void, handling DOM and this
  *
  */
  sendMessage () {
    let msg = {
      type: 'message',
      data: this.outputMessage,
      username: this.nickname,
      channel: this.channel,
      key: this.apiKey
    }

    this.connection.send(JSON.stringify(msg))
    this.msgInput.value = ''
  }

  /**
  * Dispalying message (any , fetched from local storage or new one)
  *
  * @param {Object} msg Object which contains message text and other data
  * @returns {undefined} void, handling of DOM and local storage
  */
  displayMessage (msg) {
    let text = msg.data
    let user = msg.username
    let msgHolder = document.querySelector('#template-msg').content.cloneNode(true)
    msgHolder.querySelector('.msg-header').innerHTML = user
    msgHolder.querySelector('.msg-body').innerHTML = text
    msgHolder.querySelector('.msg-footer').innerHTML = new Date()
    if (this.nickname === user) msgHolder.querySelector('.msg').classList.toggle('my-msg')
    this.messenger.appendChild(msgHolder)
    this.messenger.scrollTop = this.messenger.scrollHeight
  }

  /**
  * Stringifying of array in order to save to the local storage, saving it
  *
  * @param {Object} data array with data to be stringified and saved
  * @throws {none} nothing special to throw
  * @returns {undefined} void, local storage will be changed (or not)
  */
  saveMessage (msgObject) {
    if (this.messages.length >= 25) {
      this.messages.shift()
    }
    this.messages.push(msgObject)
    window.localStorage.setItem('messages', JSON.stringify(this.messages))
  }

  /**
  * Reading of string from localstorage and parsing it to an array
  *
  * @param {none} _ reading from local storage
  * @throws {none} nothing crucial to throw
  * @returns {Object[]} scores array with messages
  */
  getMessages () {
    let result = JSON.parse(window.localStorage.getItem('messages'))
    if (result === null) result = [] // Avoid NullPointer on empty array
    return result
  }
}
