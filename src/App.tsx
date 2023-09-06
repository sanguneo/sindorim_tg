import CustomRouter from '@/Routes';
import { Global } from '@emotion/react';
import { GlobalStyles } from '@/shared/styles';
import React from 'react';

const App = (): React.ReactElement => {
  const env = process.env.NODE_ENV;
  return (<>
      <Global styles={GlobalStyles} />
      <CustomRouter />
    </>);
};

export default App;
