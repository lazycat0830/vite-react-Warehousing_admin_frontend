import React, { useState,useRef } from 'react';
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, Text, Group, Grid, Stack, Drawer } from "@mantine/core";
import "./Login.scss";
import LoginForm from '../../components/Form/Login';
import RegisterForm from '../../components/Form/Register';

const Login = (props) => {
  const [openedRegister, setOpenedRegister] = useState(false);
  const { POST_Register } = props;
  const navigate = useNavigate();

  const LoginFn = async (values) => {
    const body = { account: values.account, password: values.password };
    const callback = (error) => {
      if (error) {
        put({
          type: "SAVE_Message",
          payload: {
            color: "red",
            title: "錯誤！",
            message: error ? error : "發生未知錯誤，請稍後再試！",
          },
        });
      } else {
        navigate("/backdesk/Dashboard")
      }
    };
    await props.POST_Login(body, callback);
  };

  const preSearchRef = useRef(null);
  const RegisterFn = async (values, email) => {
    const { account, password, name, role } = values;
    const body = {
      account: account,
      password: password,
      name: name,
      email: email,
      role: role,
    };
    const callback = (error) => {
      if (error) {
        put({
          type: "SAVE_Message",
          payload: {
            color: "red",
            title: "錯誤！",
            message: error ? error : "發生未知錯誤，請稍後再試！",
          },
        });
      } else {
        navigate("/Login");
      }
    };
    if (!_.isEqual(body, preSearchRef.current)) {
      preSearchRef.current = body;
      // console.log("RegisterFn",body);
      await POST_Register(body, callback);
      setOpenedRegister(false);
    }
  };

  return (
    <div id="login">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Stack align="center" className="loginCard">
          <Text className="text" weight={600}>
            倉儲管理
          </Text>
          <LoginForm onSubmit={LoginFn}/>
          <Text onClick={() => setOpenedRegister(true)}>註冊帳號</Text>
        </Stack>
      </Card>
      <Drawer
        opened={openedRegister}
        onClose={() => setOpenedRegister(false)}
        title="註冊帳號"
        padding="xl"
        size="xl"
      >
        <RegisterForm  onSubmit={RegisterFn} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    POST_Login(payload, callback, loading) {
      dispatch({ type: "POST_Login", payload, callback, loading });
    },
    POST_Register(payload, callback, loading) {
      dispatch({ type: "POST_Register", payload, callback, loading });
    },
    PUSH_GoToRoute(path) {
      dispatch({ type: "PUSH_GoToRoute", path });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);