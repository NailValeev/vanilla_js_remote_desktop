/**
 * Module for window (parent for all windows).
 * @author Nail Valeev
 * @version 1.1.0
 */

class PWDWindow {
  /**
  * Creates window on the desktop
  * Refreshing of a desktop
  *
  * @param {none}
  * @throws {none} nothing crucial to throw
  * @returns {NodeModule templ} window - holder for any application
  */
  constructor (name, gameId) {
    // Drag / move handling
    this.dragOptions = {}

    let self = this
    this.desktop = document.querySelector('.desktop')
    this.options = window.dt.getNewWindowOptions()
    this.name = name

    this.domId = 'window' + this.options.id
    this.templ = document.querySelector('#template-pwd-window').content.cloneNode(true)
    let win = this.templ.querySelector('.window')
    this.windowHeader = this.templ.querySelector('.window-header')
    win.setAttribute('id', this.domId)
    win.setAttribute('tabindex', this.options.tabIndex)
    win.querySelector('span').innerHTML = name + ' ' + gameId
    win.querySelector('.window-icon').src = 'image/' + name.toLowerCase() + '.png'
    win.querySelector('.close-button').addEventListener('click', function (e) { self.close('#' + self.domId, e) })
    win.addEventListener('click', function (e) {
      e.preventDefault()
      self.toTheTop('#' + self.domId)
    }) // instead of click, don't wait for mouseup

    win.addEventListener('dragstart', function (e) {
      self.dragOptions = { startX: e.clientX, startY: e.clientY }
      e.dataTransfer.setData('text/plain', e.target.id)
      console.log(e)
      console.log('Start : ' + self.dragOptions.startX + ', ' + self.dragOptions.startY)
    })

    win.addEventListener('dragend', function (e) {
      console.log(e)
      e.preventDefault()
      self.dragOptions.endX = e.clientX
      self.dragOptions.endY = e.clientY
      console.log('End : ' + self.dragOptions.endX + ', ' + self.dragOptions.endY)
      let deltaX = self.dragOptions.endX - self.dragOptions.startX
      let deltaY = self.dragOptions.endY - self.dragOptions.startY
      console.log('deltaX: ' + deltaX + ', deltaY: ' + deltaY)

      e.target.style.left = (e.target.offsetLeft + deltaX) + 'px'
      e.target.style.top = (e.target.offsetTop + deltaY) + 'px'
      self.toTheTop('#' + e.target.id)
    })

    if (name === 'Memory') {
      win.addEventListener('keyup', (e) => { this.handleKeyInput(e.keyCode) })
    }

    win.style.zIndex = this.options.zIndex
    win.style.left = this.options.left
    win.style.top = this.options.top
    win.style.width = this.options.width
    win.style.height = this.options.height
    // win.style = options (incorrect, data set contains id)
  }

  close (elementId, e) {
    console.log('closing window ' + elementId)
    if (this.name === 'Chat') {
      console.log ('Closing connection for ' + elementId )
      this.connection.close()
    } else if (this.name === 'Memory') {
      console.log ('Closing connection for ' + elementId )
      clearInterval(this.intervalHandler)
      this.pause()
    }

    this.desktop.removeChild(document.querySelector(elementId))
    e.stopPropagation()
  }

  toTheTop (elementId) {
    let win = document.querySelector(elementId)

    win.focus()
    if (Number(win.style.zIndex) === window.dt.getCurrentZ()) {
      console.log('window ' + elementId + ' already at the top')
      return // on the top
    }
    console.log('moving window ' + elementId + 'to the top')
    win.style.zIndex = window.dt.getNextZ()
  }

  expose () {
    this.desktop.appendChild(this.templ)
    document.querySelector('#' + this.domId).focus()
  }

  /**
  * Handling of key Inputs
  *
  * @param {number} keyCode key code from event fired on key up
  * @throws {none} nothing crucial to throw
  * @returns {undefined} void
  */
  handleKeyInput (keyCode) {
    if (this.countdown <= 1) return
    console.log('keyCode ' + keyCode)
    // For memory game
    let activeEl = document.activeElement

    let memoryBoard = activeEl.querySelector('.memory-board')

    if (memoryBoard != null) { // memory game
      console.log('Active element is memory game')
      if (memoryBoard.querySelector('.selected') == null && memoryBoard.querySelector('.memory-card') != null) {
        memoryBoard.firstChild.firstChild.classList.add('selected')
      } else {
        let selectedCard = memoryBoard.querySelector('.selected')

        if (keyCode === 13) {
          this.turn(selectedCard)
        } else {
          switch (keyCode) {
            case 39: {
              if (selectedCard.nextElementSibling) {
                selectedCard.classList.toggle('selected')
                selectedCard.nextElementSibling.classList.toggle('selected')
              }
              break
            }
            case 37: {
              if (selectedCard.previousElementSibling) {
                selectedCard.classList.toggle('selected')
                selectedCard.previousElementSibling.classList.toggle('selected')
              }
              break
            }
            case 38: {
              if (selectedCard.parentNode.previousElementSibling) {
                let index = Array.from(selectedCard.parentNode.children).indexOf(selectedCard) // ES6
                selectedCard.classList.toggle('selected')
                selectedCard.parentNode.previousElementSibling.children[index].classList.toggle('selected')
              }
              break
            }
            case 40: {
              if (selectedCard.parentNode.nextElementSibling) {
                let index = Array.from(selectedCard.parentNode.children).indexOf(selectedCard) // ES6
                selectedCard.classList.toggle('selected')
                selectedCard.parentNode.nextElementSibling.children[index].classList.toggle('selected')
              }
              break
            }
          }
        }
      }
    }
  }

  getSelCardIndex (node) {
    console.log('test' + node.childElementCount)

    for (let i = 0; i < node.childElemwntCount; i++) {
      if (node.getChild[i].classList.contains('selected')) return i
    }
  }
}

export { PWDWindow }
