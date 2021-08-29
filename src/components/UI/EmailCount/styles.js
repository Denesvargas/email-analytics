import styled from 'styled-components';
import { colors } from '../../../common/defaults';

export const Container = styled.View`
  width: 90%;
  background-color: ${({ even }) =>
    even ? colors.secondary : colors.darkLight};
  justify-content: space-between;
  flex-direction: row;
  align-self: center;
  border-radius: 12px;
  margin-top: 12px;
`;

export const Text = styled.Text`
  font-size: 16px;
  padding: 12px 10px;
`;

export const TextCount = styled(Text)``;
