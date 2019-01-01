/**
 * The additional game application.
 *
 * @author Nail Valeev
 * @version 1.1.0
 */

import { PWDWindow } from './PWDWindow.js'

export default class Game extends PWDWindow {
  constructor (gameId) {
    super('Game', gameId)
    this.ballRadius = 5
    this.deltaX = 2   
    this.deltaY = -2
    this.bookHeight = 10
    this.bookWidth = 70
    this.rightMove = false
    this.leftMove = false
  }
  
  begin () {
    console.log('new Chat application')
    let holder = this.templ.querySelector('.window-content')
    let gameFrame = document.querySelector('#template-game').content.cloneNode(true)
    
    gameFrame.querySelector('#game-start-btn').addEventListener('click', (e) => {
      e.stopPropagation()
      this.init() 
    })
    
    this.gameBody = gameFrame.querySelector('.app-body')
    this.gameBody.classList.toggle('game-body')
    this.gameBoard = gameFrame.querySelector('.app-board')
    this.infoBlock = gameFrame.querySelector('.app-info')
    holder.appendChild(gameFrame)
    
    this.expose()
  }
  
  init () {
    console.log('init()')
    let thisGame = document.querySelector('#' + this.domId)
    this.canvas = thisGame.querySelector('.game-canvas')
    this.context = this.canvas.getContext('2d')
    this.x = this.canvas.width/2
    this.y = this.canvas.height-30
    this.bookX = (this.canvas.width - this.bookWidth) / 2
    setInterval( () => {this.draw()}, 20) // 50 fps
  }
  
  draw () {
    console.log('this.deltaY ' + this.deltaY)
    console.log('this.y ' + this.y)
    if ( (this.y + this.deltaY > this.canvas.height-this.ballRadius) || (this.y + this.deltaY < this.ballRadius ) ) {
      this.deltaY = -this.deltaY
    }
    if ( (this.x + this.deltaX > this.canvas.width-this.ballRadius) || (this.x + this.deltaX < this.ballRadius ) ) {
      this.deltaX = -this.deltaX
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBall()
    this.x += this.deltaX
    this.y += this.deltaY
    
    if(this.rightMove && this.bookX < this.canvas.width - this.bookWidth ) {
      this.bookX += 7
    }
    else if(this.leftMove && this.bookX > 0) {
      this.bookX -= 7
    }
    this.drawBook()
  }

  drawBall () {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2)
    this.context.fillStyle = "#0095DD"
    this.context.fill()
    this.context.closePath()
  }

  drawBook () {
    this.context.beginPath()
    this.context.rect(this.bookX, this.canvas.height - this.bookHeight, this.bookWidth, this.bookHeight)
    this.context.fillStyle = "#0095DD"
    this.context.fill()
    this.context.closePath()
}
}
