import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const moveLeftToRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const Container = styled.div`
  height: 30px;
  background-color: #4c0a42;
  color: white;
  display: flex;
  justify-content: center;
  font-weight: 500;
  align-items: center;
`;

const ScrollingTextWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  animation: ${moveLeftToRight} 10s linear infinite;
`;

const Announcement = () => {
  return (
    <div id="announcement-wrapper">
      <Container>
        <ScrollingTextWrapper>
          Super Deal!! Free Shipping on Orders Over $50
        </ScrollingTextWrapper>
      </Container>
    </div>
  );
};

export default Announcement;
