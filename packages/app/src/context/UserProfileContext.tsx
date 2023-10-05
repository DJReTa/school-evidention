import type { ChildrenProps, UserProfileContextData, UserProfileData } from "@/types";
import { createContext, useContext, useState } from "react";

export const Context = createContext<UserProfileContextData | null>(null);

export const Provider = ({ children }: ChildrenProps) => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  const changeKeyValue = (key: string, value: string) => {
    setUserProfile((previousUserProfile): UserProfileData => {
      const newUserProfile = {
        ...(previousUserProfile || {}),
      } as UserProfileData;
      newUserProfile[key] = value;
      return newUserProfile;
    });
  };

  const setAuthorizedUser = (user: UserProfileData) => {
    setUserProfile(() => {
      return { ...user, isAuthenticated: true };
    });
  };

  const emptyUserProfile = () => {
    setUserProfile(null);
  };

  const context = {
    userProfile,
    setUserProfile,
    changeKeyValue,
    setAuthorizedUser,
    emptyUserProfile,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

export const useUserProfileContext = () =>
  useContext(Context) as UserProfileContextData;
