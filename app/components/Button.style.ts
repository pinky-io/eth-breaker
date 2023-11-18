import {StyleSheet} from 'react-native';

const ButtonStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  button: {
    height: 50,
    backgroundColor: 'rgba(33,92,175,1)',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
  },
  text: {
    textAlign: 'center',
    fontFamily: 'roboto-700',
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
  },
});

export default ButtonStyle;
