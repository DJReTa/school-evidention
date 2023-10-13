import fetcher from "..";

const profilePicture = async () => {
  const { data } = await fetcher.get("/users/image", {
    responseType: "arraybuffer",
  });
  const imageBlob = new Blob([data]);
  const imageUrl = URL.createObjectURL(imageBlob);
  return imageUrl;
};

export default profilePicture;
