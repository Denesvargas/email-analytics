/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';
import { Label } from './styles';
// import { Label } from '../Label';

const Select = ({
  label,
  options,
  disabled,
  onSelectionChange,
  icon,
  mode,
  requiredError,
}) => {
  const [value, setValue] = useState('0');
  const [optionsState, setOptionsState] = useState([]);

  const onValueChange = (newValue) => {
    setValue(newValue);
    onSelectionChange(newValue);
  };

  const updateOptions = () => {
    let opt = [];
    opt = opt.concat(options);
    opt.unshift({
      value: '0',
      label: 'Selecione',
    });
    setOptionsState(opt);
  };

  useEffect(() => {
    updateOptions();
  }, []);

  useEffect(() => {
    updateOptions();
  }, [options]);

  return (
    <View style={styles.wrapper}>
      <Label text={label} />
      <Picker
        selectedValue={value}
        style={styles.select}
        enabled={!disabled}
        onValueChange={(newValue) => onValueChange(newValue)}
        mode={mode}>
        {optionsState.map((item) => {
          return (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={item.value}
            />
          );
        })}
      </Picker>
    </View>
  );
};

Select.propTypes = {
  onSelectionChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  options: PropTypes.array,
  icon: PropTypes.string,
  mode: PropTypes.oneOf(['dialog', 'dropdown']),
  label: PropTypes.string,
  requiredError: PropTypes.bool,
};

Select.defaultProps = {
  onSelectionChange: () => {},
  disabled: false,
  size: '100%',
  options: [],
  icon: 'arrow',
  mode: 'dropdown',
  label: 'Teste',
  requiredError: false,
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
  },

  containerWithError: {
    borderColor: '#f00',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
  },

  wrapper: {
    paddingTop: 7,
    paddingBottom: 7,
  },

  select: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 42,
  },

  pickerIcon: {
    position: 'absolute',
    right: 18,
    top: 20,
  },
});

export default Select;
