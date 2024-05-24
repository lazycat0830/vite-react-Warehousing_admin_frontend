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
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import "./CompanyTable.scss";

const ProductTable = (props) => {
  const [activePage, setActivitePage] = useState(1);
  const [itemPage, setitemPage] = useState(10);
  const [isListChange, setIsListChange] = useState(false);
  const { rows } = props;
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
    <tr key={row.pro_id}>
      {isListChange && (
        <td>
          <Checkbox
            checked={row.checked}
            onChange={() => SpecifyCheckboxChange(index)}
            style={{ display: "flex", justifyContent: "center" }}
            alt="check"
          />
        </td>
      )}
      <td>
        <div>
          <Image
            radius="xs"
            height={75}
            fit="scale-down"
            src={row.pro_img}
            alt={`img${row.pro_id}`}
            withPlaceholder
            placeholder={
              <Text align="center">
                {!row.pro_homemadeName ? row.pro_comName : row.pro_homemadeName}
              </Text>
            }
          />
        </div>
        {/* <img
          style={{ maxHeight: "75px", verticalAlign: "middle" }}
          src={row.pro_img}
          alt={`img${row.pro_id}`}
        /> */}
      </td>
      <td>${row.pro_price}</td>
      <td>${row.pro_cost}</td>
      <td>{row.pro_comName}</td>
      <td>{row.pro_homemadeName}</td>
      <td>
        <Group position="center" spacing="xs" grow>
          <Tooltip label="修改">
            <ActionIcon
              variant="outline"
              color="indigo"
              onClick={() => props.openModal("edit", row)}
            >
              <Icon icon={faEdit}></Icon>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="下架">
            <ActionIcon
              variant="outline"
              color="red"
              onClick={() => props.openModal("delete", row)}
            >
              <Icon icon={faBox}></Icon>
            </ActionIcon>
          </Tooltip>
        </Group>
      </td>
    </tr>
  ));

  // 刪除多廠商
  const onSubmit = () => {
    const checkedItems = [];
    paginatedData.forEach((page) => {
      page.forEach((row) => {
        if (row.checked) {
          checkedItems.push(row.pro_id);
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
    <div id="ProductTable">
      <Group position="apart" spacing="xs" style={{ paddingBottom: "6px" }}>
        <Group>
          <Button onClick={clearCheck}>{isListChange ? "取消" : "選擇"}</Button>
          {isListChange && <Button onClick={onSubmit}>刪除</Button>}
        </Group>
        <Group>
          <Button
            onClick={() => props.openModal("addCSV")}
            leftIcon={<Icon icon={faPlusSquare} />}
          >
            CSV新增
          </Button>
          <Button
            onClick={() => props.openModal("add")}
            leftIcon={<Icon icon={faPlusSquare} />}
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
          <thead>
            <tr>
              {isListChange && (
                <th style={{ width: "5%" }}>
                  <Checkbox
                    checked={allChecked}
                    onChange={AllCheckboxChange}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    alt="check"
                  />
                </th>
              )}
              <th>圖片</th>
              <th>原價格</th>
              <th>成本</th>
              <th>廠商商品名稱</th>
              <th>自訂商品名稱</th>
              <th style={{ width: "15%" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 && tbRows}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5}>查無資料</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Group position="center" style={{ marginTop: "12px" }}>
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

ProductTable.defaultProps = {
  rows: [],
};

export default ProductTable;
