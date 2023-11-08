import {
  REACT_APP_BASE_URL,
  REACT_APP_ACCESS_TOKEN,
  REACT_APP_REFRESH_TOKEN,
  REACT_APP_TOKEN_EXPIRATION,
  REACT_APP_GOOGLE_WEB_CLIENT_ID,
} from '@env';

export const HEADER_DEFAULT = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const HEADER_DATA_FORM_FILE = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};

export const BASE_URL = REACT_APP_BASE_URL;
export const ACCESS_TOKEN = REACT_APP_ACCESS_TOKEN;
export const REFRESH_TOKEN = REACT_APP_REFRESH_TOKEN;
export const TOKEN_EXPIRATION = REACT_APP_TOKEN_EXPIRATION;
export const USER_ID = 'userId';
export const TIMEOUT = 50000;

export const GOOGLE = {
  WEB_CLIENT_ID: REACT_APP_GOOGLE_WEB_CLIENT_ID,
};
