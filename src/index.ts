import { interval, merge, fromEvent, combineLatest, animationFrameScheduler} from 'rxjs';
import { map, scan, withLatestFrom } from 'rxjs/operators';
import * as constants from './constants';
import * as render from './render';
import * as utils from './utils';
import {
  Ticker,
  Paddle,
  Direction,
  Objects
} from './models';
import './main.scss';

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
context.fillStyle = constants.FILL_COLOR

const INITIAL_OBJECTS = {
  ball: {
    position: {
      x: canvas.width / 2,
      y: canvas.height / 2
    },
    direction: {
      x: 2,
      y: 8
    }
  },
  bricks: utils.createBricks(canvas)
} as Objects;

const ticker$ = interval(1000 / 60, animationFrameScheduler)
  .pipe(
    map(() => ({
      time: Date.now(),
      delta: 0
    } as Ticker)),
    scan((previous, current) => ({
      time: current.time,
      delta: (current.time - previous.time) / 1000
    } as Ticker))
  )

const input$ = merge(
  fromEvent(document, 'keyup'),
  fromEvent(document, 'keydown'),
).pipe(
  map((e: KeyboardEvent) => {
    switch (e.keyCode) {
      case constants.PADDLE_KEYS.LEFT:
        return -1;
      case constants.PADDLE_KEYS.RIGHT:
        return 1;
      default:
        return 0;
    }
  })
)


const paddle$ = ticker$.pipe(
  withLatestFrom(input$),
  scan<[Ticker, Direction], Paddle>(
    (paddle, [ticker, direction]) => utils.movePaddle(canvas, paddle, ticker, direction) as Paddle,
    canvas.width / 2
  )
)

const objects$ = ticker$.pipe(
  withLatestFrom(paddle$),
  scan<[Ticker, Direction], Objects>(
    (objects, [ticker, paddle]) => utils.calculateObjects(canvas, objects, ticker, paddle),
    INITIAL_OBJECTS
  )
)


const game = combineLatest(ticker$, paddle$, objects$).subscribe(([, paddle, objects]: [Ticker, Paddle, Objects]) => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  render.drawPaddle(context, paddle)
  render.drawBall(context, objects.ball)
  render.drawBricks(context, objects.bricks)
})