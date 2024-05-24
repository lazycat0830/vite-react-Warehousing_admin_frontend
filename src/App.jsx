import React from 'react';
import {  RouterProvider  } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import {router} from './routes'
import { theme } from './styles'
import { Provider } from "react-redux";
import store from "./store";

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';



 function App() {
  return (
    <Provider store={store}>
    <MantineProvider>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    </MantineProvider>
    </Provider>
  )
}

export default App;