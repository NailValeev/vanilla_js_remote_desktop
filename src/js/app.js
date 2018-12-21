/**
 * The starting point of the application.
 *
 * @author Nail Valeev
 * @version 1.1.0
 */

import PWDDesktop from './PWDDesktop.js'
import { PWDWindow } from './PWDWindow.js'

var dt = new PWDDesktop()
var win = new PWDWindow()

dt.create()
window.dt = dt
dt.globalHeight = document.querySelector('.desktop').offsetHeight
dt.globalWidth = document.querySelector('.desktop').offsetWidth

var clickHandler = function (event, name) { if (event.detail === 1) win.create(name) } // do nothing on dblclick

document.querySelector('#chat-btn').addEventListener('click', (e) => { clickHandler(e, 'Chat') })
document.querySelector('#memory-btn').addEventListener('click', (e) => { clickHandler(e, 'Memory') })
document.querySelector('#game-btn').addEventListener('click', (e) => { clickHandler(e, 'Game') })
document.querySelector('#clean-btn').addEventListener('click', (e) => { dt.refresh() })

// dblclick handles click anyway - so, only one window will be created
document.querySelector('#chat-btn').addEventListener('dblclick', function () { return false })
document.querySelector('#memory-btn').addEventListener('dblclick', function () { return false })
document.querySelector('#game-btn').addEventListener('dblclick', function () { return false })
