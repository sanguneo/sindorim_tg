import React, { useEffect } from 'react';

import { CommonContainer } from '@/shared/styles/pages';
import { Link } from 'react-router-dom';

const Home = (): React.ReactElement => {
  return (
    <CommonContainer>
      <h1>토니앤가이 신도림점 운영도구</h1>
      <Link to="/popcover">인기스타일 만들기</Link>
    </CommonContainer>
  );
};

export default Home;
