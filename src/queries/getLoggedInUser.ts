import axios from 'axios';
import { SERVER_URL } from 'src/constants';
import UserInterface from 'src/interfaces/UserInterface';
import { getCookie } from 'src/utils/cookies';

export default async function getLoggedInUser(): Promise<UserInterface | null> {
  try {
    const res = await axios({
      method: 'GET',
      url: SERVER_URL + '/api/users/me',
      headers: {
        Authorization: `Bearer ${getCookie('AUTH')}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log({ err });
    return null;
  }
}
