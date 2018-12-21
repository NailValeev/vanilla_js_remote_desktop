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
    let desktop = document.querySelector('.desktop')

    var options = window.dt.getNewWindowOptions()
    let domId = 'window' + options.id
    let templ = document.querySelector('#template-pwd-window').content.cloneNode(true)
    let win = templ.querySelector('.window')
    win.setAttribute('id', domId)
    win.querySelector('span').innerHTML = name
    win.querySelector('.window-icon').src = 'image/' + name.toLowerCase() + '.png'
    win.querySelector('.close-button').addEventListener('click', function () {
      desktop.removeChild(document.querySelector('#' + domId))
    })

    win.style.zIndex = options.zIndex
    win.style.left = options.left
    win.style.top = options.top
    win.style.width = options.width
    win.style.height = options.height
    // win.style = options (data set contains id)

    desktop.appendChild(templ)
  }

  close (elem) {
    let desktop = document.querySelector('.desktop')
    desktop.removeChild(elem)
  }
}

export { PWDWindow }
