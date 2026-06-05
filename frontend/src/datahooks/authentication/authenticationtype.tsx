export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    data: {
      accessToken: string;
      user: {
        role: string;
        _id: string;
        email: string;
      };
    };
  };
};
