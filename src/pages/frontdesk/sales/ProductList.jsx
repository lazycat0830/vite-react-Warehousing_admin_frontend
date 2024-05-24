import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Card, Image, Text, ScrollArea, SimpleGrid, Menu,Grid  } from "@mantine/core";

const colList=[
  { maxWidth: 1440, cols: 3, spacing: "md" },
  { maxWidth: 755, cols: 2, spacing: "sm" },
  { maxWidth: 425, cols: 1, spacing: "sm" },
]

const ProductList = ({rows = []}) => {
  return (
    <ScrollArea style={{ height: "75vh" }}>
      <Grid >
        {_.map([1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], (i, index) => (
          <Grid.Col span={{base: 12, xs: 12, sm: 4, lg: 4,xl:3 }} key={index}>
            <Menu offset={2} position="Bottom">
            <Menu.Target>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                pb={6}
                style={{ cursor: "pointer" }}
              >
                <Card.Section>
                  <div>
                    <Image
                      fit="scale-down"
                      src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                      height={150}
                      alt="No way!"
                      fallbackSrc={`https://placehold.co/600x400?text=${1}`}
                    />
                  </div>
                </Card.Section>

                <Text weight={500} size="lg" mt={6} ta="center">
                  代號
                </Text>
              </Card>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item color="red">紅色 41</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          </Grid.Col>
        ))}
      </Grid>
    </ScrollArea>
  );
};



export default ProductList;
