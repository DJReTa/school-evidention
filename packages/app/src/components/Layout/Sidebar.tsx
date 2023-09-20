import { SidebarProps, WrapperProps } from "@/types";
import { Icon } from "semantic-ui-react";
import type { SemanticICONS } from "semantic-ui-react";
import styled from "styled-components";

const navigation = [{ text: "Home", link: "/", icon: "home" }];

const Sidebar = ({ toggleButton }: SidebarProps) => {
  return (
    <Wrapper toggleButton={toggleButton}>
      <ul>
        {navigation.map((item) => (
          <li key={item.text}>
            <a>
              <span className="icon">
                <Icon name={item.icon as SemanticICONS} />
              </span>
              <span className="title">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  left: var(--margin);
  bottom: var(--margin);
  top: 90px;
  background: var(--secondary-color);
  border-bottom-left-radius: 20px;
  transition: 0.4s;
  overflow: auto;
  width: ${({ toggleButton }) =>
    toggleButton ? "90px !important" : "220px !important"};

  & ul {
    list-style: none;
    text-decoration: none;
  }

  & ul li:hover {
    background: rgba(0, 0, 0, 0.1);
    border-left: var(--primary-color) solid 5px;
    cursor: pointer;
  }

  & ul li a span.icon {
    ${({ toggleButton }) =>
      toggleButton
        ? `
        margin: 0;
        text-align: center;
        font-size: 1.5rem;
      `
        : `
        margin-right: 10px;
        display: inline-block;
      `};
  }

  & ul li a span.title {
    ${({ toggleButton }) =>
      toggleButton
        ? `
        font-size: 0.8rem;
        text-align: center;
      `
        : `
        display: inline-block;
      `};
  }

  & ul li a {
    display: flex;
    flex-direction: ${({ toggleButton }) => (toggleButton ? "column" : "row")};
    color: var(--primary-text-color);
    font-size: 1.2rem;
    padding: 1rem;
    font-weight: 600;
    margin-bottom: 1px;
    text-align: left;
    ${({ toggleButton }) =>
      toggleButton &&
      `
        align-content: center;
        justify-content: center;
    `};
  }
`;

export default Sidebar;
