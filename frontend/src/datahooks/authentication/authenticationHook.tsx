import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import ApiInstance from "../../api/ApiInstance";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { LoginPayload, LoginResponse } from "./authenticationtype";

// export const useArtistSignup = () => {
//   const { mutate, isPending, isError, isSuccess } = useMutation({
//     mutationFn: (data) => ApiInstance.post("/auth/artist-signup", data),
//     onError: (err) => {
//       console.error("error", err?.response?.data);
//     },
//   });

//   return {
//     signupMutate: mutate,
//     signupPending: isPending,
//     signupError: isError,
//     signupSuccess: isSuccess,
//   };
// };

// Login

export const useUserLogin = () => {
  // const navigate = useNavigate();

  // Function to Fetch Store
  const { mutate, mutateAsync, isPending } = useMutation<
    LoginResponse,
    AxiosError,
    LoginPayload
  >({
    mutationFn: (data) => ApiInstance.post("/auth/login", data),
    onSuccess: async (response) => {
      const userRole = response?.data?.data?.user_type;
      const userId = response?.data?.data?.id;
      const userEmail = response?.data?.data?.email;

      // Clear Previous Access Token and Role to Avoid Conflict\
      Cookies.remove("userAccessToken");

      Cookies.remove("userId");
      Cookies.remove("userEmail");
      Cookies.remove("userRole");

      try {
        if (userRole) {
          Cookies.set("userAccessToken", response?.data?.data?.access_token, {
            secure: true,
            sameSite: "None",
          });

          Cookies.set("userId", userId, {
            secure: true,
            sameSite: "None",
          });

          Cookies.set("userEmail", userEmail, {
            secure: true,
            sameSite: "None",
          });

          Cookies.set("userRole", userRole, {
            secure: true,
            sameSite: "None",
          });

          // if (userRole === "record_label") {
          //   navigate("/label/dashboard");
          // } else if (userRole === "independent_artist") {
          //   navigate("/dashboard", { replace: true });
          // }
        }

        // if (userRole === 'independent_artist') {
        //   localStorage.setItem('artistRole', userRole);
        //   Cookies.set('artistAccessToken', response?.data?.data?.access_token, {
        //     secure: true,
        //     sameSite: 'None',
        //   });
        //   Cookies.set(
        //     'artistRefreshToken',
        //     response?.data?.data?.refresh_access_token,
        //     { secure: true, sameSite: 'None' }
        //   );
        //   localStorage.setItem('artistId', userId);
        //   localStorage.setItem('userEmail', userEmail);

        //   navigate('/dashboard');
        // }
      } catch (err) {
        console.error(err);
      }
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    signinMutate: mutate,
    signinMutateAsync: mutateAsync,
    signinPending: isPending,
  };
};
