import {User} from '../storage/user';
import api from './api';
type Return = User | false;

async function userIsRegistered(address?: string): Promise<Return> {
  if (!address) {
    return false;
  }
  try {
    const userData = await api.get('get-user?wallet_address=' + address);

    if (userData.data.user_by_pk) {
      return userData.data.user_by_pk as User;
    }

    return false;
  } catch (e) {
    console.log('error', e);
    return false;
  }
}

export default userIsRegistered;
