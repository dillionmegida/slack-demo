import axios from 'axios';
import { SERVER_URL } from 'src/constants';
import UserInterface from 'src/interfaces/UserInterface';
import { setCookie } from 'src/utils/cookies';
import parseServerError from './parseServerError';

type Args = {
  name: string;
  email: string;
  password: string;
  image: string;
};

export default async function createUser(
  values: Args
): Promise<
  (UserInterface & { status: 'success' }) | { message: string; status: 'error' }
> {
  try {
    const res = await axios({
      method: 'POST',
      url: SERVER_URL + '/api/users',
      data: { ...values },
    });

    setCookie('AUTH', res.data.token);

    return res.data;
  } catch (err) {
    return { status: 'error', message: parseServerError(err) };
  }
}
