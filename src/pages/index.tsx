import React, { useEffect } from 'react';
import { getExampleState, setExampleState } from '@/shared/constants/pages';

import { CommonContainer } from '@/shared/styles/pages';
import { Link } from 'react-router-dom';
import { useExampleStore } from '@/stores/useExampleStore';

const Home = (): React.ReactElement => {
  const example = useExampleStore(getExampleState);
  const setExample = useExampleStore(setExampleState);
  useEffect(() => setExample('Durian Vite exmaple'), []);
  return (
    <CommonContainer>
      <h1>{example}</h1>
      <Link to="/validation">Validation Example</Link>
    </CommonContainer>
  );
};

export default Home;
