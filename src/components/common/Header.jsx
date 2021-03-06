import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Link to="/">
          <h1>Mr.Camel</h1>
        </Link>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 498px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.background};
  box-shadow: rgba(0, 0, 0, 0.08) 0 4px 2px -2px;
  z-index: 10;

  h1 {
    color: ${({ theme }) => theme.color.font};
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export default Header;
