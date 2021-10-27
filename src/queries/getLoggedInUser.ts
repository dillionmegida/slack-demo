import axios from 'axios';
import { SERVER_URL } from 'src/constants';
import UserInterface from 'src/interfaces/UserInterface';

export default async function getLoggedInUser(): Promise<UserInterface | null> {
  try {
    const res = await axios({
      method: 'GET',
      url: SERVER_URL + '/api/users/me',
    });

    return res.data;
  } catch {
    return null;
  }
}
