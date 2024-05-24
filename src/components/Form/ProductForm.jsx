import React, { useState, useEffect, useRef } from "react";
import {
  TextInput,
  Button,
  Stack,
  Group,
  Select,
  NumberInput,
  MultiSelect,
  Tabs,
  Image,
  FileInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const ProductForm = (props) => {
  const [addColorData, setAddColorData] = useState([]);
  const [addSizeData, setAddSizeData] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const { editRow, pro_img, type, comDropDown, typeDropDown } = props;

  useEffect(() => {
    setImgFile(pro_img);
  }, [pro_img]);

  const Form = useForm({
    initialValues: editRow,
  });

  const onSubmit = () => {
    Form.values.pro_style.color = colorList;
    Form.values.pro_style.size = sizeList;
    props.onSubmit(Form.values, imgFile, type);
  };

  return (
    <form>
      <Stack>
        <Tabs variant="outline" defaultValue="mainImg">
          <Tabs.List grow>
            <Tabs.Tab value="mainImg">圖片</Tabs.Tab>
            <Tabs.Tab value="productInf">商品資訊</Tabs.Tab>
            <Tabs.Tab value="specification">商品規格</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="mainImg" pt="xs">
            <Title pb={5} order={4}>
              主要圖片
            </Title>
            <FileInput
              style={{ width: "100%" }}
              accept="image/png,image/jpeg,image/svg,image/jpg"
              label=""
              radius="md"
              size="md"
              withAsterisk
              clearable
              onChange={setImgFile}
            />
            {imgFile && (
              <div>
                <Image
                  radius="xs"
                  height={300}
                  fit="scale-down"
                  src={
                    typeof imgFile === "string"
                      ? imgFile
                      : URL.createObjectURL(imgFile)
                  }
                  alt="updateImage"
                  withPlaceholder
                />
              </div>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="productInf" pt="xs">
            <Title pb={5} order={4}>
              商品資訊
            </Title>
            <Select
              label="廠商"
              placeholder="選擇廠商"
              searchable
              nothingFound="No options"
              data={comDropDown}
              required
              {...Form.getInputProps("com_id")}
            />
            <TextInput
              required
              label="廠商商品編號"
              {...Form.getInputProps("pro_comName")}
            />
            <TextInput
              label="自訂商品編號"
              {...Form.getInputProps("pro_homemadeName")}
            />
            <Select
              label="商品類型"
              placeholder="選擇類型"
              searchable
              defaultValue={1}
              nothingFound="No options"
              data={typeDropDown}
              clearable
              {...Form.getInputProps("type_id")}
            />
            <NumberInput
              required
              label="售價"
              min={0}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              {...Form.getInputProps("pro_price")}
            />
            <NumberInput
              required
              label="成本"
              min={0}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              {...Form.getInputProps("pro_cost")}
            />
          </Tabs.Panel>
          <Tabs.Panel value="specification" pt="xs">
            <Title pb={5} order={4}>
              商品規格
            </Title>
            <MultiSelect
              label="顏色"
              data={addColorData}
              value={colorList}
              searchable
              creatable
              getCreateLabel={(query) => `+ 新增 ${query}`}
              onChange={setColorList}
              onCreate={(query) => {
                // const item = { value: query, label: query };
                setAddColorData((current) => [...current, query]);
                return query;
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  const query = event.target.value;
                  setAddColorData((current) => [...current, query]);
                  setColorList((current) => [...current, query]);
                  event.preventDefault();
                }
              }}
            />
            <MultiSelect
              label="尺寸"
              data={addSizeData}
              value={sizeList}
              searchable
              creatable
              onChange={setSizeList}
              getCreateLabel={(query) => `+ 新增 ${query}`}
              onCreate={(query) => {
                // const item = { value: query, label: query };
                setAddSizeData((current) => [...current, query]);
                return query;
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  const query = event.target.value;
                  setAddSizeData((current) => [...current, query]);
                  setSizeList((current) => [...current, query]);
                  event.preventDefault();
                }
              }}
            />
          </Tabs.Panel>
        </Tabs>
        <Group position="right" spacing="xs">
          <Button
            type="button"
            onClick={() => onSubmit()} // 這裡不需要箭頭函數
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

ProductForm.defaultProps = {
  editRow: {
    pro_id: null,
    com_id: null,
    pro_comName: "",
    pro_homemadeName: "",
    type_id: null,
    pro_cost: 0,
    pro_price: 0,
    pro_style: { color: [], size: [] },
  },
  pro_img: null,
  comDropDown: [],
  typeDropDown: [],
};

export default ProductForm;
