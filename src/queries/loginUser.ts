import axios from 'axios';
import { SERVER_URL } from 'src/constants';
import UserInterface from 'src/interfaces/UserInterface';
import { setCookie } from 'src/utils/cookies';
import parseServerError from './parseServerError';

type Args = {
  email: string;
  password: string;
};

export default async function logInUser(
  values: Args
): Promise<
  | { user: UserInterface; status: 'success' }
  | { message: string; status: 'error' }
> {
  try {
    const res = await axios({
      method: 'POST',
      url: SERVER_URL + '/api/users/login',
      data: { ...values },
    });

    setCookie('AUTH', res.data.token);

    return { user: res.data.user, status: 'success' };
  } catch (err) {
    return { status: 'error', message: parseServerError(err) };
  }
}
