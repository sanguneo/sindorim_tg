import React, { useEffect, useRef } from 'react';
import { CommonContainer } from '@/shared/styles/pages';
import PopCoverMaker from '@/components/PopCoverMaker/PopCoverMaker';
import { Link } from 'react-router-dom';

const PopCover = (): React.ReactElement => {
  return (
    <CommonContainer>
      <h1><Link to={'/'}>◀︎</Link> 인기스타일 테두리 만들기</h1>
      <PopCoverMaker />
    </CommonContainer>
  );
};

export default PopCover;
