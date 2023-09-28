import { Dispatch, SetStateAction } from "react";

interface MessageContextData {
  successMessage: string | null;
  setSuccessMessage: Dispatch<SetStateAction<string | null>>;
}

export default MessageContextData;
