import axios from 'axios';
import { SERVER_URL } from 'src/constants';
import UserInterface from 'src/interfaces/UserInterface';
import parseServerError from './parseServerError';

export default async function connectUser(
  id: string
): Promise<
  | (UserInterface & { status: 'success'; token: string })
  | { message: string; status: 'error' }
> {
  try {
    const res = await axios({
      method: 'POST',
      url: SERVER_URL + '/api/chat/connect_user/' + id,
    });

    return res.data;
  } catch (err) {
    return { status: 'error', message: parseServerError(err) };
  }
}
