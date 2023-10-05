interface UserProfileData {
  fullName: string;
  status: string;
  username: string;
  [key: string]: any;
  isAuthenticated: boolean | undefined;
}

export default UserProfileData;
