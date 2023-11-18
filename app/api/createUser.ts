import api from './api';

const createUser = async (tg_handle: string, address?: string) => {
  if (!address) {
    return;
  }
  try {
    const res = await api.post('create-user', {
      wallet_address: address,
      telegram_handle: tg_handle,
    });

    console.log('res', res.data);
  } catch (e) {
    console.log('error', e);
  }
};

export default createUser;
