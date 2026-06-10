import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import withAuth from "../api/withAuth";

type ProtectRoutesProps = {
  children: ReactNode;
  requiredRole?: string[];
};

type AuthResult = {
  isAuthenticated: boolean;
  userRole: string | null;
};

function ProtectRoutes({ children, requiredRole }: ProtectRoutesProps) {
  const navigate = useNavigate();

  const { isAuthenticated, userRole }: AuthResult = withAuth();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin", { replace: true });
      return;
    } else if (
      requiredRole &&
      (!userRole || !requiredRole.includes(userRole))
    ) {
      navigate("/admin", { replace: true });
    }

    // if (requiredRole && requiredRole !== userRole) {
    //   navigate("/", { replace: true });
    //   return;
    // }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [isAuthenticated, requiredRole, userRole, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center mx-auto min-h-screen w-full items-center">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectRoutes;
