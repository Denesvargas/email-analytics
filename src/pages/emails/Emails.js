import React, { useState, useCallback } from 'react';
import { StatusBar, View } from 'react-native';
import {
  Screen,
  BarChart,
  IconButton,
  TitleView,
  TextTitle,
  Select,
  Wrapper,
  SelectWrapper,
} from './styles';
import { useNavigation } from '@react-navigation/native';

const Emails = () => {
  const navigation = useNavigation();
  const [params, setParams] = useState({
    week: '0',
  });

  const selectOptions = [
    { value: '1', label: 'Enviados' },
    { value: '2', label: 'Recebidos' },
  ];

  const onSelectionChange = (newValue) => {
    setParams((prevForm) => ({
      ...prevForm,
      week: newValue,
    }));
  };

  const navigate = useCallback(
    async (router, params = {}) => {
      navigation.navigate(router, params);
    },
    [navigation],
  );

  const onLogout = useCallback(() => {
    navigate('Login');
  }, [navigate]);

  return (
    <Screen>
      <StatusBar barStyle="dark-content" />
      <TitleView>
        <TextTitle>Enviados/Recebidos</TextTitle>
        <IconButton callback={() => onLogout()} />
      </TitleView>
      <Wrapper>
        <SelectWrapper>
          <Select
            options={selectOptions}
            label="Pasta"
            onSelectionChange={(newValue) => onSelectionChange(newValue)}
          />
        </SelectWrapper>
      </Wrapper>
      <View></View>
    </Screen>
  );
};

export default Emails;
