import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import ActionButton from './ActionButton'; // Assurez-vous que le chemin d'accès est correct

type Props = {
  onButtonPress: (text: string) => void;
};

const TelegramForm = ({onButtonPress}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };
  console.log('inputValue', inputValue);

  const handlePress = () => {
    console.log('Pressed');

    if (onButtonPress && inputValue) {
      onButtonPress(inputValue);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={inputValue}
        placeholder="Enter text here"
      />
      <ActionButton text="Press Me" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default TelegramForm;
