export type RegisterVars = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export type RegisterData = {
  data: {
    statusCode: number;
    message: string;
  };
};

export type LoginVars = {
  email: string;
  password: string;
};

export type LoginData = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type RefreshTokenVars = {
  refreshToken: string;
};
