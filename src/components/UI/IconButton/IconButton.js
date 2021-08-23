import React from 'react';
import PropTypes from 'prop-types';
import { Container, Icon } from './styles';
import { TouchableOpacity } from 'react-native';

const IconButton = ({ icon, callback }) => {
  const icons = {
    logout: require('../../../assets/icons/logout.png'),
  };

  return (
    <Container>
      <TouchableOpacity onPress={() => callback()}>
        <Icon resizeMode="contain" source={icons[icon]} />
      </TouchableOpacity>
    </Container>
  );
};

IconButton.propTypes = {
  icon: PropTypes.oneOf(['logout']).isRequired,
  callback: PropTypes.func,
};

IconButton.defaultProps = {
  icon: 'logout',
  callback: () => {},
};

export default IconButton;
