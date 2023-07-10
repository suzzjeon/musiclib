import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <StLayout>{children}</StLayout>
    </>
  );
};

export default Layout;

const StLayout = styled.div`
  height: calc(100vh - 45px);
  padding: 24px;
`;
