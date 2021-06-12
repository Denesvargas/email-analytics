import axios from 'axios';
import Config from 'react-native-config';
const instance = axios.create({
  baseURL: Config.API_HOST,
});

export default instance;
