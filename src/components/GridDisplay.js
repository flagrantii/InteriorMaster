import React, { useState, useMemo } from 'react';
import { OBJECT_COLORS, MIN_CELL_SIZE, MAX_CELL_SIZE, TARGET_GRID_SIZE } from '../config/config';
import Grid from './Grid';
import RoomInfo from './RoomInfo';
import ObjectList from './ObjectList';
import SelectedObjectDetails from './SelectedObjectDetails';

const calculateCellSize = (roomWidth, roomDepth) => {
  const maxDimension = Math.max(roomWidth, roomDepth);
  let cellSize = Math.floor(TARGET_GRID_SIZE / maxDimension);
  return Math.max(MIN_CELL_SIZE, Math.min(cellSize, MAX_CELL_SIZE));
};

const isPositionOccupied = (x, z, objects) => {
  for (const obj of objects) {
    if (obj.type === 'simple') {
      if (
        x >= obj.position.x * 2 &&
        x < obj.position.x * 2 + obj.size.width * 2 &&
        z >= obj.position.z * 2 &&
        z < obj.position.z * 2 + obj.size.depth * 2
      ) {
        return obj;
      }
    } else if (obj.type === 'composite') {
      for (const component of obj.components) {
        if (
          x >= component.position.x * 2 &&
          x < component.position.x * 2 + component.size.width * 2 &&
          z >= component.position.z * 2 &&
          z < component.position.z * 2 + component.size.depth * 2
        ) {
          return obj;
        }
      }
    }
  }
  return null;
};

export const GridDisplay = ({ room }) => {
  const { size: roomSize, objects } = room;
  const gridWidth = roomSize.width * 2;
  const gridDepth = roomSize.depth * 2;

  const [cellSize, setCellSize] = useState(calculateCellSize(gridWidth, gridDepth));
  const [selectedObject, setSelectedObject] = useState(null);

  const objectColorMap = useMemo(() => {
    return objects.reduce((acc, obj, index) => {
      acc[obj.name] = OBJECT_COLORS[index % OBJECT_COLORS.length];
      return acc;
    }, {});
  }, [objects]);

  const handleCellClick = (x, z) => {
    const obj = isPositionOccupied(x, z, objects);
    setSelectedObject(obj || null);
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <RoomInfo room={room} cellSize={cellSize} setCellSize={setCellSize} />
      <div className="flex space-x-4">
        <Grid
          gridWidth={gridWidth}
          gridDepth={gridDepth}
          cellSize={cellSize}
          objectColorMap={objectColorMap}
          objects={objects}
          onCellClick={handleCellClick}
          selectedObject={selectedObject}
        />
        <ObjectList
          objects={objects}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          objectColorMap={objectColorMap}
        />
      </div>
      <SelectedObjectDetails selectedObject={selectedObject} />
    </div>
  );
};
