import ContextProps from "@/types/ContextProps";
import { Provider as MessageProvider } from "./MessageContext";

const Provider = ({ children }: ContextProps) => {
  return <MessageProvider>{children}</MessageProvider>;
};

export default Provider;
