import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import api from 'src/common/api';

const cache = new InMemoryCache();
const url = api.backendUrl;
const client = new ApolloClient({ url, cache });

client
  .query({
    query: api.query.CONCERTS,
  })
  .then((result) => console.log(result));

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ApolloProvider client={client}>
        {routing}
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
