import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Stack,
  Group,
  Select,
  NumberInput,
  Tabs,
  Image,
  FileInput,
  Title,
  TagsInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const ProductForm = ({
  editRow = {
    pro_id: "",
    com_id: null,
    pro_comName: "",
    pro_homemadeName: "",
    type_id: null,
    pro_cost: 0,
    pro_price: 0,
    pro_color: [],
    pro_size: [],
    pro_style: "",
  },
  pro_img = null,
  comDropDown = [],
  typeDropDown = [],
  type,
  onSubmit,
  resetForm,
}) => {
  const [imgFile, setImgFile] = useState(pro_img);

  const form = useForm({
    initialValues: editRow,
  });

  const handleSubmit = () => {
    onSubmit(form.values, imgFile, type);
  };

  return (
    <form>
      <Stack>
        <Tabs variant="outline" defaultValue={type==="add"?"mainImg":"productInf"}>
          <Tabs.List grow>
            {type==="add" && (<Tabs.Tab value="mainImg">圖片</Tabs.Tab>)}
            <Tabs.Tab value="productInf">商品資訊</Tabs.Tab>
            <Tabs.Tab value="specification">商品規格</Tabs.Tab>
          </Tabs.List>
          {
            type==="add" && (<Tabs.Panel value="mainImg" pt="xs">
            <Title pb={5} order={4}>
              主要圖片
            </Title>
            <FileInput
              pb={10}
              style={{ width: "100%" }}
              accept="image/png,image/jpeg,image/svg,image/jpg"
              label=""
              radius="md"
              size="md"
              withAsterisk
              clearable
              onChange={setImgFile}
            />
            <div>
              <Image
                radius="xs"
                height={300}
                fit="scale-down"
                src={
                  typeof imgFile === "string"
                    ? imgFile
                    : imgFile instanceof Blob
                    ? URL.createObjectURL(imgFile)
                    : null
                }
                alt="updateImage"
                fallbackSrc={`https://placehold.co/600x400?text=${editRow?.pro_homemadeName || editRow?.pro_comName}`}
              />
            </div>
          </Tabs.Panel>)
          }
          <Tabs.Panel value="productInf" pt="xs">
            <Title pb={5} order={4}>
              商品資訊
            </Title>
            <Select
              label="廠商"
              placeholder="選擇廠商"
              searchable
              disabled={type==="edit"}
              nothingFoundMessage="No options"
              data={comDropDown}
              required
              {...form.getInputProps("com_id")}
            />
            <TextInput
              required
              label="廠商商品編號"
              {...form.getInputProps("pro_comName")}
            />
            <TextInput
              label="自訂商品編號"
              {...form.getInputProps("pro_homemadeName")}
            />
            <Select
              label="商品類型"
              placeholder="選擇類型"
              searchable
              nothingFoundMessage="No options"
              data={typeDropDown}
              clearable
              {...form.getInputProps("type_id")}
            />
            <NumberInput
              required
              label="售價"
              min={0}
              thousandSeparator=","
              prefix="$"
              {...form.getInputProps("pro_price")}
            />
            <NumberInput
              required
              label="成本"
              min={0}
              thousandSeparator=","
              prefix="$"
              {...form.getInputProps("pro_cost")}
            />
          </Tabs.Panel>
          <Tabs.Panel value="specification" pt="xs">
            <Title pb={5} order={4}>
              商品規格
            </Title>
            <TagsInput label="顏色" placeholder="Enter add" {...form.getInputProps("pro_color")} />
            <TagsInput label="尺寸" placeholder="Enter add" {...form.getInputProps("pro_size")} />
          </Tabs.Panel>
        </Tabs>
        <Group position="right" spacing="xs">
          <Button type="button" onClick={handleSubmit}>
            {type === "add" ? "新增" : "修改"}
          </Button>
          <Button type="button" onClick={resetForm}>
            取消
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ProductForm;
