import React from "react";
import { TextInput, Button, Stack, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const CompanyForm = ( {
  editRow = {
    com_homemadeName: "",
    com_name: "",
    com_address: "",
    com_phone: "",
    discount: 0.7,
    payDay: 20,
  },
  type,
  resetForm,
  onSubmit
}) => {

  const Form = useForm({
    initialValues: editRow,
    validationRules: {
      com_name: (value) => value.trim().length > 0,
      discount: (value) => value !== 0,
      payDay: (value) => value !== 0,
    },
  });

  const SubmitForm = () => {
    onSubmit(Form.values, type);
  };

  return (
    <form>
      <Stack>
        <TextInput
          label="廠商編號"
          {...Form.getInputProps("com_homemadeName")}
        />
        <TextInput
          required
          label="廠商名稱"
          {...Form.getInputProps("com_name")}
        />
        <TextInput label="廠商電話" {...Form.getInputProps("com_phone")} />
        <TextInput label="廠商地址" {...Form.getInputProps("com_address")} />
        <Group grow>
          <NumberInput
            required
            label="結帳折扣"
            precision={2}
            min={0.05}
            step={0.05}
            max={1}
            {...Form.getInputProps("discount")}
          />
          <TextInput
            required
            label="每月結算日"
            {...Form.getInputProps("payDay")}
          />
        </Group>
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


export default CompanyForm;
