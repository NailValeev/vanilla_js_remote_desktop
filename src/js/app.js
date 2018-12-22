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
var clickMemory = function (event) { if (event.detail !== 2) dt.startMemory(2, 2) } // do nothing on dblclick

// document.querySelector('#chat-btn').addEventListener('click', (e) => { clickHandler(e, 'Chat') })
document.querySelector('#memory-btn').addEventListener('click', (e) => { clickMemory(e) })
// document.querySelector('#game-btn').addEventListener('click', (e) => { clickHandler(e, 'Game') })
document.querySelector('#clean-btn').addEventListener('click', (e) => { dt.refresh() })

// dblclick includes click - so, only one window will be created
document.querySelector('#chat-btn').addEventListener('dblclick', function () { return false })
document.querySelector('#memory-btn').addEventListener('dblclick', function () { return false })
document.querySelector('#game-btn').addEventListener('dblclick', function () { return false })
