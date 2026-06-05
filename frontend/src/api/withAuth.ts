import Cookies from "js-cookie";

function withAuth() {
  const userRole = "independent_artist"; // Cookies.get("userRole");

  // Get Token

  const accessToken = userRole ? Cookies.get("userAccessToken") : null;

  const isAuthenticated = !!accessToken;

  return {
    isAuthenticated,
    userRole,
    accessToken,
  };
}

export default withAuth;
