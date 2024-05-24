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

const InventoryTable = ({rows = []}) => {
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

  const tbRows = _.map(paginatedData[activePage - 1], (row, index) => {
    if (row.data.length === 1) {
      return (
        <Table.Tr key={row.pro_id}>
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
          <Table.Td>
            <div>
              <Image
              radius="xs"
              height={75}
              fit="scale-down"
              src={row.pro_img}
              alt={`img${row.pro_id}`}
              fallbackSrc={`https://placehold.co/600x400?text=${!row.pro_homemadeName ? row.pro_comName : row.pro_homemadeName}`}
            />
            </div>
          </Table.Td>
          <Table.Td>
            {!row.pro_homemadeName ? row.pro_comName : row.pro_homemadeName}
          </Table.Td>
          <Table.Td>
            <Text truncate>{row.data[0].pro_barcode}</Text>
          </Table.Td>
          <Table.Td>$ {row.data[0].pro_cost}</Table.Td>
          <Table.Td
            onClick={() => {
              console.log("a");
            }}
          >
            {row.data[0].pro_quantity}
          </Table.Td>
        </Table.Tr>
      );
    } else {
      return (
        <React.Fragment key={row.pro_id}>
          <Table.Tr>
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
            <Table.Td>
              <div>
                <Image
                  radius="xs"
                  height={75}
                  fit="scale-down"
                  src={row.pro_img}
                  alt={`img${row.pro_id}`}
                  fallbackSrc={`https://placehold.co/600x400?text=${!row.pro_homemadeName ? row.pro_comName : row.pro_homemadeName}`}
                />
              </div>
            </Table.Td>
            <Table.Td>{row.pro_comName}</Table.Td>
            <Table.Td>--</Table.Td>
            <Table.Td>--</Table.Td>
            <Table.Td>--</Table.Td>
          </Table.Tr>
          {_.map(row.data, (child, childIndex) => (
            <Table.Tr key={`${row.pro_id}-${childIndex}`}>
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
              <Table.Td>{`${child.pro_color} ${child.pro_size}`}</Table.Td>
              <Table.Td>
                {!child.pro_homemadeName
                  ? child.pro_comName
                  : child.pro_homemadeName}
              </Table.Td>
              <Table.Td>
                <Text truncate>{child.pro_barcode}</Text>
              </Table.Td>
              <Table.Td>$ {child.pro_cost}</Table.Td>
              <Table.Td
                onClick={() => {
                  console.log("a");
                }}
              >
                {child.pro_quantity}
              </Table.Td>
            </Table.Tr>
          ))}
        </React.Fragment>
      );
    }
  });

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
      <Group justify="space-between" spacing="xs" style={{ paddingBottom: "6px" }}>
        <Group>
          <Button onClick={clearCheck}>{isListChange ? "取消" : "選擇"}</Button>
          {isListChange && <Button onClick={onSubmit}>刪除</Button>}
        </Group>
        <Group>
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
              <Table.Th>倉庫商品</Table.Th>
              <Table.Th>貨號</Table.Th>
              <Table.Th>條碼</Table.Th>
              <Table.Th>成本價</Table.Th>
              <Table.Th>預設倉庫</Table.Th>
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


export default InventoryTable;
