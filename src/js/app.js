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

document.querySelector('#chat-btn').addEventListener('click', function () { win.create('Chat') })
document.querySelector('#memory-btn').addEventListener('click', function () { win.create('Memory') })
document.querySelector('#game-btn').addEventListener('click', function () { win.create('Game') })
document.querySelector('#clean-btn').addEventListener('click', function () { dt.refresh() })
