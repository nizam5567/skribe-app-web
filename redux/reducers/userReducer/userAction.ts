import { GET_USER, SAVE_USER } from './userTypes';

interface IUser {
  userId: number | null
  firstName: string
  lastName: string
  email: string
  newUser: boolean
}
export const saveUser = (user: any) => ({
  'type': SAVE_USER,
  'payload': user
});

export const getUser = () => ({
  'type': GET_USER
});
