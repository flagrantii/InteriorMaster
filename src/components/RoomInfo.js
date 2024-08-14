import React from 'react';
import { MAX_CELL_SIZE, MIN_CELL_SIZE } from '../config/config';

const RoomInfo = ({ room, cellSize, setCellSize }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
      <p className="mb-4 text-gray-700">{room.description}</p>
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="range"
          min={MIN_CELL_SIZE}
          max={MAX_CELL_SIZE}
          value={cellSize}
          onChange={(e) => setCellSize(Number(e.target.value))}
          className="w-48"
        />
      </div>
    </>
  );
};

export default RoomInfo;
