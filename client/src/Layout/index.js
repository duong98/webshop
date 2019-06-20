import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import AppContent from "Layout/Content";
import AppNavigator from "Layout/Navigator";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppNavigator />
      <AppContent />
    </div>
  );
}
