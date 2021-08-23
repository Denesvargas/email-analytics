import styled from 'styled-components/native';
import { default as LabelTemplate } from '../Label';

export const AltertIcon = styled.Image`
  margin-left: 12px;
`;

export const RequiredField = styled.View`
  align-items: center;
  margin: 5px;
  flex-direction: row;
`;

export const RequiredMessage = styled.Text`
  color: red;
  font-weight: 700;
  font-size: 13px;
  margin: 0 4px;
`;

export const Label = styled(LabelTemplate)``;
