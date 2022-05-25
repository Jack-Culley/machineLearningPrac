import React from 'react';
import { useDispatch } from 'react-redux';
import Urls from './Urls';
import Layout from './components/Layout';
import { connect } from 'react-redux';
import * as actions from './store/authActions';

function App({store}) {

    const dispatch = useDispatch();

    // Similar to componentDidMount and componentDidUpdate:
    React.useEffect(() => {
      dispatch(actions.authCheckState())
    }, [store]);

  return (
    <div className="App">
      <Layout >
        <Urls />
      </Layout>
    </div>
  );
}

export default connect(null, null)(App);
