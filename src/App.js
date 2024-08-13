import React from 'react';
import { GridDisplay } from './components/GridDisplay';
import data from './data/room.json';

function App() {
  return (
    <div >
      <GridDisplay room={data.room} />
    </div>
  );
}

export default App;
