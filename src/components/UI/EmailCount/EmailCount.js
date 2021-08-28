import React from 'react';
import PropTypes from 'prop-types';
import { Container, Icon } from './styles';

const IconButton = ({ icon, callback }) => {
  const icons = {
    logout: require('../../../assets/icons/logout.png'),
  };

  return <Container></Container>;
};

IconButton.propTypes = {
  email: PropTypes.string,
  count: PropTypes.number,
};

IconButton.defaultProps = {
  email: 'teste@teste.com.br',
  count: 1,
};

export default IconButton;
