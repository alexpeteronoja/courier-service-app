export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    data: {
      access_token: string;
      refresh_access_token: string;
      user_type: "record_label" | "independent_artist";
      id: string;
      email: string;
    };
  };
};
