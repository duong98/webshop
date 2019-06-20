import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import defaultTheme from "App/theme/default";
import overrides from "App/theme/overrides";

const theme = createMuiTheme({ ...defaultTheme, ...overrides });

export default function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
