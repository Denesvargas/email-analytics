import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
  border-radius: 25px;
  width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.disabled ? 'gray' : 'green')};
  border: 1px solid ${(props) => (props.disabled ? 'gray' : 'green')};
`;
