import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Button,
  Text,
  Table,
  Group,
  Switch,
  Pagination,
  Select,
} from "@mantine/core";
import "./CompanyTable.scss";

const PayStsList = {
  pay: "已付款",
  nopay: "未付款",
  deposit: "已付訂金",
  refund: "退款",
};

const OrdStsList = {
  order: "一般訂單",
  preOrder: "預定訂單",
  return: "退貨單",
  exchange: "換貨單",
  cancel: "取消訂單",
};

const OrderMeanTable = ({ rows = [], openModal }) => {
  const [activePage, setActivitePage] = useState(1);
  const [itemPage, setitemPage] = useState(10);
  const paginatedData = _.chunk(rows, itemPage);
  const maxPage = _.ceil(rows.length / itemPage);
  const setPage = (page) => {
    setActivitePage(page);
  };

  const tbRows = _.map(paginatedData[activePage - 1], (row, index) => (
    <Table.Tr key={row.ord_id} onClick={() => openModal("edit", row)}>
      <Table.Td>
        <Text truncate>{row.ord_id}</Text>
      </Table.Td>
      <Table.Td>{OrdStsList[row.ord_type]}</Table.Td>
      <Table.Td>{row.ord_sts ? "完成" : "暫存"}</Table.Td>
      <Table.Td>{PayStsList[row.pay_sts]}</Table.Td>
      <Table.Td>{row.ord_pay}</Table.Td>
      <Table.Td>{moment.utc(row.ord_date).format("YYYY年MM月DD日")}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div id="CompanyTable">
      <Group position="right" spacing="xs" style={{ paddingBottom: "6px" }}>
        <Select
          defaultValue="10"
          data={["10", "15", "20"]}
          radius="sm"
          onChange={(par) => {
            setitemPage(par);
          }}
          style={{ maxWidth: "75px" }}
        />
      </Group>
      <div className="tableDiv">
        <Table className="table" stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "30%" }}>編號</Table.Th>
              <Table.Th>類型</Table.Th>
              <Table.Th>訂單狀態</Table.Th>
              <Table.Th>付款方式</Table.Th>
              <Table.Th>金額</Table.Th>
              <Table.Th>日期</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 && tbRows}
            {rows.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={5}>查無資料</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>
      <Group justify="center" style={{ marginTop: "12px"}} >
        <Pagination
          total={maxPage}
          value={activePage}
          onChange={setPage}
          siblings={1}
        />
      </Group>
    </div>
  );
};

export default OrderMeanTable;
