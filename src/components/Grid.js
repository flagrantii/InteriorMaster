import React from 'react';

const Grid = ({ gridWidth, gridDepth, cellSize, objectColorMap, objects, onCellClick, selectedObject }) => {
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

  const gridItems = Array.from({ length: gridDepth + 1 }, (_, z) =>
    Array.from({ length: gridWidth + 1 }, (_, x) => {
        if (z === 0 && x === 0) {
            return (
              <div
                key={`${x}-${z}`}
                className="bg-gray-200 flex items-center justify-center ml-2"
                style={{
                  width: `${cellSize / 2}px`,
                  height: `${cellSize / 2}px`,
                }}
              />
            );
          }
          if (z === 0) {
            return (
              <div
                key={`${x}-${z}`}
                className="bg-gray-200 flex items-center justify-center font-bold text-xs ml-2"
                style={{
                  width: `${cellSize / 2}px`,
                  height: `${cellSize / 2}px`,
                }}
              >
                {(x - 1) * 0.5}
              </div>
            );
          }
          if (x === 0) {
            return (
              <div
                key={`${x}-${z}`}
                className="bg-gray-200 flex items-center justify-center font-bold text-xs mt-2"
                style={{
                  width: `${cellSize / 2}px`,
                  height: `${cellSize / 2}px`,
                }}
              >
                {(z - 1) * 0.5}
              </div>
            );
          }
      const obj = isPositionOccupied(x - 1, z - 1, objects);
      return (
        <div
          key={`${x}-${z}`}
          className={`
            border border-gray-200
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            hover:shadow-lg hover:z-10 hover:scale-110
            ${obj ? objectColorMap[obj.name] : 'bg-white'}
            ${obj?.name === selectedObject?.name && obj != null ? 'ring-2 ring-blue-500' : ''}
            cursor-pointer
          `}
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            fontSize: `${Math.max(cellSize / 3, 8)}px`,
          }}
          onClick={() => onCellClick(x - 1, z - 1)}
          title={obj ? `${obj.name}: ${obj.description}` : `Empty space (${(x - 1) * 0.5}, ${(z - 1) * 0.5})`}
        >
          {obj && (
            <span className="text-white font-bold">
              {obj.name.charAt(0)}
            </span>
          )}
        </div>
      );
    })
  );

  const gridSizePixels = (gridWidth + 1) * cellSize;

  return (
    <div className="overflow-auto bg-white rounded-lg shadow" style={{ maxWidth: '70%', maxHeight: '70vh' }}>
      <div
        className="grid gap-0.5 bg-gray-200 p-0.5"
        style={{
          gridTemplateColumns: `repeat(${gridWidth + 1}, ${cellSize}px)`,
          width: `${gridSizePixels}px`,
          height: `${(gridDepth + 1) * cellSize}px`,
        }}
      >
        {gridItems.flat()}
      </div>
    </div>
  );
};

export default Grid;
