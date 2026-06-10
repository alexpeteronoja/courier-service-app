// Deactivate User

export type deactivateUserPayload = {
  userId?: string;
  data: {
    isActive: boolean;
  };
};

// Update Me

export type updateMePayload = {
  name?: string;
  phoneNumber?: string;
};
