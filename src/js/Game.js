/**
 * The additional game application.
 *
 * @author Nail Valeev
 * @version 1.1.0
 */

import { PWDWindow } from './PWDWindow.js'
import Candle from './Candle.js';

export default class Game extends PWDWindow {
  constructor (gameId) {
    super('Game', gameId)
    this.ballRadius = 5
    this.candleRadius = 7
    this.candles = []
    this.candlesNumber = 5
    this.deltaX = -2 
    this.deltaY = -1
    this.bookHeight = 3
    this.bookWidth = 70
    this.rightMove = false
    this.leftMove = false

    this.candleXpositons = [192, 238, 165, 215, 265]
    this.candleYpositons = [60, 60, 70, 70, 70]

    this.goodShots = 0

  }
  
  begin () {
    console.log('new Chat application')
    let holder = this.templ.querySelector('.window-content')
    let gameFrame = document.querySelector('#template-game').content.cloneNode(true)
    
    gameFrame.querySelector('#game-start-btn').addEventListener('click', (e) => {
      e.stopPropagation()
      this.startBtn.style.display = 'none'
      this.init() 
    })
    
    this.gameBody = gameFrame.querySelector('.app-body')
    this.gameBody.classList.toggle('game-body')
    this.gameBoard = gameFrame.querySelector('.app-board')
    this.infoBlock = gameFrame.querySelector('.app-info')
    this.startBtn = gameFrame.querySelector('#game-start-btn')
    holder.appendChild(gameFrame)
    
    this.expose()
    
    let thisGame = document.querySelector('#' + this.domId)
    this.canvas = thisGame.querySelector('.game-canvas')
    this.context = this.canvas.getContext('2d')
  }
  
  init () {
    console.log('init()')
    this.goodShots = 0

    if (this.gameOver){
      while (this.gameBoard.childElementCount > 1) {
        this.gameBoard.removeChild(this.gameBoard.firstChild) // To clear old results
      }
      this.gameOver = false
      this.canvas.style.display = 'block'
    }

    this.x = this.canvas.width/2
    this.y = this.canvas.height-30
    this.bookX = (this.canvas.width - this.bookWidth) / 2

    for (var k = 0; k < this.candlesNumber; k++){
      console.log('Drawing candle n' + k)
      let candle = new Candle(this.candleXpositons[k], this.candleYpositons[k], true)
      this.candles.push(candle)
    }

    this.animation = setInterval( () => {this.draw()}, 20) // 50 fps
  }
  
  draw () {
    if ( (this.x + this.deltaX > this.canvas.width-this.ballRadius) || (this.x + this.deltaX < this.ballRadius ) ) {
      this.deltaX = -this.deltaX
    }

    if ( this.y + this.deltaY < this.ballRadius ) {
      this.deltaY = -this.deltaY
    }
    else if ( this.y + this.deltaY > this.canvas.height-this.ballRadius) {
      if(this.x > this.bookX && this.x < this.bookX + this.bookWidth) {
        this.deltaY = -this.deltaY
        if (this.rightMove) this.deltaX += 2
        else if (this.leftMove) this.deltaX -= 2
      } else {
        this.endGame (false)
      }
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
    this.drawCandles()
    this.checkCandlesCollision()
    if (this.goodShots === this.candlesNumber) {
      this.endGame(true)
    }
  }

  drawBall () {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2)
    this.context.fillStyle = "#dd4422"
    this.context.fill()
    this.context.closePath()
  }

  drawBook () {
    this.context.beginPath()
    this.context.rect(this.bookX, this.canvas.height - this.bookHeight, this.bookWidth, this.bookHeight)
    this.context.fillStyle = "#cceeff"
    this.context.fill()
    this.context.closePath()
  }

  drawCandles() {
    if ( this.candles.length === 0) return 
    for(var i = 0; i < this.candlesNumber; i++) {
      if ( this.candles[i].active === true) {
        this.context.beginPath()
        this.context.arc(this.candles[i].x, this.candles[i].y, this.candleRadius, 0, Math.PI*2)
        if (this.y % 2 === 1){
          this.context.fillStyle = "#ff8c00"
        } else {
          this.context.fillStyle = "#48d1cc"
        }
        this.context.fill()
        this.context.closePath()
      }
    }
  }

  checkCandlesCollision() {
    if ( this.candles.length === 0) return 
    for(var m = 0; m < this.candlesNumber; m++) {
      var candle = this.candles[m]
      if (!candle.active) continue
      if( 
          Math.abs(this.x - candle.x) < (this.candleRadius + this.ballRadius) && 
          Math.abs(this.y - candle.y) < (this.candleRadius + this.ballRadius)
        ) {
          candle.active = false
          this.goodShots ++
          console.log (this.goodShots + ' candles of ' + this.candlesNumber)
          this.deltaY = -this.deltaY
      }
    }
  }
  
  endGame ( isWinnerFlag ) {

    this.gameOver = true
    this.candles = []
    this.deltaX = -2 
    this.deltaY = -1
    clearInterval(this.animation)
    this.startBtn.style.display = 'inline'
    console.log('Game over, winner: ' + isWinnerFlag)

    let message = isWinnerFlag ? 'YOU WIN !' : 'YOU LOSE!'

    this.message(message, isWinnerFlag)

  }

  message (message, winnerFlag) {
    console.log('message, winner: ' + winnerFlag)

    let board = document.createElement('div')
    board.classList.toggle('memory-board')

    this.canvas.style.display = 'none'

    this.gameBoard.insertBefore(board, this.canvas)

    let infoSpan = document.createElement('span')
    infoSpan.classList.toggle('alert-msg')
    infoSpan.innerHTML = message

    let ImgDiv = document.createElement('div')
    ImgDiv.classList.toggle('alert-img-holder')

    if (winnerFlag) {
      ImgDiv.classList.toggle('alert-winner-holder')
    } else {
      ImgDiv.classList.toggle('alert-loser-holder')
    }

    board.appendChild(infoSpan)
    board.appendChild(ImgDiv)
  }
}
