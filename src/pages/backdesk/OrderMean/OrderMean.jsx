import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import {
  Modal,
} from "@mantine/core";
import {
  faPlusSquare,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import OrderMeanTable from "../../../components/CRUDTable/OrderMeanTable";

const OrderMean = (props) => {
  // const [token, setToken] = useState(null);
  // const [times, setTimes] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [EditRow, setEditRow] = useState({});
  const { GET_GetAllOrder } = props;
  const { AllOrder } = props;



  // useEffect(() => {
  //   const getToken = async () => {
  //     const { TOKEN } = localStorage;
  //     if (TOKEN) {
  //       setToken(TOKEN);
  //     } else if (times < 50) {
  //       setTimeout(getToken, 2000);
  //       setTimes(times + 1);
  //     }
  //   };
  //   getToken();
  // }, [times]);

  const ModalTitles = {
    edit: "修改訂單",
  };

  const openModal = (type, row) => {
    setModalType(type);
    setEditRow(row);
    setOpenedModal(true);
  };
  const resetForm = () => {
    setOpenedModal(false);
  };

  useEffect(() => {
    const fetch = async () => {
      // if (token) {
      //   await GET_GetAllOrder();
      // }
      await GET_GetAllOrder();
    };
    fetch();
  }, [GET_GetAllOrder ]);
  
  return (
    <div id="OrderMean">
      <OrderMeanTable rows={AllOrder} openModal={openModal} />
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title={ModalTitles[modalType]}
      >
        {modalType === "edit" && <></>}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllOrder: _.get(state, "orderMean.AllOrder", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_GetAllOrder(payload, callback, loading) {
      dispatch({ type: "GET_GetAllOrder", payload, callback, loading });
    },
    POST_AddOrder(payload, callback, loading) {
      dispatch({ type: "POST_AddOrder", payload, callback, loading });
    },
    POST_EditStsOrder(payload, callback, loading) {
      dispatch({ type: "POST_EditStsOrder", payload, callback, loading });
    },
    PUT_CancelOrder(payload, callback, loading) {
      dispatch({ type: "PUT_CancelOrder", payload, callback, loading });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderMean);
