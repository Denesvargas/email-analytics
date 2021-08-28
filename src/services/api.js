import axios from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
  baseURL: 'https://afk67xevcj.execute-api.us-east-1.amazonaws.com',
});

export { instance };
