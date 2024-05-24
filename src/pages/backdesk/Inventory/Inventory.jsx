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
import InventoryForm from "../../../components/Form/InventoryForm";
import InventoryTable from "../../../components/CRUDTable/InventoryTable";
import "./Inventory.scss";

const Inventory = (props) => {
  const [token, setToken] = useState(null);
  const [times, setTimes] = useState(0);
  const { GET_GetInventory } = props;
  const { AllInventory } = props;

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
        await GET_GetInventory();
      }
    };
    fetch();
  }, [token, GET_GetInventory]);

  return (
    <div id="Inventory">
      <InventoryTable rows={AllInventory} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { AllInventory: _.get(state, "Inventory.AllInventory", []) };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_GetInventory(payload, callback, loading) {
      dispatch({ type: "GET_GetInventory", payload, callback, loading });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
