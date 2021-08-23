import styled from 'styled-components/native';
import { colors } from '../../../common/defaults';

export const Container = styled.View`
  background-color: ${colors.secondary};
  padding: 9px;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;
