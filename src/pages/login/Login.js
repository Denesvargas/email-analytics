import React, { useCallback, useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { Screen, Logo, HeaderWrapper, Title } from './styles';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const configureGoogleSignIn = useCallback(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '301692265080-hcqo4kmc095moe5b3hcoh5pr3333f1rl.apps.googleusercontent.com',
      androidClientId:
        '301692265080-fm2b3sjikodchpng0tf8otplkctnu8g2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await AsyncStorage.setItem('@token', userInfo.idToken);
      await AsyncStorage.setItem('@user', JSON.stringify(userInfo.user));
      navigate('Logged');
    } catch (error) {
      console.log('error ', JSON.stringify(error));
    }
  };

  const navigate = useCallback(
    async (router, params = {}) => {
      navigation.navigate(router, params);
    },
    [navigation],
  );

  const handleNavigate = useCallback(
    async (router, params = {}) => {
      const isLogged = await hasToken;
      if (isLogged) {
        navigate('Logged');
      }
    },
    [navigate, hasToken],
  );

  const hasToken = useMemo(async () => {
    const token = await AsyncStorage.getItem('@token');
    return token !== null;
  }, []);

  useEffect(() => {
    configureGoogleSignIn();
  }, [configureGoogleSignIn]);

  useEffect(() => {
    handleNavigate();
  }, [handleNavigate]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Screen>
        <HeaderWrapper>
          <Logo />
          <Title>Email Analytics</Title>
        </HeaderWrapper>
        <GoogleSigninButton onPress={() => signIn()} />
      </Screen>
    </>
  );
};

export default Login;
