import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, Grid } from "semantic-ui-react";
import SendButton from "../components/SendButton";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validations";
import type { LoginFormData } from "@/types";

export default function Login() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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
                <SendButton>Send</SendButton>
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}
