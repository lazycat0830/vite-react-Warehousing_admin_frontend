/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
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
import {
  faPlusSquare,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import ProductTypeTable from "../../../components/CRUDTable/ProductTypeTable";
import ProductTypeForm from "../../../components/Form/ProductTypeForm";

const ProductType = (props) => {
  const [token, setToken] = useState(null);
  const [times, setTimes] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [EditRow, setEditRow] = useState({});
  const [csvFile, setCsvFile] = useState(null);
  const {
    GET_AllProductType,
    POST_AddProductType,
    PUT_EditProductType,
    DELETE_DelProductType,
  } = props;
  const { AllProductType } = props;

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
        await GET_AllProductType();
      }
    };
    fetch();
  }, [token, GET_AllProductType]);

  //   const AllProductType=[
  //     {
  //         "type_id": 1,
  //         "type_title": "無"
  //     },
  //     {
  //         "type_id": 2,
  //         "type_title": "拖鞋"
  //     }
  // ]

  const ModalTitles = {
    add: "新增商品類型",
    edit: "修改商品類型",
    delete: "刪除商品類型",
    addCSV: "csv檔新增商品類型",
  };
  // 新增/修改送出
  const onSubmit = async (values, type) => {
    const { type_title, type_id } = values;
    const body = {
      type_title: type_title,
    };
    if (type_title) {
      if (type === "add") {
        await POST_AddProductType(body);
      } else if (type === "edit") {
        body.type_id = type_id;
        await PUT_EditProductType(body);
      }

      setOpenedModal(false);
    }
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

  // 刪除
  const deleteForm = async () => {
    const body = { ListTypeId: EditRow?.type_id };
    // await DELETE_DelProductType(body);
    if (EditRow?.type_id) {
      setOpenedModal(false);
    }
  };
  // 用csv檔新增
  const addCsvForm = () => {
    console.log(csvFile);
    const data = new FormData();
    data.append("Company", csvFile);
    if (csvFile) {
      setOpenedModal(false);
    }
  };

  return (
    <div id="Company">
      <ProductTypeTable rows={AllProductType} openModal={openModal} />
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={ModalTitles[modalType]}
      >
        {modalType === "add" && (
          <ProductTypeForm
            onSubmit={onSubmit}
            resetForm={resetForm}
            type={"add"}
          />
        )}
        {modalType === "edit" && (
          <ProductTypeForm
            onSubmit={onSubmit}
            resetForm={resetForm}
            editRow={EditRow}
            type={"edit"}
          />
        )}
        {modalType === "delete" && (
          <Stack>
            <Text>確認是否刪除?</Text>
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
    AllProductType: _.get(state, "productType.AllProductType", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_AllProductType(payload, callback, loading) {
      dispatch({ type: "GET_AllProductType", payload, callback, loading });
    },
    POST_AddProductType(payload, callback, loading) {
      dispatch({ type: "POST_AddProductType", payload, callback, loading });
    },
    PUT_EditProductType(payload, callback, loading) {
      dispatch({ type: "PUT_EditProductType", payload, callback, loading });
    },
    DELETE_DelProductType(payload, callback, loading) {
      dispatch({ type: "DELETE_DelProductType", payload, callback, loading });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductType);
