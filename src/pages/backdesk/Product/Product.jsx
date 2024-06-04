/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import _, { size } from "lodash";
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
  Select ,
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
import ShowImgForm from "../../../components/Form/ShowImgForm";

const Product = (props) => {
  const [token, setToken] = useState(null);
  const [times, setTimes] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [EditRow, setEditRow] = useState({});
  const [csvFile, setCsvFile] = useState(null);
  const [CsvComID, setCsvCom] = useState(null);

  const { GET_GetAllProduct,POST_AddProduct,PUT_EditProduct,PUT_DelProduct, GET_dropDownCompany, GET_dropDownProductType,POST_AddProductCsv,PUT_EditProductImg,PUT_DelProductImg } =
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
        await GET_dropDownCompany();
        await GET_dropDownProductType();
      }
    };
    fetch();
  }, [
    token,
    GET_GetAllProduct,
    GET_dropDownCompany,
    GET_dropDownProductType,
  ]);
  const ModalTitles = {
    add: "新增商品",
    edit: "修改商品",
    delete: "下架商品",
    addCSV: "csv檔新增商品",
    showImg:"顯示圖片"
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

  const onSubmit = async(value, img, type,ImgAction) => {
    const {
      pro_id,
      com_id,
      pro_comName,
      pro_homemadeName,
      type_id,
      pro_cost,
      pro_price,
      pro_color,
      pro_size,
      ListPro
    } = value;
    const data = new FormData();
    data.append("com_id", com_id);
    data.append("pro_comName", pro_comName);
    data.append("pro_homemadeName", pro_homemadeName);
    data.append("type_id", type_id);
    data.append("pro_cost", pro_cost);
    data.append("pro_price", pro_price);
    data.append("pro_style",(pro_color!==undefined)?JSON.stringify({color:pro_color,size:pro_size}):'{}');
    data.append("pro_img", img);
    if (com_id || (type === "table")) {
      if (type === "add") {
        await POST_AddProduct(data);
      } else if (type === "edit") {
        data.append("pro_id", pro_id);
        await PUT_EditProduct(data);
      } else if(type === "showImg" && ImgAction === "editImg"){
        data.append("pro_id", pro_id);
        await PUT_EditProductImg(data);
      } else if(type === "showImg" && ImgAction === "delImg"){
        await PUT_DelProductImg({ListPro:pro_id.split()});
      } else if(type === "table" && ImgAction === "delImg"){
        await PUT_DelProductImg({ListPro:ListPro});
      }else if(type === "table" && ImgAction === "delPro"){
        await PUT_DelProduct({ListPro:ListPro});
      }
      setOpenedModal(false);
    }
  };
  const onCsvSubmit=async()=>{
    if(CsvComID&&csvFile){
      const csvData=new FormData();
      csvData.append("com_id",CsvComID);
      csvData.append("ProductCSV",csvFile);
      await POST_AddProductCsv(csvData);
      setOpenedModal(false);
    }
    setCsvCom(null);
  }

  return (
    <div id="Product">
      <ProductTable rows={AllProduct} openModal={openModal} onSubmit={onSubmit}/>
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
            editRow={EditRow}
            pro_img={EditRow.pro_img}
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
            <Select
              label="選擇廠商"
              data={Company}
              onChange={setCsvCom}
            />
            <FileInput label="CSV檔" onChange={setCsvFile} withAsterisk />
            <a href="/public/CSV/Product.csv" download="商品csv檔範本.csv">
              商品csv檔範本
            </a>
            <Group position="right" spacing="xs">
              <Button
                type="button"
                onClick={() => onCsvSubmit()} // 這裡不需要箭頭函數
              >
                確認
              </Button>
              <Button type="button" onClick={() => resetForm()}>
                取消
              </Button>
            </Group>
          </Stack>
        )}
        {
          modalType ==="showImg" && (
            <ShowImgForm editRow={EditRow} 
            onSubmit={onSubmit} type={"showImg"}/>
          )
        }
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
    POST_AddProduct(payload, callback, loading) {
      dispatch({ type: "POST_AddProduct", payload, callback, loading });
    },
    PUT_EditProduct(payload, callback, loading) {
      dispatch({ type: "PUT_EditProduct", payload, callback, loading });
    },
    PUT_DelProduct(payload, callback, loading) {
      dispatch({ type: "PUT_DelProduct", payload, callback, loading });
    },
    GET_dropDownCompany(payload, callback, loading) {
      dispatch({ type: "GET_dropDownCompany", payload, callback, loading });
    },
    GET_dropDownProductType(payload, callback, loading) {
      dispatch({ type: "GET_dropDownProductType", payload, callback, loading });
    },
    POST_AddProductCsv(payload, callback, loading) {
      dispatch({ type: "POST_AddProductCsv", payload, callback, loading });
    },
    PUT_EditProductImg(payload, callback, loading) {
      dispatch({ type: "PUT_EditProductImg", payload, callback, loading });
    },
    PUT_DelProductImg(payload, callback, loading) {
      dispatch({ type: "PUT_DelProductImg", payload, callback, loading });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
