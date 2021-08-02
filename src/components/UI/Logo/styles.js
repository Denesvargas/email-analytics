import styled from 'styled-components/native';

import email from '../../../assets/logos/logo-email.png';

import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const Container = styled.View`
  width: 100%;
  justify-content: space-around;
  align-self: center;
`;

export const EmailLogo = styled.Image.attrs({
  source: email,
})`
  height: ${width * 0.3}px;
  width: ${width * 0.3}px;
  resize-mode: stretch;
  margin-bottom: 16px;
`;
