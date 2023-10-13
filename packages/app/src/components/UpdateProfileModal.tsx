import { updateUser } from "@/api";
import { useUserProfileContext } from "@/context/UserProfileContext";
import type {
  UpdateProfileModalProps,
  UpdateUserFormData,
  UserProfileData,
} from "@/types";
import { updateUserSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Form, Message, Modal } from "semantic-ui-react";
import FormImageFileInput from "./FormImageFileInput";
import FormInput from "./FormInput";
import SendButton from "./SendButton";

const UpdateProfileModal = ({
  open,
  setOpen,
  refetchProfileImage,
}: UpdateProfileModalProps) => {
  const { userProfile, changeKeyValue } = useUserProfileContext();
  const [name, surname] = (userProfile?.fullName || "").split(" ");
  const methods = useForm({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      name: name,
      surname: surname,
      oldPassword: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
    mode: "onBlur",
  });
  const {
    mutateAsync: update,
    isLoading,
    error,
    reset,
  } = useMutation(updateUser);

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      await update({
        ...data,
        username: (userProfile as UserProfileData).username,
      });
      refetchProfileImage();
      methods.reset({ name: data.name, surname: data.surname });
      changeKeyValue("fullName", `${data.name} ${data.surname}`);
      toast("You have successfully updated your personal information!", {
        hideProgressBar: true,
        type: "info",
        autoClose: 3000,
      });
      setOpen(false);
    } catch (error) {}
  };

  return (
    <Modal
      closeIcon
      onClose={() => {
        methods.reset();
        reset();
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Update profile</Modal.Header>
      <Modal.Content>
        <Message info>
          <Message.Header>Password change!</Message.Header>
          <p>
            In order to change your existing password, you must first enter your
            old password, followed by your new password, and then confirm it. If
            you don't want to change your password, you can leave the fields
            empty!
          </p>
        </Message>
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
            autoComplete="off"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Form.Field>
              <FormInput name="name" labelName="Name" />
            </Form.Field>
            <Form.Field>
              <FormInput name="surname" labelName="Surname" />
            </Form.Field>
            <Form.Field>
              <FormInput
                name="oldPassword"
                labelName="Old Password"
                type="password"
              />
            </Form.Field>
            <Form.Field>
              <FormInput
                name="password"
                labelName="New Password"
                type="password"
                disabled={!methods.watch("oldPassword")}
              />
            </Form.Field>
            <Form.Field>
              <FormInput
                name="confirmPassword"
                labelName="Confirmation password"
                type="password"
                disabled={!methods.watch("oldPassword")}
              />
            </Form.Field>
            <Form.Field>
              <FormImageFileInput name="image" />
            </Form.Field>
            <Form.Field>
              <SendButton disabled={isLoading}>Send</SendButton>
            </Form.Field>
          </Form>
        </FormProvider>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateProfileModal;
