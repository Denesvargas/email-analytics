import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  Screen,
  Container,
  EmailCount,
  IconButton,
  TitleView,
  TextTitle,
  Select,
  Wrapper,
  SelectWrapper,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Emails = () => {
  const navigation = useNavigation();
  const [params, setParams] = useState({
    folder: 1,
  });
  const [senders, setSenders] = useState([[], []]);
  const selectOptions = [
    { value: 0, label: 'Enviados' },
    { value: 1, label: 'Recebidos' },
  ];

  const onSelectionChange = (newValue) => {
    setParams((prevForm) => ({
      ...prevForm,
      folder: newValue,
    }));
  };

  const navigate = useCallback(
    async (router) => {
      navigation.navigate(router, {});
    },
    [navigation],
  );

  const onLogout = useCallback(() => {
    navigate('Login');
  }, [navigate]);

  const getEmailsData = useCallback(async () => {
    loadSavedData();
  }, [loadSavedData]);

  const loadSavedData = useCallback(async () => {
    const mapSendersMonthObject = JSON.parse(
      await AsyncStorage.getItem('@mapSendersMonthObject'),
    );
    const mapSendersSentObject = JSON.parse(
      await AsyncStorage.getItem('@mapSendersSentObject'),
    );
    if (
      !!mapSendersMonthObject &&
      mapSendersMonthObject.length > 0 &&
      !!mapSendersSentObject &&
      mapSendersSentObject.length > 0
    ) {
      setSenders([mapSendersSentObject, mapSendersMonthObject]);
      console.log('enviados ', mapSendersSentObject);
    }
  }, []);

  useEffect(() => {
    getEmailsData();
  }, [getEmailsData]);

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
      <Container>
        {senders[params.folder].map((item, key) => {
          return (
            <EmailCount
              key={key}
              email={item.email}
              count={item.count}
              even={key % 2 === 0}
            />
          );
        })}
      </Container>
    </Screen>
  );
};

export default Emails;
