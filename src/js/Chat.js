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
    this.connecting = false
    this.connected = false
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
        this.infoBlock.innerHTML = 'Input your nickname for the chat'
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
            // TODO check localstorage for saved messages in order to expose
          }, 1000 )
      } else {
        console.log('Message from the ' + msg.username)
        console.log('msg' + event.data)
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

}
