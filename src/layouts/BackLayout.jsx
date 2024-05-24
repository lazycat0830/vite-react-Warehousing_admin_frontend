/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  Text,
  Menu,
  ScrollArea,
  NavLink,
  UnstyledButton,
  Group,
  Avatar,
  Burger,
  AppShell,
  Button
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications";
import {
  faUserAlt,
  faAngleLeft,
  faAngleRight,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {Outlet,useNavigate} from "react-router-dom";

import { getToken, setToken } from "../utils/token";

import menu from "../utils/menu";
import "./BackLayout.scss";


const BackLayout = (props) => {
  const navigate = useNavigate();
  const { Name, Process, RoleID } = getToken();
  const [count, setCount] = useState(0);
  const [printMenu, setPrintMenu] = useState(_.cloneDeep(menu));
//   const [opened, setOpened] = useState(false);
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  useEffect(() => {
    // handleGetItem(); // Get token
    document.documentElement.style.setProperty("--mixin-color", "#199fb1");
    const tempMenu = _.cloneDeep(menu);
    _.map(tempMenu, (item, itemIndex) => {
      if (item.useable) {
        _.map(item.children, (child, childIndex) => {
          tempMenu[itemIndex].useable = true;
          tempMenu[itemIndex].children[childIndex].useable = true;
        });
      }
    });
    props.SAVE_MenuState(tempMenu);
    setPrintMenu(tempMenu);
  }, []);

  // const handleGetItem = () => {
  //   const request = {
  //     method: "getItem",
  //     path: path,
  //   };

  //   window.addEventListener("message", (e) => {
  //     const middletoken = _.get(e.data, "token", undefined);
  //     if (
  //       e.data === "start" &&
  //       props.history.location.search !== "?login=true"
  //     ) {
  //     } else if (!_.isUndefined(middletoken)) {
  //       setToken(middletoken);
  //       setCount(count + 1);
  //     }
  //   });
  // };

  return (
    <div id="Layout" className="layout" style={{ flexDirection: "row" }}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: '1000',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
         <AppShell.Header>
         <Group h="100%" px="md" justify="space-between">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" />
          KMJ 後台
              <Button
                onClick={() => navigate("/frontdesk/SalesInerface")}
              >
                前往前台<Icon icon={faAngleRight}></Icon>
              </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section grow component={ScrollArea} >
        {_.map(printMenu, (m, index) => {
                if (m.useable) {
                  if (m.children.length === 1) {
                    return (
                      <NavLink
                        pt={12}
                        pb={12}
                        key={index}
                        label={m.title}
                        leftSection={<Icon icon={m.icon}></Icon>}
                        onClick={() => {
                          navigate(m.path)
                          
                        }}
                      />
                    );
                  }
                  return (
                    <NavLink
                      pt={12}
                      pb={12}
                      key={index}
                      label={m.title}
                      childrenOffset={28}
                      leftSection={<Icon icon={m.icon}></Icon>}
                    >
                      {_.map(m.children, (children, i) => {
                        return (
                          <NavLink
                            pt={12}
                            pb={12}
                            key={`chin${i}`}
                            label={children.title}
                            onClick={() => {
                              navigate(children.path)
                              
                            }}
                          />
                        );
                      })}
                    </NavLink>
                  );
                }
        })}
        </AppShell.Section>
        <AppShell.Section>
        <Menu position="right-end" offset={0} arrowPosition="center">
                <Menu.Target>
                  <UnstyledButton style={{ width: "100%" }}>
                    <Group>
                      <Avatar size={40} color="blue" radius="sm">
                        {Name[0]}
                      </Avatar>
                      <div>
                        <Text>{Name}</Text>
                        <Text size="xs" color="dimmed">
                          {RoleID}
                        </Text>
                      </div>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => {
                      console.log("個人資料");
                    }}
                  >
                    個人資料
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      console.log("更改密碼");
                    }}
                  >
                    更改密碼
                  </Menu.Item>
                  <Menu.Item onClick={() => console.log("logout")}>登出</Menu.Item>
                </Menu.Dropdown>
              </Menu>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
            <Outlet />
        </AppShell.Main>
        
      </AppShell>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Message: _.get(state, "global.Message", false),
    CleanMessage: _.get(state, "global.CleanMessage", false),
    Marquee: _.get(state, "global.Marquee", []),
    PersonalBulletin: _.get(state, "global.PersonalBulletin", []),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_Marquee(payload) {
      dispatch({ type: "GET_Marquee", payload });
    },
    GoOtherWindow(path) {
      dispatch({ type: "GoOtherWindow", path });
    },
    SAVE_MenuState(payload) {
      dispatch({ type: "SAVE_MenuState", payload });
    },
    SAVE_Message(payload) {
      dispatch({ type: "SAVE_Message", payload });
    },
    CLEAN_Message(payload) {
      dispatch({ type: "CLEAN_Message", payload });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BackLayout);
