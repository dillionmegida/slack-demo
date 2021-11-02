import axios from 'axios';
import { SERVER_URL } from 'src/constants';
import parseServerError from './parseServerError';

export default async function getStreamToken(
  id: string
): Promise<
  { status: 'success'; token: string } | { message: string; status: 'error' }
> {
  try {
    const res = await axios({
      method: 'POST',
      url: SERVER_URL + '/api/chat/token/' + id,
    });

    return res.data;
  } catch (err) {
    return { status: 'error', message: parseServerError(err) };
  }
}
