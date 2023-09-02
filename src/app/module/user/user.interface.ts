export type ILoginUserType = {
    email: string;
    password: string;
  };
  export type ILoginUserResponseType = {
    accessToken: string;
    refreshToken?: string;
  };
