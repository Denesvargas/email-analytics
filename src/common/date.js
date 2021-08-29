import moment from 'moment';

export const dateToString = (value, format = 'DD/MM/YYYY') => {
  return moment(value).format(format);
};

export const momentToDate = (value) => {
  return moment(value).toDate();
};

export const formatDateTo = (value, formatFrom, toFormat = 'HH[h]mm') => {
  return moment(value, formatFrom).format(toFormat);
};

export const dateToHours = (value, format = 'HH[h]mm') => {
  return moment(value, 'DD/MM/YYYY HH:mm:ss').format(format);
};

export const toDatabaseFormat = (value, format = 'DD/MM/YYYY') => {
  return moment(value, format).format('YYYY-MM-DD');
};

export const yearsBetween = (startDate, endDate) => {
  return moment.duration(endDate - startDate).years();
};

export const daysBetween = (startDate, endDate) => {
  return moment.duration(endDate - startDate).days();
};

// formato da string - DD/MM/YYYY
export const stringToDate = (value) => {
  return new Date(
    value.substring(6, 10),
    parseInt(value.substring(3, 5), 10) - 1,
    value.substring(0, 2),
  );
};

export const checkExpirationIsValid = (value, format = 'MM/YYYY') => {
  if (!value) {
    return false;
  }
  const formattedExpiration = moment(value, format).format();
  if (!formattedExpiration) {
    return false;
  }
  return moment().isSameOrBefore(formattedExpiration, 'month');
};
