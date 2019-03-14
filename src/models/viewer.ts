export interface IUser {
  id: string
  name: string
}

export default interface IViewer {
  id: string
  user: IUser
}
