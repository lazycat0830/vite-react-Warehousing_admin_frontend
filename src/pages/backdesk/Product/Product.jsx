/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import { useForm } from "@mantine/form";
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
  Select,
  MultiSelect,
} from "@mantine/core";
import {
  faPlusSquare,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import ProductTable from "../../../components/CRUDTable/ProductTable";
import ProductForm from "../../../components/Form/ProductForm";

const Product = (props) => {
  const [token, setToken] = useState(null);
  const [times, setTimes] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [EditRow, setEditRow] = useState({});
  const [csvFile, setCsvFile] = useState(null);
  const { GET_GetAllProduct, GET_dropDownInventory, GET_dropDownProductType } =
    props;
  const { AllProduct, Company, ProductType } = props;

  useEffect(() => {
    const getToken = async () => {
      const { TOKEN } = localStorage;
      if (TOKEN) {
        setToken(TOKEN);
      } else if (times < 50) {
        setTimeout(getToken, 2000);
        setTimes(times + 1);
      }
    };
    getToken();
  }, [times]);

  useEffect(() => {
    const fetch = async () => {
      if (token) {
        await GET_GetAllProduct();
        await GET_dropDownInventory();
        await GET_dropDownProductType();
      }
    };
    fetch();
  }, [
    token,
    GET_GetAllProduct,
    GET_dropDownInventory,
    GET_dropDownProductType,
  ]);
  const ModalTitles = {
    add: "新增商品",
    edit: "修改商品",
    delete: "下架商品",
    addCSV: "csv檔新增商品",
  };

  // 開啟彈窗
  const openModal = (type, row) => {
    setCsvFile(null);
    setModalType(type);
    setEditRow(row);
    setOpenedModal(true);
  };
  // 關閉彈窗
  const resetForm = () => {
    setOpenedModal(false);
  };

  const onSubmit = (value, img, type) => {
    console.log(value, img, type);
    const {
      pro_id,
      com_id,
      pro_comName,
      pro_homemadeName,
      type_id,
      pro_cost,
      pro_price,
      pro_style,
    } = value;
    const data = new FormData();
    data.append("com_id", com_id);
    data.append("pro_comName", pro_comName);
    data.append("pro_homemadeName", pro_homemadeName);
    data.append("type_id", type_id);
    data.append("pro_cost", pro_cost);
    data.append("pro_price", pro_price);
    data.append("pro_style", JSON.stringify(pro_style));
    data.append("pro_img", img);
    if (com_id) {
      if (type === "add") {
        // await POST_AddCompany(body);
      } else if (type === "edit") {
        data.append("pro_id", pro_id);
        // await PUT_EditCompany(body);
      }
      setOpenedModal(false);
    }
  };

  return (
    <div id="Product">
      <ProductTable rows={AllProduct} openModal={openModal} />
      <Modal
        size="xl"
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={ModalTitles[modalType]}
      >
        {modalType === "add" && (
          <ProductForm
            resetForm={resetForm}
            onSubmit={onSubmit}
            type={"add"}
            comDropDown={Company}
            typeDropDown={ProductType}
          />
        )}
        {modalType === "edit" && (
          <ProductForm
            resetForm={resetForm}
            onSubmit={onSubmit}
            type={"edit"}
            comDropDown={Company}
            typeDropDown={ProductType}
          />
        )}
        {modalType === "delete" && (
          <Stack>
            <Text>確認是否下架?</Text>
            <Group position="right" spacing="xs">
              <Button
                type="button"
                onClick={() => deleteForm()} // 這裡不需要箭頭函數
              >
                確認
              </Button>
              <Button type="button" onClick={() => resetForm()}>
                取消
              </Button>
            </Group>
          </Stack>
        )}
        {modalType === "addCSV" && (
          <Stack>
            <FileInput label="CSV檔" onChange={setCsvFile} withAsterisk />
            <a href="/public/CSV/Company.csv" download="廠商csv檔範本.csv">
              廠商csv檔範本
            </a>
            <Group position="right" spacing="xs">
              <Button
                type="button"
                onClick={() => addCsvForm()} // 這裡不需要箭頭函數
              >
                確認
              </Button>
              <Button type="button" onClick={() => resetForm()}>
                取消
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllProduct: _.get(state, "product.AllProduct", []),
    Company: _.get(state, "dropDown.Company", []),
    ProductType: _.get(state, "dropDown.ProductType", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_GetAllProduct(payload, callback, loading) {
      dispatch({ type: "GET_GetAllProduct", payload, callback, loading });
    },
    GET_dropDownInventory(payload, callback, loading) {
      dispatch({ type: "GET_dropDownInventory", payload, callback, loading });
    },
    GET_dropDownProductType(payload, callback, loading) {
      dispatch({ type: "GET_dropDownProductType", payload, callback, loading });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
