import React from 'react';

import Icon from './svg/ic_code.svg';

import Scene from './views/Scene';
import Controls from './components/Controls';

import { Canvas, CodeFAB } from './GlobalStyles';

function App() {
  return (
    <>
      <Canvas>
        <Scene />
        <Controls />
      </Canvas>
      <a
        href='https://github.com/manan30/particle-systems'
        target='_blank'
        rel='noopener noreferrer'>
        <CodeFAB src={Icon} />
      </a>
    </>
  );
}

export default App;
