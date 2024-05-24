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
import PurchaseTable from "../../../../components/CRUDTable/PurchaseTable";

const Purchase = (props) => {
  const [token, setToken] = useState(null);
  const [times, setTimes] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [EditRow, setEditRow] = useState({});
  const { GET_AllPurchase } = props;
  const { AllPurchase } = props;

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
        await GET_AllPurchase();
      }
    };
    fetch();
  }, [token, GET_AllPurchase]);

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

  const ModalTitles = {
    add: "新增貨單",
    edit: "修改貨單",
  };

  return (
    <div id="Purchase">
      <PurchaseTable rows={AllPurchase} openModal={openModal} />
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={ModalTitles[modalType]}
      >
        {modalType === "add" && <></>}
        {modalType === "edit" && <></>}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllPurchase: _.get(state, "Inventory.AllPurchase", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_AllPurchase(payload, callback, loading) {
      dispatch({ type: "GET_AllPurchase", payload, callback, loading });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
