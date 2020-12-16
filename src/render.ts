import { Ball, Brick } from './models';
import * as constants from './constants';

const drawBrick = (context: CanvasRenderingContext2D, brick: Brick) => {
  context.beginPath()
  context.rect(
    brick.x - brick.width / 2,
    brick.y - brick.height / 2,
    brick.width,
    brick.height
  )
  context.fill()
  context.closePath()
}

export const drawBricks = (context: CanvasRenderingContext2D, bricks: Brick[]) => {
  bricks.forEach((b: Brick) => drawBrick(context, b))
}

export const drawPaddle = (context: CanvasRenderingContext2D, position: number) => {
  context.beginPath()
  context.rect(
    position - constants.PADDLE_WIDTH / 2,
    context.canvas.height - constants.PADDLE_HEIGHT,
    constants.PADDLE_WIDTH,
    constants.PADDLE_HEIGHT
  )
  context.fill()
  context.closePath()
}

export const drawBall = (context: CanvasRenderingContext2D, ball: Ball) => {
  context.beginPath()
  context.arc(ball.position.x, ball.position.y, constants.BALL_RADIUS, 0, Math.PI * 2)
  context.fill()
  context.closePath()
}