import {GameState, GameType, GameUserEdgeType} from "./enums";
import {IUser} from "./viewer";

export interface IGameUserEdge {
  type: GameUserEdgeType
  user: IUser
}

export default interface IGame {
  id: string
  type: GameType
  state: GameState
  users: IGameUserEdge[]
  boardSize: number
  createdAt: string
  updatedAt: string
}
