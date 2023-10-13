import { profilePicture } from "@/api";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useProfileImageGetter = (username: string | undefined) => {
  const { data, isLoading, isRefetching, error, refetch } = useQuery(
    ["profilePicture", username],
    profilePicture,
    {
      enabled: !!username,
      refetchOnWindowFocus: false,
    }
  );

  const refetchProfileImage = () => {
    if (data) URL.revokeObjectURL(data);
    refetch();
  };

  useEffect(() => {
    return () => {
      if (data) {
        URL.revokeObjectURL(data);
      }
    };
  }, [data]);

  return {
    image: data,
    loading: isLoading || isRefetching,
    error,
    refetchProfileImage,
  };
};

export default useProfileImageGetter;
