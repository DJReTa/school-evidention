import { LayoutProps, WrapperProps } from "@/types";
import { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: LayoutProps) => {
  const [toggleButton, setToggleButton] = useState(true);

  return (
    <>
      <Sidebar toggleButton={toggleButton} />
      <Navbar toggleButton={toggleButton} setToggleButton={setToggleButton} />
      <Wrapper toggleButton={toggleButton}>{children}</Wrapper>
    </>
  );
};

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 90px;
  left: ${({ toggleButton }) => (toggleButton ? "110px" : "240px")};
  bottom: var(--margin);
  right: var(--margin);
  padding: 2rem 1rem;
  border-bottom-right-radius: 20px;
  transition: all 0.3s ease;
  overflow: auto;
  background: #fff !important;
  & .item {
    margin-bottom: 10px;
    padding: 15px;
    font-size: 14px;
    line-height: 22px;
  }
`;

export default Layout;
