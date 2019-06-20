import React, { useState } from "react";

import NavigatorContext from "Layout/Navigator/context";
import Topbar from "Layout/Navigator/Topbar";
import Sidebar from "Layout/Navigator/Sidebar";

export default function AppNavigator() {
  const [drawerExpand, setDrawerExpand] = useState(true);

  function onToggleDrawer() {
    setDrawerExpand(!drawerExpand);
  }

  const context = { drawerExpand, onToggleDrawer };
  return (
    <NavigatorContext.Provider value={context}>
      <Topbar />
      <Sidebar />
    </NavigatorContext.Provider>
  );
}
