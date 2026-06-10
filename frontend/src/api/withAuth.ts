import Cookies from "js-cookie";

type AuthResultType = {
  isAuthenticated: boolean;
  userRole: string | null;
  accessToken: string | null;
};

function withAuth(): AuthResultType {
  const userRole = Cookies.get("userRole") ?? null;

  // Get Token

  const accessToken = userRole
    ? (Cookies.get("userAccessToken") ?? null)
    : null;

  const isAuthenticated = !!accessToken;

  return {
    isAuthenticated,
    userRole,
    accessToken,
  };
}

export default withAuth;
