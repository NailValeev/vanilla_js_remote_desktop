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
  * @returns {undefined} void
  */
  create (name) {
    var options = window.dt.getNewWindowOptions()
    let domId = 'window' + options.id
    this.thisElement = document.querySelector('#' + domId) // Identify to handle in the DOM
    let templ = document.querySelector('#template-pwd-window').content.cloneNode(true)
    let win = templ.querySelector('.window')
    win.setAttribute('id', domId)
    win.querySelector('span').innerHTML = name + ' ' + options.id
    win.style.zIndex = options.indexZ
    win.style.left = options.left
    win.style.top = options.top

    let desktop = document.querySelector('.desktop')
    desktop.appendChild(templ)
  }
}

export { PWDWindow }
