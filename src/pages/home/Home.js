import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  Screen,
  BarChart,
  IconButton,
  TitleView,
  TextTitle,
  Select,
  Wrapper,
  SelectWrapper,
  EmailCount,
  Container,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { instance } from '../../services/api';
import { daysBetween, momentToDate, dayOfWeek } from '../../common/date';

const Home = () => {
  const navigation = useNavigation();
  const [params, setParams] = useState({
    week: 1,
    type: 1,
  });
  const [emailName, setEmailName] = useState('');
  const [activeArray, setActiveArray] = useState(0);
  const [parsedData, setParsedData] = useState([
    [1, 2, 3, 4, 5, 6, 7], // [hoje, ontem, ...]
    [2, 4, 6, 8, 10, 12, 14], // semana passada [hoje, ontem, ...]
    [3, 6, 9, 12, 15, 18, 21],
    [4, 8, 12, 16, 20, 24, 28],
    [5, 10, 15, 20, 25, 30, 35], // SPAM - [hoje, ontem, ...]
    [6, 12, 18, 24, 30, 36, 42], // SPAM - semana passada [hoje, ontem, ...]
    [7, 14, 21, 28, 35, 42, 49],
    [8, 16, 24, 32, 40, 48, 56],
  ]); // 4 semanas de outros e 4 semanas de spam);
  const [senders, setSenders] = useState([[], [], [], [], [], [], [], []]);
  const [data, setData] = useState({
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 37],
      },
    ],
  });

  const selectOptions = [
    { value: 1, label: 'Atual' },
    { value: 2, label: 'Semana anterior' },
    { value: 3, label: '2 semanas atrás' },
    { value: 4, label: '3 semanas atrás' },
  ];

  const selectTypeOptions = [
    { value: 1, label: 'Outros' },
    { value: 2, label: 'Spam' },
  ];

  const onSelectionChange = (newValue) => {
    setParams((prevForm) => ({
      ...prevForm,
      week: newValue,
    }));
  };
  const onSelectionTypeChange = (newValue) => {
    setParams((prevForm) => ({
      ...prevForm,
      type: newValue,
    }));
  };

  const onDataChange = (values) => {
    setData((prevValues) => ({
      ...prevValues,
      datasets: [
        {
          data: values,
        },
      ],
    }));
  };

  const onLabelsChange = (values) => {
    setData((prevValues) => ({
      ...prevValues,
      labels: values,
    }));
  };

  const navigate = useCallback(
    async (router) => {
      navigation.navigate(router, {});
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
      setEmailName(user.email);
    }
  }, []);

  const parseDataEmails = useCallback(async (values) => {
    const countEmails = [
      [0, 0, 0, 0, 0, 0, 0], // [hoje, ontem, ...]
      [0, 0, 0, 0, 0, 0, 0], // semana passada [hoje, ontem, ...]
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0], // SPAM - [hoje, ontem, ...]
      [0, 0, 0, 0, 0, 0, 0], // SPAM - semana passada [hoje, ontem, ...]
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    const mapSenders = [
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      new Map(),
      new Map(),
    ];
    const mapSendersMonth = new Map();
    const mapSendersObject = [[], [], [], [], [], [], [], []];
    const mapSendersMonthObject = [];
    const mapSendersSent = new Map();
    const mapSendersSentObject = [];
    values.forEach((item, index) => {
      const daysEmail = daysBetween(momentToDate(item[0]), new Date());
      if (daysEmail < 28) {
        const arrayBasedDays = Math.floor(daysEmail / 7);
        const isSpam = item[3].indexOf('SPAM') > -1;
        const arrayDataEmail = isSpam ? 4 + arrayBasedDays : arrayBasedDays;
        if (item[3].indexOf('SENT') < 0) {
          countEmails[arrayDataEmail][daysEmail % 7] =
            countEmails[arrayDataEmail][daysEmail % 7] + 1;
          let nameSender = item[2].split('<')[1];
          if (!nameSender) {
            nameSender = item[2];
          }
          nameSender = nameSender.substring(0, nameSender.length - 1);
          if (mapSenders[arrayDataEmail].has(nameSender)) {
            const countSend = mapSenders[arrayDataEmail].get(nameSender);
            mapSenders[arrayDataEmail].set(nameSender, countSend + 1);
          } else {
            mapSenders[arrayDataEmail].set(nameSender, 1);
          }
          if (mapSendersMonth.has(nameSender)) {
            const countSend = mapSendersMonth.get(nameSender);
            mapSendersMonth.set(nameSender, countSend + 1);
          } else {
            mapSendersMonth.set(nameSender, 1);
          }
        } else {
          let nameSender = item[1].split('<')[1];
          if (!nameSender) {
            nameSender = item[1];
          }
          nameSender = nameSender.substring(0, nameSender.length - 1);
          if (mapSendersSent.has(nameSender)) {
            const countSend = mapSendersSent.get(nameSender);
            mapSendersSent.set(nameSender, countSend + 1);
          } else {
            mapSendersSent.set(nameSender, 1);
          }
        }
      }
    });
    mapSenders.forEach((map, indexMap) => {
      for (let key of map.keys()) {
        mapSendersObject[indexMap].push({ email: key, count: map.get(key) });
      }
    });
    mapSendersObject.forEach((senderArray) => {
      senderArray.sort((a, b) => {
        return a.count < b.count;
      });
    });
    for (let key of mapSendersMonth.keys()) {
      mapSendersMonthObject.push({
        email: key,
        count: mapSendersMonth.get(key),
      });
    }
    mapSendersMonthObject.sort((a, b) => {
      return a.count < b.count;
    });
    for (let key of mapSendersSent.keys()) {
      mapSendersSentObject.push({
        email: key,
        count: mapSendersSent.get(key),
      });
    }
    mapSendersSentObject.sort((a, b) => {
      return a.count < b.count;
    });
    countEmails.forEach((item) => {
      item.reverse();
    });
    // console.log('count Emails ', mapSendersSentObject);
    setParsedData(countEmails);
    setSenders(mapSendersObject);
    await AsyncStorage.setItem('@countEmails', JSON.stringify(countEmails));
    await AsyncStorage.setItem(
      '@mapSendersObject',
      JSON.stringify(mapSendersObject),
    );
    await AsyncStorage.setItem(
      '@mapSendersMonthObject',
      JSON.stringify(mapSendersMonthObject),
    );
    await AsyncStorage.setItem(
      '@mapSendersSentObject',
      JSON.stringify(mapSendersSentObject),
    );
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
      const { data: response } = await instance.get('/gmail_analytics', config);
      // console.log('emails data ', response);
      if (response && response.length > 0) {
        parseDataEmails(response);
      } else {
        loadSavedData();
      }
    } catch (error) {
      console.error('error request ', JSON.stringify(error));
      loadSavedData();
    }
  }, [parseDataEmails, loadSavedData]);

  const loadSavedData = useCallback(async () => {
    const emailsCount = JSON.parse(await AsyncStorage.getItem('@countEmails'));
    if (!!emailsCount && emailsCount.length > 0) {
      setParsedData(emailsCount);
    }
    const mapSenders = JSON.parse(
      await AsyncStorage.getItem('@mapSendersObject'),
    );
    if (!!mapSenders && mapSenders.length > 0) {
      setSenders(mapSenders);
    }
  }, []);

  const loadWeek = useCallback(async () => {
    const number = dayOfWeek(new Date());
    const arrayDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    let daysLabels = [];
    for (let i = 0; i < 7; i++) {
      daysLabels.push(arrayDays[(number + i + 1) % 7]);
    }
    onLabelsChange(daysLabels);
  }, []);

  useEffect(() => {
    onDataChange(parsedData[params.week + 4 * (params.type - 1) - 1]);
    setActiveArray(params.week + 4 * (params.type - 1) - 1);
  }, [params, parsedData]);

  useEffect(() => {
    setUsername();
  }, [setUsername]);

  useEffect(() => {
    loadWeek();
  }, [loadWeek]);

  useEffect(() => {
    getEmailsData();
  }, [getEmailsData]);

  return (
    <Screen>
      <StatusBar barStyle="dark-content" />
      <TitleView>
        <TextTitle>{emailName}</TextTitle>
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
            onSelectionChange={(newValue) => onSelectionTypeChange(newValue)}
          />
        </SelectWrapper>
      </Wrapper>
      <Container>
        <BarChart data={data} />
        {senders[activeArray].map((item, key) => {
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

export default Home;
