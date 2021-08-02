import styled from 'styled-components';
import { Logo as LogoTemplate } from '../../components';
import { colors } from '../../common/defaults';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

export const Logo = styled(LogoTemplate)``;

export const Screen = styled.View`
  height: 100%;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;

export const HeaderWrapper = styled.View`
  height: ${height * 0.35}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.white};
`;
