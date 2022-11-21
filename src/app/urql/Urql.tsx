import React, {useState} from 'react'
import {useUpdate, useRendersCount} from 'react-use';
import {Provider} from 'urql';
import client from './client';
import Count from './Count';
import Numbers from './Numbers';
import Sum from './Sum';

function App() {
  const [showSum, setShowSum] = useState(false);
  const onUpdate = useUpdate();
  const count = useRendersCount();

  return (
    <>
      <code>
        sum(<Numbers
          onFocus={() => setShowSum(false)}
          onUpdate={() => setShowSum(true)}
        />)
        {showSum && (
          <>
            {' = '}
            <Sum />
          </>
        )}
      </code>
      <input
        className="render"
        type="button"
        value={`Render ${count}`}
        onClick={onUpdate}
      />
      <Count />
    </>
  );
};

function Wrapper() {
  return (
    <Provider value={client()}>
      <App />
    </Provider >
  )
};

export default Wrapper;
