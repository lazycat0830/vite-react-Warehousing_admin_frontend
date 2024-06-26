import React from "react";
import { TextInput, Button, Stack, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

const ProductTypeForm = ({
  editRow= {
    type_title: "",
  },
  type,
  onSubmit
}) => {
  const Form = useForm({
    initialValues: editRow,
    validationRules: {
      type_title: (value) => value.trim().length > 0,
    },
  });

  const SubmitForm = () => {
    onSubmit(Form.values, type);
  };

  return (
    <form>
      <Stack>
        <TextInput label="類型名稱" {...Form.getInputProps("type_title")} />
        <Group position="right" spacing="xs">
          <Button
            type="button"
            onClick={() => SubmitForm()} // 這裡不需要箭頭函數
          >
            {type === "add" ? "新增" : "修改"}
          </Button>
          <Button
            type="button" // 如果要取消，type應該是button
            onClick={() => props.resetForm()} // 這裡可以添加取消功能的函數
          >
            取消
          </Button>
        </Group>
      </Stack>
    </form>
  );
};


export default ProductTypeForm;
