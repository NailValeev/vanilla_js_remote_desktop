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
    this.outputMessage = ''
    this.channel = 'open-channel-1dv022-3'

    this.connection = null
    this.connecting = false
    this.connected = false
    this.messages = []
  }

  begin () {
    console.log('Chat app begin()')
    // Show not connected status - will be connected on init only
    this.showDisconnected()
    // TODO check if user has nickname saved
    if (window.localStorage.getItem('nickname')) {
      this.nickname = window.localStorage.getItem('nickname')
    }
    let holder = this.templ.querySelector('.window-content')
    let chatFrame = document.querySelector('#template-chat').content.cloneNode(true)
    this.btn = chatFrame.querySelector('#text-btn')
    this.input = chatFrame.querySelector('#text-input')
    
    this.chatBody = chatFrame.querySelector('.app-body')
    this.chatBody.classList.toggle('chat-body')
    this.chatBoard = chatFrame.querySelector('.app-board')
    this.infoBlock = chatFrame.querySelector('.app-info')

    holder.appendChild(chatFrame)

    this.checkNickname()
    this.expose()
  }

  checkNickname () {     
    if (this.nickname) {
      this.btn.innerHTML = 'Start chat as ' + this.nickname
      this.btn.addEventListener('click', (e) => { this.init(); e.stopPropagation() })
      this.input.style.display = 'none'
    } else {
      // TODO handle nickname input
      this.input.addEventListener('click', (e) => {
        e.stopPropagation()
      })
      this.input.addEventListener('keyup', (e) => {
        this.infoBlock.innerHTML = this.input.value
        this.nickname = this.input.value
      })
      this.input.placeholder = 'Nickname'
      this.btn.innerHTML = 'Submit'
      this.btn.addEventListener('click', (e) => {
        e.stopPropagation()
        this.saveNickname()
      })
    }
  }

  init () {
    if (this.connecting) return // Already trying to connect, prevent multiple clicks
    
    this.connecting = true

    console.log('Chat app init()')
    this.infoBlock.innerHTML = 'Connecting to server...'
    let infoBox = document.createElement('div')
    infoBox.classList.toggle('checking-holder')
    if ( !this.chatBoard.classList.contains('.checking-holder')){
      this.chatBoard.appendChild(infoBox)
    }
    this.connection = new WebSocket(this.server)
    this.connection.onerror = (event) => { console.log(this.domId + ' conection error' + event) }
    this.connection.onclose = (event) => { 
      console.log(this.domId + ' conection closed' + event)
      this.showDisconnected() 
    }

    this.connection.onopen = (event) => {
      console.log('conection opened' + event)
      this.showConnected()
    }

    this.connection.onmessage = (event) => {
      let msg = JSON.parse(event.data)
      if (msg.type === 'heartbeat') {
        // console.log('Heartbeat from the ' + msg.username) // Ignore me
      } else if (msg.type === 'notification' && msg.data === 'You are connected!') {
        console.log('App have got handshake from the chat server!')
        setTimeout( 
          () => {
            this.infoBlock.innerHTML = this.nickname + ', you are connected'
            this.chatBoard.removeChild(this.chatBoard.firstChild) // Connecting image
            let messenger = document.createElement('div')
            messenger.classList.toggle('messenger')
            this.chatBoard.appendChild(messenger) // Connecting image
            // TODO check localstorage for saved messages in order to expose
            this.messenger = this.chatBoard.querySelector('.messenger')
            this.messenger.addEventListener('click', (e) => {
              e.stopPropagation();
              document.querySelector('#' + this.domId).querySelector('.messenger').focus()
            })

            this.input.style.display = 'inline'
            this.input.value = ''

            this.input.addEventListener('click', (e) => {
              e.stopPropagation()
            })

            this.input.removeEventListener('keyup', (e) => {
              this.infoBlock.innerHTML = this.input.value
              this.nickname = this.input.value
            })

            this.input.addEventListener('keyup', (e) => {
              this.outputMessage = this.input.value
            })

            this.input.placeholder = 'Your message'
            this.btn.innerHTML = 'Send'
            this.btn.addEventListener('click', (e) => {
              e.stopPropagation()
              this.sendMessage()
            })
            
            this.messages = this.getMessages()
            this.messages.forEach( (msg) => this.displayMessage(msg))
          }, 1000 )
        } else  if (msg.type === 'message'){
          console.log('Message from the ' + msg.username)
          console.log('msg' + event.data)
          this.saveMessage (msg)
          this.displayMessage( msg )
        }
    }
  }

  saveNickname () {
    let nick = this.nickname.trim()
    if (nick.length > 0) {
      window.localStorage.setItem('nickname', nick)
      this.infoBlock.innerHTML = ''
      this.checkNickname()
    } else {
      this.infoBlock.innerHTML = 'Please fill the form field'
    }
  }

  showDisconnected () {
    let icon = document.createElement('img')
    icon.classList.toggle('window-icon')
    icon.classList.toggle('conn-icon')
    icon.src = 'image/disconnect.png'
    this.windowHeader.appendChild(icon)
  } 

  showConnected () {
    this.windowHeader.querySelector('.conn-icon').src = 'image/connected.png'
  } 

  sendMessage () {
    let msg = {
      type: 'message',
      data: this.outputMessage,
      username: this.nickname,
      channel: this.channel,
      key: this.apiKey
    }

    this.connection.send(JSON.stringify(msg))
    this.input.value = ''
  }

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
  * @param {none} _ 
  * @throws {none} nothing crucial to throw
  * @returns {Object[]} scores array with messages
  */
  getMessages () {
    let result = JSON.parse(window.localStorage.getItem('messages'))
    if (result === null) result = [] // Avoid NullPointer on empty array
    return result
  }

}
