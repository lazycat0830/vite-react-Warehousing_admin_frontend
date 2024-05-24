import React, { useEffect, useState } from "react";
import { TextInput, PasswordInput, Button ,Checkbox ,Autocomplete,Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  faUser,
  faLock,
  faSignature,
  faAt
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

const RegisterForm = (props) => {
  const [Emailvalue, setEmailValue] = useState('');

  const Emaildata =
  Emailvalue.trim().length > 0 && !Emailvalue.includes('@')
    ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${Emailvalue}@${provider}`)
    : [];

  const Form = useForm({
    initialValues:{
      account:"",
      password:"",
      name:"",
      email:"",
      role:"user"
    },
    validationRules: {
      account: (value) => value.trim().length > 0,
      password: (value) => value.trim().length > 0,
      name: (value) => value.trim().length > 0,
    },
  });


  const onSubmit = Form.onSubmit((values) =>{
    props.onSubmit(values,Emailvalue);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          required
          icon={<Icon icon={faUser} />}
          placeholder="輸入帳號"
          {...Form.getInputProps("account")}
        />
        <TextInput
          required
          icon={<Icon icon={faLock} />}
          placeholder="輸入密碼"
          {...Form.getInputProps("password")}
        />
        <TextInput
          required
          icon={<Icon icon={faSignature} />}
          placeholder="輸入名字"
          {...Form.getInputProps("name")}
        />
        <Autocomplete
          required
          value={Emailvalue}
          onChange={setEmailValue}
          placeholder="輸入email"
          icon={<Icon icon={faAt} />}
          data={Emaildata}
        />
        <Button type="submit"  onClick={()=>onSubmit} variant="gradient" gradient={{ from: 'orange', to: 'red' }} >註冊</Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
