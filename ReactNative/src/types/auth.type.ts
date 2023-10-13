export interface ILoginDataResponse {
  tokens: {
    access: {
      token: string;
      expires: Date;
    };
    refresh: {
      token: string;
      expires: Date;
    };
  };
  user: {
    _id: string;
  };
}
