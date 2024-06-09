import { mount } from "dashboardApp/Dashboard"; // this means we load up the remoteEntry file for auth project and associated js code with it
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
