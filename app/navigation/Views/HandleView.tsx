import React, {useState} from 'react';
import {useAccount} from 'wagmi';
import {createUser} from '../../api';
import DefaultView from '../../components/DefaultView';
import TelegramForm from '../../components/TelegramForm';
import {RootStackParamList} from '../Stacks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'HandleView'>;

const HandleView = ({navigation}: Props) => {
  const {address} = useAccount();
  const [loading, setLoading] = useState(false);

  const handlePress = async (tg_handle: string) => {
    setLoading(true);
    try {
      await createUser(tg_handle, address);

      navigation.navigate('Profile');
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultView>
      <TelegramForm loading={loading} onButtonPress={handlePress} />
    </DefaultView>
  );
};

export default HandleView;
