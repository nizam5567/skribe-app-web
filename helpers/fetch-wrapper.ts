const get = async (url: string) => {
  const requestOptions = {
    'method': 'GET'
    // headers: authHeader(url)
  };
  return await fetch(url, requestOptions);
};

const post = async (url: string, body: any) => {
  console.log('body', JSON.stringify(body));
  const requestOptions = {
    'method': 'POST',
    'headers': { 'Content-Type': 'application/json' },
    // credentials: 'include',
    'body': JSON.stringify(body)
  };
  const res = await fetch(url, requestOptions as any);
  console.log('response - ', res);
  return res;
};

const put = async (url: string, body: any) => {
  console.log('body', JSON.stringify(body));
  const requestOptions = {
    'method': 'PUT',
    'headers': { 'Content-Type': 'application/json' },
    // credentials: 'include',
    'body': JSON.stringify(body)
  };
  const res = await fetch(url, requestOptions as any);
  console.log('response - ', res);
  return res;
};
export const fetchWrapper = {
  get,
  post,
  put
  // delete: _delete
};
