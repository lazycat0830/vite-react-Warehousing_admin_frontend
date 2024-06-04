import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Card, Image, Text, ScrollArea, SimpleGrid, Menu,Grid  } from "@mantine/core";

const colList=[
  { maxWidth: 1440, cols: 3, spacing: "md" },
  { maxWidth: 755, cols: 2, spacing: "sm" },
  { maxWidth: 425, cols: 1, spacing: "sm" },
]

const ProductList = ({rows = [],getProduct}) => {

  return (
    <ScrollArea style={{ height: "75vh" }} scrollbars="y">
      <Grid pt={10}>
        {_.map(rows, (row, index) => (
          <Grid.Col span={{base: 12, xs: 12, sm: 4, lg: 4,xl:3 }} key={row.pro_id}>
            {row.data.length>1 ?(
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
                        src={row.pro_img}
                        height={150}
                        alt="No way!"
                        fallbackSrc={`https://placehold.co/600x400?text=${row.pro_homemadeName?row.pro_homemadeName:row.pro_comName}`}
                      />
                    </div>
                  </Card.Section>
  
                  <Text weight={500} size="lg" mt={6} ta="center">
                    {row.pro_homemadeName?row.pro_homemadeName:row.pro_comName}
                  </Text>
                </Card>
              </Menu.Target>
                <Menu.Dropdown>
                {(row.data.length>1) &&
                  _.map(row.data,(item)=>(
                    <Menu.Item onClick={()=>getProduct(item)} color="red" key={item.inf_id}>{`${item.pro_color}-${item.pro_size}`}</Menu.Item>
                  ))
                }
                </Menu.Dropdown>
            </Menu>
            ):(
              <Card
                  onClick={()=>getProduct(row.data[0])}
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
                        src={row.pro_img}
                        height={150}
                        alt="No way!"
                        fallbackSrc={`https://placehold.co/600x400?text=${row.pro_homemadeName?row.pro_homemadeName:row.pro_comName}`}
                      />
                    </div>
                  </Card.Section>
  
                  <Text weight={500} size="lg" mt={6} ta="center">
                    {row.pro_homemadeName?row.pro_homemadeName:row.pro_comName}
                  </Text>
                </Card>
            )}
            {/* <Menu offset={2} position="Bottom">
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
                      src={row.pro_img}
                      height={150}
                      alt="No way!"
                      fallbackSrc={`https://placehold.co/600x400?text=${row.pro_homemadeName?row.pro_homemadeName:row.pro_comName}`}
                    />
                  </div>
                </Card.Section>

                <Text weight={500} size="lg" mt={6} ta="center">
                  {row.pro_homemadeName?row.pro_homemadeName:row.pro_comName}
                </Text>
              </Card>
            </Menu.Target>
              <Menu.Dropdown>
              {(row.data.length>1) &&
                _.map(row.data,(item)=>(
                  <Menu.Item onClick={()=>getProduct(item)} color="red" key={item.inf_id}>{`${item.pro_color}-${item.pro_size}`}</Menu.Item>
                ))
              }
               {(row.data.length===1) &&
                 <Menu.Item color="red">{`${row.pro_homemadeName?row.pro_homemadeName:row.pro_comName}`}</Menu.Item>
              }
              
              </Menu.Dropdown>
          </Menu> */}
          </Grid.Col>
        ))}
      </Grid>
    </ScrollArea>
  );
};



export default ProductList;
