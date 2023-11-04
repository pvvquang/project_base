import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface IAuthState {}

const initialState: IAuthState = {
  token: null,
  refresh_token: null,
  expires_in: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: any, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setToken} = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
