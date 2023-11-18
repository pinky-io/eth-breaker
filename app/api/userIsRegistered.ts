import api from './api';

async function userIsRegistered(address?: string) {
  if (!address) {
    return false;
  }
  try {
    const userData = await api.get('get-user?wallet_address=' + address);

    if (userData.data.user_by_pk) {
      return true;
    }

    return false;
  } catch (e) {
    console.log('error', e);
  }
}

export default userIsRegistered;
