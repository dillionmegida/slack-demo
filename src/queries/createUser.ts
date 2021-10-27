import axios from 'axios';
import { SERVER_URL } from 'src/constants';
import UserInterface from 'src/interfaces/UserInterface';

type Args = {
  name: string;
  email: string;
  password: string;
};

export default async function createUser(
  values: Args
): Promise<UserInterface | null> {
  try {
    const res = await axios({
      method: 'POST',
      url: SERVER_URL + '/api/users',
      data: { ...values },
    });

    return res.data;
  } catch {
    return null;
  }
}
