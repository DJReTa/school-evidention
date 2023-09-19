import { Card, Form, Grid } from "semantic-ui-react";
import SendButton from "@/components/SendButton";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/validations";
import type { RegisterFormData } from "@/types";

export default function Register() {
  const { control, handleSubmit } = useForm({
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

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
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
            <Form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Form.Field>
                <FormInput name="name" labelName="Name" control={control} />
              </Form.Field>
              <Form.Field>
                <FormInput
                  name="surname"
                  labelName="Surname"
                  control={control}
                />
              </Form.Field>
              <Form.Field>
                <FormInput
                  name="username"
                  labelName="Username"
                  control={control}
                />
              </Form.Field>
              <Form.Field>
                <FormInput name="email" labelName="E-mail" control={control} />
              </Form.Field>
              <Form.Field>
                <FormInput
                  name="password"
                  labelName="Password"
                  type="password"
                  control={control}
                />
              </Form.Field>
              <Form.Field>
                <FormInput
                  name="confirmationPassword"
                  labelName="Confirmation password"
                  type="password"
                  control={control}
                />
              </Form.Field>
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
