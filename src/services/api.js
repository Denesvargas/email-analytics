import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://afk67xevcj.execute-api.us-east-1.amazonaws.com',
});

export { instance };
