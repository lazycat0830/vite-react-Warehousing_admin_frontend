import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Card,
  Group,
  Image,
  Text,
  ScrollArea,
  Stack,
  Menu,
  Grid,
  Avatar,
  UnstyledButton,
  NumberFormatter,
  Popover,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

const BuyProductList = ({ buyProduct = [], cancelProduct, editProNum }) => {
  const [openEdit, setOpenEdit] = useState(false);
  // console.log(buyProduct);
  return (
    <ScrollArea
      pt={10}
      h={350}
      scrollbars="y"
      style={{ borderBottom: "1px solid #ddd" }}
    >
      <Stack align="stretch" justify="flex-start" gap="md">
        {_.map(buyProduct, (buyPro) => (
          <Menu shadow="md" width={200} key={buyPro.inf_id}>
            <Menu.Target>
              <UnstyledButton style={{ width: "100%" }}>
                <Group justify="space-between" mr={24} ml={20}>
                  <Group>
                    <Avatar
                      size={40}
                      color="blue"
                      radius="sm"
                      src={`https://placehold.co/600x400?text=${
                        buyPro.pro_homemadeName
                          ? buyPro.pro_homemadeName
                          : buyPro.pro_comName
                      }`}
                    ></Avatar>
                    <div>
                      <Text>
                        {`${
                          !buyPro.pro_homemadeName
                            ? buyPro.pro_comName
                            : buyPro.pro_homemadeName
                        }　` +
                          `${buyPro.pro_color ? buyPro.pro_color : ""} ${
                            buyPro.pro_size ? buyPro.pro_size : ""
                          }`}
                      </Text>
                      <Text size="xs" color="dimmed">
                        庫存數量 {buyPro.pro_quantity}
                      </Text>
                    </div>
                  </Group>
                  <Group>
                    <NumberFormatter
                      prefix="$ "
                      value={buyPro.pro_price * buyPro.num}
                      thousandSeparator
                    ></NumberFormatter>
                    <Text size="xl" ml={12}>
                      {buyPro.num}
                    </Text>
                    {/* {openEdit ? (
                      <Group>
                        <NumberInput
                          hideControls
                          value={buyPro.num}
                          min={0}
                          step={2}
                          styles={{ input: { width: 54, textAlign: "center" } }}
                        />
                        <ActionIcon
                          onClick={
                            (() => editProNum(buyPro, buyPro.num),
                            () => setOpenEdit(false))
                          }
                        >
                          <Icon icon={faCheck} />
                        </ActionIcon>
                      </Group>
                    ) : (
                      <Text size="xl" ml={12}>
                        {buyPro.num}
                      </Text>
                    )} */}
                  </Group>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>折扣</Menu.Item>
              <Menu.Item onClick={() => setOpenEdit(true)}>修改數量</Menu.Item>
              <Menu.Item onClick={() => cancelProduct(buyPro)}>取消</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ))}
      </Stack>
    </ScrollArea>
  );
};

export default BuyProductList;
