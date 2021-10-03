import { useState, useEffect } from 'react';
import DataContext from './Context';
import BlocksOne from './BlocksOne';
import BlocksTwo from './BlocksTwo';
// import FontsBlock from './FontsBlock';
import { fetchAPI } from '../utils/common';
import worker from './worker';
import WebWorker from './workerSetup';
import './Blocks.css';

const Blocks = () => {
  const [workerData, setWorkerData] = useState();
  const [connectionData, setConnectionData] = useState('');

  useEffect(() => {
    const w = new WebWorker(worker);
    w.onmessage = (event) => {
      setWorkerData(event.data);
      fetchAPI(setConnectionData);
    };
  }, []);
  return (
    <>
      {connectionData ? (
        <DataContext.Provider value={{ workerData, connectionData }}>
          <div className="centerBlockInner">
            <BlocksOne />
          </div>
          <div className="centerBlockInner">
            <BlocksTwo />
          </div>
          <div className="centerBlockMobile">
            <BlocksOne />
            <BlocksTwo />
          </div>
        </DataContext.Provider>
      ) : (
        <div className="contentBlock loadBlock">
          <center>Loading...</center>
        </div>
      )}
    </>
  );
};

export default Blocks;
