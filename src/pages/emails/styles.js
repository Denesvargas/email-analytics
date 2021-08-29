import styled from 'styled-components';
import { colors } from '../../common/defaults';
import {
  IconButton as IconButtonTemplate,
  Select as SelectTemplate,
  EmailCount as EmailCountTemplate,
} from '../../components';

export const Screen = styled.ScrollView`
  height: 100%;
  background-color: ${colors.primary};
`;

export const Container = styled.View`
  padding-bottom: 35px;
`;

export const IconButton = styled(IconButtonTemplate)``;

export const TitleView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 16px 18px 12px 24px;
  align-items: center;
`;

export const TextTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Select = styled(SelectTemplate)``;

export const Wrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 12px 20px;
`;

export const SelectWrapper = styled.View`
  width: 60%;
`;

export const EmailCount = styled(EmailCountTemplate)``;
