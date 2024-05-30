import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import {
  Text,
  Switch,
  FileInput,
  TextInput,
  Textarea,
  Image,
  Stack,
  Flex,
  Group,
  ActionIcon,
  Button,
  Modal,
} from "@mantine/core";
import SettingUserTable from "../../../components/CRUDTable/SettingUserTable";

const SettingUser = () => {




  return (
  <div id="SettingUser">
    <SettingUserTable></SettingUserTable>
  </div>
  );
};

export default SettingUser;
