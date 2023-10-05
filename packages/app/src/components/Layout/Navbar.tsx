import { useMessageContext } from "@/context/MessageContext";
import { useUserProfileContext } from "@/context/UserProfileContext";
import type { NavbarProps } from "@/types";
import cookies from "@/utils/cookieUtils";
import { useRouter } from "next/router";
import { Icon, Image } from "semantic-ui-react";
import styled from "styled-components";

const Navbar = ({ toggleButton, setToggleButton }: NavbarProps) => {
  const { userProfile } = useUserProfileContext();
  const { setSuccessMessage } = useMessageContext();
  const router = useRouter();
  return (
    <Wrapper>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Hamburger onClick={() => setToggleButton(!toggleButton)}>
          <div />
          <div />
          <div />
        </Hamburger>
        <Logo>
          <a>Evidention</a>
        </Logo>
      </div>
      <div style={{ display: "flex", flexFlow: "row" }}>
        <div style={{ display: "flex", flexFlow: "row" }}>
          <Image
            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=2000"
            style={{ width: "3em", height: "3em" }}
            className="ui avatar  image"
          />
          <div style={{ display: "flex", flexFlow: "column" }}>
            <span style={{ color: "#fff" }}>
              <h3>{userProfile?.fullName}</h3>
            </span>
            <span style={{ color: "#fff" }}>
              <Icon name="circle" /> {userProfile?.status}
            </span>
          </div>
        </div>
        <LogoutWrapper
          onClick={() => {
            cookies.remove("token");
            router.push("/login");
            setSuccessMessage("You have successfully logged out!");
          }}
        >
          <Icon name="log out" />
        </LogoutWrapper>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: var(--top-nav-height);
  justify-content: space-between;
  align-items: center;
  background: var(--primary-color);
  border-top-left-radius: var(--margin);
  border-top-right-radius: var(--margin);
  position: fixed;
  top: var(--margin);
  right: var(--margin);
  left: var(--margin);
  transition: all 0.3s ease;
`;

const Hamburger = styled.div`
  height: 100%;
  width: 70px;
  cursor: pointer;
  padding: 15px;
  & div {
    width: 100%;
    height: 4px;
    background: #ffffff;
    border-radius: 7px;
    margin: 7px 0;
  }
`;

const Logo = styled.div`
  & a {
    color: #ffffff !important;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const LogoutWrapper = styled.div`
  & i {
    width: 40px !important;
    height: 40px !important;
    text-align: center;
    line-height: 40px !important;
    font-size: 1.2rem !important;
    color: #ffffff;
    border-radius: 50%;
    border: 1px solid #ffffff;
    margin: 0 15px !important;
    cursor: pointer;
  }
  & i:hover {
    color: var(--primary-color);
    background: #ffffff;
  }
`;

export default Navbar;
