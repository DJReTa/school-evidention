import ContextProps from "@/types/ChildrenProps";
import { Provider as MessageProvider } from "./MessageContext";
import { Provider as UserProfileProvider } from "./UserProfileContext";

const Provider = ({ children }: ContextProps) => {
  return (
    <MessageProvider>
      <UserProfileProvider>{children}</UserProfileProvider>
    </MessageProvider>
  );
};

export default Provider;
