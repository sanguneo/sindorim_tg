import React from 'react';
import styled from '@emotion/styled';

export const CommonContainer = styled.main<React.CSSProperties>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  gap: 30px;
  & > h1 {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  & > a.link {
    display: inline-flex;
    font-size:25px;
    &::after {
      content: '▶︎';
      margin-left: 20px;
    }
    padding: 10px 20px;
    border: 1px solid lightgray;
  }
`;
