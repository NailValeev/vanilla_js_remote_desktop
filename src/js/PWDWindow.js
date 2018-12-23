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

    this.domId = 'window' + this.options.id
    this.templ = document.querySelector('#template-pwd-window').content.cloneNode(true)
    let win = this.templ.querySelector('.window')
    win.setAttribute('id', this.domId)
    win.querySelector('span').innerHTML = name + ' ' + gameId
    win.querySelector('.window-icon').src = 'image/' + name.toLowerCase() + '.png'
    win.querySelector('.close-button').addEventListener('click', function (e) { self.close('#' + self.domId, e) })
    win.addEventListener('mousedown', function (e) { self.toTheTop('#' + self.domId) })
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
    })

    win.style.zIndex = this.options.zIndex
    win.style.left = this.options.left
    win.style.top = this.options.top
    win.style.width = this.options.width
    win.style.height = this.options.height
    // win.style = options (incorrect, data set contains id)
  }

  close (elementId, e) {
    console.log('closing window ' + elementId)
    this.desktop.removeChild(document.querySelector(elementId))
    e.stopPropagation()
  }

  toTheTop (elementId) {
    let win = document.querySelector(elementId)

    if (Number(win.style.zIndex) === window.dt.getCurrentZ()) {
      console.log('window ' + elementId + ' already at the top')
      return // on the top
    }
    console.log('moving window ' + elementId + 'to the top')
    win.style.zIndex = window.dt.getNextZ()
  }

  expose () {
    this.desktop.appendChild(this.templ)
  }
}

export { PWDWindow }
