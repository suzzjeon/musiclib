import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <HomeIcon
        size="24"
        onClick={() => {
          navigate("/");
        }}
      />
      <StTitle>musiclib</StTitle>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.header`
  display: flex;
  justyfy: space-between;
  height: 45px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 0 12px;
`;

const StTitle = styled.div`
  font-size: 24px;
`;
