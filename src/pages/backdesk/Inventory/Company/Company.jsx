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
import CompanyTable from "../../../../components/CRUDTable/CompanyTable";
import CompanyForm from "../../../../components/Form/CompanyForm";

const Company = (props) => {
  const [token, setToken] = useState(null);
  const [times, setTimes] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [EditRow, setEditRow] = useState({});
  const [csvFile, setCsvFile] = useState(null);
  const {
    GET_AllCompany,
    POST_AddCompany,
    PUT_EditCompany,
    PUT_DelCompany,
    POST_AddCompanyCsv,
  } = props;
  const { AllCompany } = props;

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
        await GET_AllCompany();
      }
    };
    fetch();
  }, [token, GET_AllCompany]);

  const ModalTitles = {
    add: "新增廠商",
    edit: "修改廠商",
    delete: "刪除廠商",
    addCSV: "csv檔新增廠商",
  };
  // 新增/修改送出
  const onSubmit = async (values, type) => {
    const {
      com_homemadeName,
      com_name,
      com_address,
      com_phone,
      discount,
      payDay,
      com_id,
    } = values;
    const body = {
      com_homemadeName: com_homemadeName,
      com_name: com_name,
      com_address: com_address,
      com_phone: com_phone,
      discount: discount,
      payDay: payDay,
    };
    // console.log("type",type);
    // console.log("addCompany",body);
    if (com_name) {
      if (type === "add") {
        await POST_AddCompany(body);
      } else if (type === "edit") {
        body.com_id = com_id;
        await PUT_EditCompany(body);
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
    const body = { ListCom: [EditRow?.com_id] };
    if (EditRow?.com_id) {
      await PUT_DelCompany(body);
      setOpenedModal(false);
    }
  };
  // 用csv檔新增
  const addCsvForm = async () => {
    const data = new FormData();
    data.append("CompanyCSV", csvFile);
    if (csvFile) {
      await POST_AddCompanyCsv(data);
      setOpenedModal(false);
    }
  };

  return (
    <div id="Company">
      <CompanyTable rows={AllCompany} openModal={openModal} />
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={ModalTitles[modalType]}
      >
        {modalType === "add" && (
          <CompanyForm onSubmit={onSubmit} resetForm={resetForm} type={"add"} />
        )}
        {modalType === "edit" && (
          <CompanyForm
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
    AllCompany: _.get(state, "company.AllCompany", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_AllCompany(payload, callback, loading) {
      dispatch({ type: "GET_AllCompany", payload, callback, loading });
    },
    POST_AddCompany(payload, callback, loading) {
      dispatch({ type: "POST_AddCompany", payload, callback, loading });
    },
    PUT_EditCompany(payload, callback, loading) {
      dispatch({ type: "PUT_EditCompany", payload, callback, loading });
    },
    PUT_DelCompany(payload, callback, loading) {
      dispatch({ type: "PUT_DelCompany", payload, callback, loading });
    },
    POST_AddCompanyCsv(payload, callback, loading) {
      dispatch({ type: "POST_AddCompanyCsv", payload, callback, loading });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
