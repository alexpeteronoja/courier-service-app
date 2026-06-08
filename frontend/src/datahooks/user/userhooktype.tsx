// Deactivate User

export type deactivateUserPayload = {
  userId?: string;
  data: {
    isActive: boolean;
  };
};
