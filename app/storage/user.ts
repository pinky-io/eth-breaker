import storage from './storage';

export type User = {
  wallet_address: string;
  telegram_handle: string;
  preferences: string[] | null;
};

const setUser = (user: User) => {
  storage.save({
    key: 'user',
    data: user,
  });
};

const loadUser = async (): Promise<User> => {
  return storage
    .load({
      key: 'user',
    })
    .then((user: User) => user);
};

export default {setUser, loadUser};
