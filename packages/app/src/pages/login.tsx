import { loginUser } from "@/api";
import FormInput from "@/components/FormInput";
import SendButton from "@/components/SendButton";
import { useMessageContext } from "@/context/MessageContext";
import type { LoginFormData } from "@/types";
import { loginSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Card, Form, Grid, Message } from "semantic-ui-react";

export default function Login() {
  const router = useRouter();
  const { successMessage, setSuccessMessage } = useMessageContext();
  const { mutateAsync: login, isLoading, error } = useMutation(loginUser);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      setSuccessMessage(null);
      router.push("/");
    } catch (error) {}
  };

  return (
    <Grid centered>
      <Grid.Column width={7}>
        <Card fluid style={{ marginTop: "12vh" }}>
          <Card.Content
            header="Sign in"
            style={{ textAlign: "center", fontSize: "25px" }}
          />
          <Card.Content>
            <Message
              error
              header={
                (error as AxiosError)?.response?.data ||
                (error as AxiosError)?.message
              }
              hidden={!error}
            />
            <Message success header={successMessage} hidden={!successMessage} />
            <Form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Form.Field>
                <FormInput
                  name="username"
                  labelName="Username"
                  control={control}
                />
              </Form.Field>
              <Form.Field>
                <FormInput
                  name="password"
                  labelName="Password"
                  control={control}
                  type="password"
                />
              </Form.Field>
              <Form.Group style={{ textAlign: "center" }}></Form.Group>
              <Form.Field>
                <SendButton disabled={isLoading}>Send</SendButton>
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}
