import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text, TextCount } from './styles';

const IconButton = ({ email, count, even }) => {
  return (
    <Container even={even}>
      <Text>{email.length > 28 ? `${email.substring(0, 28)}...` : email}</Text>
      <TextCount>{count}</TextCount>
    </Container>
  );
};

IconButton.propTypes = {
  email: PropTypes.string,
  count: PropTypes.number,
  even: PropTypes.bool,
};

IconButton.defaultProps = {
  email: 'teste@teste.com.br',
  count: 1,
  even: true,
};

export default IconButton;
