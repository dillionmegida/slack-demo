export default function parseServerError(error: any): string {
  let message = 'Something went wrong';
  
  if (error.response) {
    const { data, status } = error.response;
    if (status === 401) {
      return 'Unauthorized';
    }
    if (data && data.message) {
      return data.message;
    }
  }

  return message;
}
