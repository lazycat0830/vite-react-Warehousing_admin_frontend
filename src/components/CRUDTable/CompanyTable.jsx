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

const CompanyTable = ({rows = [],openModal}) => {
  const [activePage, setActivitePage] = useState(1);
  const [itemPage, setitemPage] = useState(10);
  const [isListChange, setIsListChange] = useState(false);
  const [paginatedData, setPaginatedData] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const editPaginatedData = _.chunk(
      rows.map((row) => ({ ...row, checked: false })),
      itemPage
    );
    setPaginatedData(editPaginatedData);
  }, [rows, itemPage]);

  const maxPage = _.ceil(rows.length / itemPage);

  const setPage = (page) => {
    setActivitePage(page);
  };

  // 全選
  const AllCheckboxChange = () => {
    const editPaginatedData = [...paginatedData];
    editPaginatedData[activePage - 1] = editPaginatedData[activePage - 1].map(
      (row) => ({ ...row, checked: !allChecked })
    );
    setPaginatedData(editPaginatedData);
    setAllChecked(!allChecked);
  };
  // 指定多選
  const SpecifyCheckboxChange = (index) => {
    const editPaginatedData = [...paginatedData];
    editPaginatedData[activePage - 1][index] = {
      ...editPaginatedData[activePage - 1][index],
      checked: !editPaginatedData[activePage - 1][index].checked,
    };
    setPaginatedData(editPaginatedData);
  };

  const tbRows = _.map(paginatedData[activePage - 1], (row, index) => (
    <Table.Tr key={row.com_id}>
      {isListChange && (
        <Table.Td>
          <Checkbox
            checked={row.checked}
            onChange={() => SpecifyCheckboxChange(index)}
            style={{ display: "flex", justifyContent: "center" }}
            alt="check"
          />
        </Table.Td>
      )}
      <Table.Td>{row.com_homemadeName ? row.com_homemadeName : "無"}</Table.Td>
      <Table.Td>{row.com_name}</Table.Td>
      <Table.Td>{row.com_phone ? row.com_phone : "無"}</Table.Td>
      <Table.Td>
        <Text truncate>{row.com_address ? row.com_address : "無"}</Text>
      </Table.Td>
      <Table.Td>
        <Group position="center" spacing="xs" grow>
          <Tooltip label="修改">
            <ActionIcon
              variant="outline"
              color="indigo"
              onClick={() => openModal("edit", row)}
            >
              <Icon icon={faEdit}></Icon>
            </ActionIcon>
          </Tooltip>
          <Tooltip label=" 刪除">
            <ActionIcon
              variant="outline"
              color="red"
              onClick={() => openModal("delete", row)}
            >
              <Icon icon={faTrash}></Icon>
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  // 刪除多廠商
  const onSubmit = () => {
    const checkedItems = [];
    paginatedData.forEach((page) => {
      page.forEach((row) => {
        if (row.checked) {
          checkedItems.push(row.com_id);
        }
      });
    });
    console.log(checkedItems);
  };
  const clearCheck = () => {
    const updatedPaginatedData = paginatedData.map((page) =>
      page.map((row) => ({ ...row, checked: false }))
    );
    setPaginatedData(updatedPaginatedData);
    setIsListChange(!isListChange);
    setAllChecked(false);
  };

  return (
    <div id="CompanyTable">
      <Group justify="space-between" spacing="xs" pb={6}>
        <Group>
          <Button onClick={clearCheck}>{isListChange ? "取消" : "選擇"}</Button>
          {isListChange && <Button onClick={onSubmit}>刪除</Button>}
        </Group>
        <Group>
          <Button
            onClick={() => openModal("addCSV")}
            leftSection={<Icon icon={faPlusSquare} />}
          >
            CSV新增
          </Button>
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
      </Group>
      <div className="tableDiv">
        <Table className="table">
          <Table.Thead>
            <Table.Tr>
              {isListChange && (
                <Table.Th style={{ width: "5%" }}>
                  <Checkbox
                    checked={allChecked}
                    onChange={AllCheckboxChange}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    alt="check"
                  />
                </Table.Th>
              )}
              <Table.Th style={{ width: "8%" }}>廠商編號</Table.Th>
              <Table.Th>廠商名稱</Table.Th>
              <Table.Th>廠商電話</Table.Th>
              <Table.Th>廠商地址</Table.Th>
              <Table.Th style={{ width: "15%" }}>操作</Table.Th>
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
      <Group justify="center" style={{ marginTop: "12px" }}>
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


export default CompanyTable;
