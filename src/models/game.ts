import {GameState, GameType} from "./enums";

export default interface IGame {
  id: string
  type: GameType
  state: GameState
  boardSize: number
  createdAt: string
  updatedAt: string
}
