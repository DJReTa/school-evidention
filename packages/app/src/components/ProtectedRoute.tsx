import { fetcherWithoutAuthToken } from "@/api";
import { useUserProfileContext } from "@/context/UserProfileContext";
import type { ChildrenProps } from "@/types";
import cookies from "@/utils/cookieUtils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const ProtectedRoute = ({ children }: ChildrenProps) => {
  const router = useRouter();
  const { userProfile, setAuthorizedUser, emptyUserProfile } =
    useUserProfileContext();

  const isAllowAllRoute = ["/login", "/register"].includes(router.asPath);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const { data } = await fetcherWithoutAuthToken.get("/users/authorize", {
          headers: {
            Authorization: `JWT ${cookies.get("token")}`,
          },
        });
        setAuthorizedUser(data);
      } catch (error) {
        emptyUserProfile();
        cookies.remove("token");
        router.push("/login");
      }
    };

    if (!isAllowAllRoute) authenticate();
  }, [router]);

  if (userProfile?.isAuthenticated || isAllowAllRoute) return <>{children}</>;

  return (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
};

export default ProtectedRoute;
