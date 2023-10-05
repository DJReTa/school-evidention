import type { Dispatch, SetStateAction } from "react";
import type { UserProfileData } from ".";

interface UserProfileContextData {
  userProfile: UserProfileData | null;
  setUserProfile: Dispatch<SetStateAction<UserProfileData | null>>;
  changeKeyValue: (key: string, value: string) => void;
  setAuthorizedUser: (user: UserProfileData) => void;
  emptyUserProfile: () => void;
}

export default UserProfileContextData;
