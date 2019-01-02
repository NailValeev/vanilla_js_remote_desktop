/**
 * The starting point of the application.
 *
 * @author Nail Valeev
 * @version 1.1.0
 */

import PWDDesktop from './PWDDesktop.js'

var dt = new PWDDesktop()
dt.create()
window.dt = dt
dt.globalHeight = document.querySelector('.desktop').offsetHeight
dt.globalWidth = document.querySelector('.desktop').offsetWidth

// var clickHandler = function (event, name) { if (event.detail !== 2) win.create(name) } // do nothing on dblclick
var clickMemory = function (event) { if (event.detail !== 2) dt.startMemory() } // do nothing on dblclick
var clickChat = function (event) { if (event.detail !== 2) dt.startChat() } // do nothing on dblclick
var clickGame = function (event) { if (event.detail !== 2) dt.startGame() } // do nothing on dblclick

document.querySelector('#chat-btn').addEventListener('click', (e) => { clickChat(e) })
document.querySelector('#memory-btn').addEventListener('click', (e) => { clickMemory(e) })
document.querySelector('#game-btn').addEventListener('click', (e) => { clickGame(e) })
document.querySelector('#clean-btn').addEventListener('click', (e) => { dt.refresh() })

// dblclick includes click - so, only one window will be created
document.querySelector('#chat-btn').addEventListener('dblclick', function () { return false })
document.querySelector('#memory-btn').addEventListener('dblclick', function () { return false })
document.querySelector('#game-btn').addEventListener('dblclick', function () { return false })

document.querySelector('#trash-btn').addEventListener('dragover', (e) => {
  e.preventDefault()
  // Set the dropEffect to move
  e.dataTransfer.dropEffect = 'copy'
})
document.querySelector('#trash-btn').addEventListener('dragenter', (e) => {
  e.preventDefault()
})
document.querySelector('#trash-btn').addEventListener('dragleave', (e) => {
  e.preventDefault()
})
document.querySelector('#trash-btn').addEventListener('drop', (e) => {
  // Get the id of the target and add the moved element to the target's DOM
  let id = e.dataTransfer.getData('text/plain')
  let win = document.getElementById(id)
  document.querySelector('.desktop').removeChild(win)
})
