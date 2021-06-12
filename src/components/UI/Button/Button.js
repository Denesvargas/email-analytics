import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {StyledButton} from './styles';

const Button = ({title, onPress, disabled}) => {
  return (
    <StyledButton
      onPress={() => {
        onPress('veio do componente');
      }}
      disabled={disabled}>
      <Text textAlign="center">{title}</Text>
    </StyledButton>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onPress: () => {},
  disabled: false,
};

export default Button;
