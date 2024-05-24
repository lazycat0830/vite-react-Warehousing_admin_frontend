import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Grid,
  Text,
  Group,
  Input,
  Card,
} from "@mantine/core";
import "./SalesInerface.scss";
import ProductList from "./ProductList";

function SalesInerface() {
  return (
    <div id="SalesInerface">
      <Grid style={{ height: "100%" }}>
        <Grid.Col span={{ base: 12, md: 8 }} >
          <Card withBorder  radius="md">
            <Card.Section withBorder inheritPadding py="xs">
              <Group>
                <Text weight={500}>搜尋：</Text>
                <Input placeholder="搜尋" size="xs" />
              </Group>
            </Card.Section>
            <ProductList rows />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4}} style={{ borderLeft: "1px solid #000" }}>
          訂單
        </Grid.Col>
        <div></div>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesInerface);
