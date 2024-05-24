import { RenderOptions, RenderResult, cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { afterEach } from 'vitest';

import { theme } from '../../styles';

afterEach(() => {
  cleanup();
});

const customRender = (ui, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render, userEvent };
