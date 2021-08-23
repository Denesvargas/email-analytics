import React from 'react';
import PropTypes from 'prop-types';
import { Container, StyledText } from './styles';

const Label = ({ text }) => {
  return (
    <Container>
      <StyledText>{text}</StyledText>
    </Container>
  );
};

Label.propTypes = {
  text: PropTypes.string,
};

export default Label;
