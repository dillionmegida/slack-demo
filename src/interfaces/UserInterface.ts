export default interface UserInterface {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export interface StreamUserInterface {
  banned: boolean;
  created_at: string;
  id: string;
  image: string;
  last_active: string;
  name: string;
  online: boolean;
  role: 'user';
  shadow_banned: boolean;
  updated_at: string;
}
