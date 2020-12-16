export interface Ticker {
  time: number
  delta: number
}

export interface Position {
  x: number
  y: number
}

export interface Ball {
  position: Position
  direction: Position
}

export interface Brick extends Position {
  width: number
  height: number
}

export type Paddle = number
export type Direction = number
export type Objects = {
  ball: Ball
  bricks: Brick[]
  collisions: {
    paddle: boolean
    wall: boolean
    ceiling: boolean
    brick: boolean
  }
}