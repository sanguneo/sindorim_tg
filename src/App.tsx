import CustomRouter from '@/Routes';
import { Global } from '@emotion/react';
import { GlobalStyles } from '@/shared/styles';
import React from 'react';

const App = (): React.ReactElement => {
  return (<>
      <Global styles={GlobalStyles} />
      <CustomRouter />
    </>);
};

export default App;
