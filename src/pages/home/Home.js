import React, { useState, useCallback, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { instance } from '../../services/api';

const Home = () => {
  const navigation = useNavigation();
  const [params, setParams] = useState({
    week: '0',
  });
  const [email, setEmail] = useState('');

  const data = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 37],
      },
    ],
  };

  const selectOptions = [
    { value: '1', label: 'Atual' },
    { value: '2', label: 'Semana anterior' },
    { value: '3', label: '2 semanas atrás' },
    { value: '4', label: '3 semanas atrás' },
  ];

  const selectTypeOptions = [
    { value: '1', label: 'Spam' },
    { value: '2', label: 'Outros' },
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

  const onLogout = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.setItem('@token', '');
      instance.defaults.headers.Authorization = null;
      navigate('Login');
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  const setUsername = useCallback(async () => {
    let user = await AsyncStorage.getItem('@user');
    if (user) {
      user = JSON.parse(user);
      setEmail(user.email);
    }
  }, []);

  const getEmailsData = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem('@user');
      const { email } = JSON.parse(user);
      const config = {
        params: {
          email,
        },
      };
      const { data } = await instance.get('/gmail_analytics', config);
      console.log('emails data ', data);
    } catch (error) {
      console.error('error emails ', JSON.stringify(error));
    }
  }, []);

  useEffect(() => {
    setUsername();
  }, [setUsername]);

  useEffect(() => {
    getEmailsData();
  }, [getEmailsData]);

  return (
    <Screen>
      <StatusBar barStyle="dark-content" />
      <TitleView>
        <TextTitle>{email}</TextTitle>
        <IconButton callback={() => onLogout()} />
      </TitleView>
      <Wrapper>
        <SelectWrapper>
          <Select
            options={selectOptions}
            label="Semana"
            onSelectionChange={(newValue) => onSelectionChange(newValue)}
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            options={selectTypeOptions}
            label="Tipo"
            onSelectionChange={(newValue) => onSelectionChange(newValue)}
          />
        </SelectWrapper>
      </Wrapper>
      <View>
        <BarChart data={data} />
      </View>
    </Screen>
  );
};

export default Home;
