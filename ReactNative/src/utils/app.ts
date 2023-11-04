import {Dimensions} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const getParamsHelp = (params: Record<string, any>) => {
  const urlParams = [];
  for (const keys of Object.keys(params)) {
    if (params[keys]) {
      urlParams.push(`${keys}=${encodeURIComponent(params[keys])}`);
    }
  }
  return urlParams.join('&');
};

export const formatToCurrency = (price: number) => {
  if (typeof price !== 'number') return price;
  return new Intl.NumberFormat().format(price);
};

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 || 0,
      v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
}
