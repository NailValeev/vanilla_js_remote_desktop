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
  constructor (name) {
    let self = this
    this.desktop = document.querySelector('.desktop')
    this.options = window.dt.getNewWindowOptions()

    this.domId = 'window' + this.options.id
    this.templ = document.querySelector('#template-pwd-window').content.cloneNode(true)
    let win = this.templ.querySelector('.window')
    win.setAttribute('id', this.domId)
    win.querySelector('span').innerHTML = name
    win.querySelector('.window-icon').src = 'image/' + name.toLowerCase() + '.png'
    win.querySelector('.close-button').addEventListener('click', function () { self.close('#' + self.domId) })

    win.style.zIndex = this.options.zIndex
    win.style.left = this.options.left
    win.style.top = this.options.top
    win.style.width = this.options.width
    win.style.height = this.options.height
    // win.style = options (data set contains id)
  }

  close (elementId) {
    console.log('closing window ' + elementId)
    this.desktop.removeChild(document.querySelector(elementId))
  }

  expose () {
    this.desktop.appendChild(this.templ)
  }
}

export { PWDWindow }
