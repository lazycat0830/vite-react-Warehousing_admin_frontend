import React from "react";
import { TextInput, Button, Stack, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

const SettingPayForm = ({
  editRow = {
    setpay_id: null,
    setpay_name: "",
  },
  type,
  onSubmit,
  resetForm,
}) => {
  const Form = useForm({
    initialValues: editRow,
    validationRules: {
      setpay_name: (value) => value.trim().length > 0,
    },
  });

  const SubmitForm = () => {
    onSubmit(Form.values, type);
  };

  return (
    <form>
      <Stack>
        <TextInput label="付款名稱" {...Form.getInputProps("setpay_name")} />
        <Group position="right" spacing="xs">
          <Button
            type="button"
            onClick={() => SubmitForm()} // 這裡不需要箭頭函數
          >
            {type === "add" ? "新增" : "修改"}
          </Button>
          <Button
            type="button" // 如果要取消，type應該是button
            onClick={() => resetForm()} // 這裡可以添加取消功能的函數
          >
            取消
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default SettingPayForm;
