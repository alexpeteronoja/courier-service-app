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

export type AdminStaffSignupPayload = {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
  passwordConfirm: string;
};

// Update Password (self)

export type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
