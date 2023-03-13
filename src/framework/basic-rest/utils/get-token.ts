import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const getToken = () => {
  const token = cookies.get('Authorization');
  const Id = cookies.get('userId');
  if (token && Id) {
    return cookies.get('Authorization');
  }
  return null;

};
