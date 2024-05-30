import React from "react";
import _ from "lodash";
import {
  Text,
  Fieldset, TextInput,Textarea,Accordion ,
  Card,
  Grid ,
  ActionIcon 
} from "@mantine/core";
import {
  faPlusSquare,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

const Information = () => {
  return (
  <div>
    <Fieldset legend={`店家代號-${'KMJ0220'}`}>
    <Text>主要店家名稱：KMJ</Text>
    </Fieldset>
    <Accordion pt={10} defaultValue={"about"} variant="contained">
    <Accordion.Item  value="about">
    <Accordion.Control >關於我們</Accordion.Control>
    <Accordion.Panel>
    <Textarea placeholder="500字以內" minRows={4}
        maxRows={6}/>
    </Accordion.Panel>
    
    </Accordion.Item>
    <Accordion.Item  value="type">
    <Accordion.Control >商品類型</Accordion.Control>
    <Accordion.Panel>
    <TextInput />
    </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item  value="place">
    <Accordion.Control >地址</Accordion.Control>
    <Accordion.Panel>
      <Grid >
        <Grid.Col span={{ base: 12, md: 6 }}><TextInput label="名稱"/></Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}><TextInput label="地址" rightSection={<ActionIcon variant="filled" aria-label="Settings"><Icon icon={faPlus}/></ActionIcon>}/></Grid.Col>
      </Grid>
    </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item  value="contact">
    <Accordion.Control >聯絡資訊
    </Accordion.Control>
    <Accordion.Panel>
      <TextInput label="電話" placeholder="" />
      <TextInput label="信箱" placeholder="" />
    </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item  value="shop">
    <Accordion.Control >網路商店
    </Accordion.Control>
    <Accordion.Panel>
    <Grid >
        <Grid.Col span={{ base: 12, md: 4 }}><TextInput label="名稱"/></Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}><TextInput label="網址" rightSection={<ActionIcon variant="filled" aria-label="Settings"><Icon icon={faPlus}/></ActionIcon>}/></Grid.Col>
      </Grid>
    </Accordion.Panel>
    </Accordion.Item>
    </Accordion>
  </div>
  );
};

export default Information;
