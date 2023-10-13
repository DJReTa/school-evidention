import { registerUser } from "@/api";
import FormInput from "@/components/FormInput";
import SendButton from "@/components/SendButton";
import { useMessageContext } from "@/context/MessageContext";
import type { RegisterFormData } from "@/types";
import { registerSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Card, Divider, Form, Grid, Message } from "semantic-ui-react";

export default function Register() {
  const router = useRouter();
  const { setSuccessMessage } = useMessageContext();
  const { mutateAsync: register, isLoading, error } = useMutation(registerUser);
  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmationPassword: "",
    },
  });

  const onSubmit = async ({
    confirmationPassword,
    ...data
  }: RegisterFormData) => {
    try {
      await register(data);
      setSuccessMessage("You have successfully registered. Please login!");
      router.push("/login");
    } catch (error) {}
  };

  return (
    <Grid centered>
      <Grid.Column width={7}>
        <Card fluid style={{ marginTop: "12vh" }}>
          <Card.Content
            header="Register"
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
            <FormProvider {...methods}>
              <Form
                noValidate
                onSubmit={methods.handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <Form.Field>
                  <FormInput name="name" labelName="Name" />
                </Form.Field>
                <Form.Field>
                  <FormInput name="surname" labelName="Surname" />
                </Form.Field>
                <Form.Field>
                  <FormInput name="username" labelName="Username" />
                </Form.Field>
                <Form.Field>
                  <FormInput name="email" labelName="E-mail" />
                </Form.Field>
                <Form.Field>
                  <FormInput
                    name="password"
                    labelName="Password"
                    type="password"
                  />
                </Form.Field>
                <Form.Field>
                  <FormInput
                    name="confirmationPassword"
                    labelName="Confirmation password"
                    type="password"
                  />
                </Form.Field>
                <Form.Field>
                  <SendButton disabled={isLoading}>Send</SendButton>
                </Form.Field>
              </Form>
            </FormProvider>
            <Divider />
            <div style={{ display: "flex", justifyContent: "center" }}>
              Already have an account?{" "}
              <a
                style={{ marginLeft: "0.2em", textDecoration: "underline" }}
                onClick={() => router.push("/login")}
              >
                Log in
              </a>
            </div>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}
