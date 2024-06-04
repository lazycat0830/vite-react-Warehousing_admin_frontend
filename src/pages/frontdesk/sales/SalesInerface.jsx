import React, { useRef, useEffect,useState,useMemo } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Grid,
  Text,
  Group,
  Input,
  Card,
  Button ,
  Modal,
  Stack,
  UnstyledButton,
  Avatar,
  ActionIcon ,
  Tooltip,
  NumberFormatter
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import {
  faPlusSquare,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import "./SalesInerface.scss";
import ProductList from "./ProductList";
// import QuaggaWebCam from "../../../components/QuaggaWebCam";
import BuyProductList from "./BuyProductList";

function SalesInerface(props) {
  const [token, setToken] = useState(null);
  const [times, setTimes] = useState(0);
  const [opened,  { open, close }] = useDisclosure(false);
  const [buyProduct,setBuyProduct]=useState([])
  const [subtotal,setSubtotal]=useState(0)
  const [search,setSearch]=useState("");

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
}, [
  token,
  GET_GetInventory,

]);

const filteredInventory = useMemo(() => {
  if (!search) return AllInventory;
  return _.filter(AllInventory, (item) => 
    item.pro_homemadeName.includes(search) || item.pro_comName.includes(search)
  );
}, [search, AllInventory]);

// 新增要購買的商品
const getProduct=(proRow)=>{
  const buyPro = [...buyProduct];
  const item = _.find(buyPro, { inf_id: proRow.inf_id });

  if (item) {
    item.num += 1;
  } else {
    proRow.num = 1;  // 確保新添加的項目有正確的數量屬性
    buyPro.push(proRow);
  }
  setSubtotal(_.sumBy(buyPro,(pro)=>{return pro.pro_price *pro.num}))
  setBuyProduct(buyPro);
}

// 取消要購買的商品
const cancelProduct=(proRow)=>{
  const updatedBuyProduct = [...buyProduct];
  _.remove(updatedBuyProduct, { inf_id: proRow.inf_id });
  setSubtotal(_.sumBy(updatedBuyProduct,(pro)=>{return pro.pro_price *pro.num}))
  setBuyProduct(updatedBuyProduct);
}

const editProNum=(proRow,newNum)=>{
  const buyPro = [...buyProduct];
  const item = _.find(buyPro, { inf_id: proRow.inf_id });
  if(item){
    item.num=newNum;
  }
  setSubtotal(_.sumBy(buyPro,(pro)=>{return pro.pro_price *pro.num}))
  setBuyProduct(buyPro);
}

  return (
    <div id="SalesInerface">
      <Grid style={{ height: "100%" }}>
        <Grid.Col span={{ base: 12, md: 8 }} >
          <Card withBorder  radius="md">
            <Card.Section withBorder inheritPadding py="xs">
              <Group>
                <Text weight={500}>搜尋：</Text>
                <Input placeholder="搜尋" size="xs" onChange={(event) => setSearch(event.currentTarget.value)} />
              </Group>
            </Card.Section>
            <ProductList rows={filteredInventory} getProduct={getProduct} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4}} style={{ borderLeft: "1px solid #000" }}>
          <Button fullWidth onClick={open}>開啟掃碼</Button>
          <BuyProductList buyProduct={buyProduct} cancelProduct={cancelProduct}/>
          <Stack justify="space-between"  align="stretch" h={200}>
          <div>
          <Text size="xl">小計: <NumberFormatter prefix="$ " value={subtotal} thousandSeparator/>
          <Tooltip label="新增折扣">
          <ActionIcon radius="xl" ml={10} variant="filled" aria-label="Settings"><Icon icon={faPlus} />
          </ActionIcon>
          </Tooltip>
          </Text>
          {/* <Text size="xl">折扣:{}</Text> */}
          <Text size="xl">總計: <NumberFormatter prefix="$ " value={subtotal} thousandSeparator/></Text>
          </div>
          <Button style={{height:50,fontSize:"1.5rem"}} fullWidth>結帳</Button>
          </Stack>
        </Grid.Col>
      </Grid>
      <Modal opened={opened} onClose={close}  title="Authentication">
          {/* <QuaggaWebCam  /> */}
      </Modal>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SalesInerface);
