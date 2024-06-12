import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
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
import SettingPayTable from "../../../components/CRUDTable/SettingPayTable";
import SettingPayForm from "../../../components/Form/SettingPayForm";

const ModalTitles = {
  add: "新增付款類型",
  edit: "修改付款類型",
  delete: "刪除付款類型",
};

const SettingPay = (props) => {
  const [token, setToken] = useState(null);
  const [times, setTimes] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [EditRow, setEditRow] = useState({});

  const { GET_GetAllPay, POST_AddPayType } = props;
  const { AllPayType } = props;

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
        await GET_GetAllPay();
      }
    };
    fetch();
  }, [token, GET_GetAllPay]);

  // 開啟彈窗
  const openModal = (type, row) => {
    setModalType(type);
    setEditRow(row);
    setOpenedModal(true);
  };
  // 關閉彈窗
  const resetForm = () => {
    setOpenedModal(false);
  };

  // 新增/修改送出
  const onSubmit = async (values, type) => {
    const { setpay_name, setpay_id } = values;
    const body = {
      setpay_name: setpay_name,
    };
    if (setpay_name) {
      if (type === "add") {
        await POST_AddPayType(body);
      } else if (type === "edit") {
        body.setpay_id = setpay_id;
        // await PUT_EditProductType(body);
      }

      setOpenedModal(false);
    }
  };

  // 刪除
  const deleteForm = async () => {
    const body = { ListTypeId: EditRow?.setpay_id };
    // await DELETE_DelProductType(body);
    if (EditRow?.setpay_id) {
      setOpenedModal(false);
    }
  };

  return (
    <div id="SettingPay">
      <SettingPayTable rows={AllPayType} openModal={openModal} />
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={ModalTitles[modalType]}
      >
        {modalType === "add" && (
          <SettingPayForm
            onSubmit={onSubmit}
            resetForm={resetForm}
            type={"add"}
          />
        )}
        {modalType === "edit" && (
          <SettingPayForm
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
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllPayType: _.get(state, "setting.AllPayType", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_GetAllPay(payload, callback, loading) {
      dispatch({ type: "GET_GetAllPay", payload, callback, loading });
    },
    POST_AddPayType(payload, callback, loading) {
      dispatch({ type: "POST_AddPayType", payload, callback, loading });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPay);
