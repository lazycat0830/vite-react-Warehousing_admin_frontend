import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Text,
  Stack
 } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";


const LoginForm = ({onSubmit}) => {

  const Form = useForm({
    initialValues: {
      account: "",
      password: ""
    },
    validationRules: {
      account: (value) => value.trim().length > 0,
      password: (value) => value.trim().length > 0,
    },
  });

  const SubmitForm = Form.onSubmit((values) =>{
    onSubmit(values);
  });

  return (
    <form onSubmit={SubmitForm}>
      <Stack>
        <TextInput
          required
          icon={<Icon icon={faUser} />}
          placeholder="輸入帳號"
          {...Form.getInputProps("account")}
        />

        <PasswordInput
          required
          icon={<Icon icon={faLock} />}
          placeholder="輸入密碼"
          {...Form.getInputProps("password")}
        />

        <Button
          type="submit"
          onClick={()=>onSubmit}
        >
          登入
        </Button>
      </Stack>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    PUSH_GoToRoute(path) {
      dispatch({ type: "PUSH_GoToRoute", path });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
