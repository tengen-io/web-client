import {IUser} from "./viewer";

export interface IMatchmakingRequest {
  id: string
  queue: string
  user: IUser
  rank: number
  delta: number
  createdAt: string
  updatedAt: string
}
