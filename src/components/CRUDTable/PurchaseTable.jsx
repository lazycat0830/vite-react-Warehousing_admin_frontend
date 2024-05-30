import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import {
  Button,
  Text,
  Table,
  Group,
  Switch,
  Pagination,
  Select,
  Modal,
  Image,
  Tooltip,
  TextInput,
  ActionIcon,
  Checkbox,
} from "@mantine/core";
import {
  faPlusSquare,
  faPlus,
  faSearch,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import "./CompanyTable.scss";

const PurchaseTable = ({rows = [],openModal}) => {
  const [activePage, setActivitePage] = useState(1);
  const [itemPage, setitemPage] = useState(10);
  

  const paginatedData = _.chunk(rows, itemPage);

  const maxPage = _.ceil(rows.length / itemPage);

  const setPage = (page) => {
    setActivitePage(page);
  };

  const tbRows = _.map(paginatedData[activePage - 1], (row, index) => (
    <Table.Tr key={row.pur_id} onClick={() => openModal("edit", row)}>
      <Table.Td>
        <Text truncate>{row.pur_name}</Text>
      </Table.Td>
      <Table.Td>{moment.utc(row.insertDate).format("YYYY年MM月DD日")}</Table.Td>
      <Table.Td>{row.pur_type ? "進貨" : "退貨"}</Table.Td>
      <Table.Td>{row.finish_sts ? "已完成" : "未完成"}</Table.Td>
      <Table.Td>{row.pur_allquantity}</Table.Td>
      <Table.Td>{row.pro_allquantity}</Table.Td>
      <Table.Td>{row.pro_allCost}</Table.Td>
      <Table.Td>
        {row.finishDate
          ? moment.utc(row.finishDate).format("YYYY年MM月DD日")
          : "--"}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div id="CompanyTable">
      <Group justify="right" spacing="xs" pb={6}>
        <Button
          onClick={() => openModal("add")}
          leftSection={<Icon icon={faPlusSquare} />}
        >
          新增
        </Button>
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
        <Table className="table">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>進貨單號碼 / 自訂單號</Table.Th>
              <Table.Th>建立日期</Table.Th>
              <Table.Th>種類</Table.Th>
              <Table.Th>貨單狀態</Table.Th>
              <Table.Th>預期數量</Table.Th>
              <Table.Th>到貨數量</Table.Th>
              <Table.Th>預期成本</Table.Th>
              <Table.Th>預定到貨日期</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 && tbRows}
            {rows.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={8}>查無資料</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>
      <Group justify="center" mt={12}>
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


export default PurchaseTable;
