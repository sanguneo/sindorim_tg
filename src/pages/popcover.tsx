import React, { useEffect, useRef } from 'react';
import { CommonContainer } from '@/shared/styles/pages';
import PopCoverMaker from '@/components/PopCoverMaker/PopCoverMaker';

const PopCover = (): React.ReactElement => {
  return (
    <CommonContainer>
      <h1>인기스타일 테두리 만들기</h1>
      <PopCoverMaker />
    </CommonContainer>
  );
};

export default PopCover;
