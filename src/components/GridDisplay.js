import React, { useMemo } from 'react';
import { CELL_SIZE, OBJECT_COLORS } from '../config/config';

export const GridDisplay = ({ room }) => {
  const { size: roomSize, objects } = room;

  const objectColorMap = useMemo(() => {
    return objects.reduce((acc, obj, index) => {
      acc[obj.name] = OBJECT_COLORS[index % OBJECT_COLORS.length];
      return acc;
    }, {});
  }, [objects]);

  const isPositionOccupied = (x, z, objects) => {
    for (const obj of objects) {
      if (obj.type === 'simple') {
        if (
          x >= obj.position.x &&
          x < obj.position.x + obj.size.width &&
          z >= obj.position.z &&
          z < obj.position.z + obj.size.depth
        ) {
          return obj;
        }
      } else if (obj.type === 'composite') {
        for (const component of obj.components) {
          if (
            x >= component.position.x &&
            x < component.position.x + component.size.width &&
            z >= component.position.z &&
            z < component.position.z + component.size.depth
          ) {
            return obj;
          }
        }
      }
    }
    return null;
  };

  const gridItems = Array.from({ length: roomSize.depth + 1 }, (_, z) =>
    Array.from({ length: roomSize.width + 1 }, (_, x) => {
      if (z === 0 && x === 0) {
        return (
          <div
            key={`${x}-${z}`}
            className="bg-gray-200 flex items-center justify-center"
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
          />
        );
      }
      if (z === 0) {
        return (
          <div
            key={`${x}-${z}`}
            className="bg-gray-200 flex items-center justify-center font-bold text-xs"
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
          >
            {x - 1}
          </div>
        );
      }
      if (x === 0) {
        return (
          <div
            key={`${x}-${z}`}
            className="bg-gray-200 flex items-center justify-center font-bold text-xs"
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
          >
            {z - 1}
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
          `}
          style={{
            width: `${CELL_SIZE}px`,
            height: `${CELL_SIZE}px`,
          }}
          title={obj ? `${obj.name}: ${obj.description}` : `Empty space (${x - 1}, ${z - 1})`}
        >
          {obj && (
            <span className="text-white font-bold text-sm">
              {obj.name.charAt(0)}
            </span>
          )}
        </div>
      );
    })
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
      <p className="mb-4">{room.description}</p>
      <div
        className="grid gap-0.5 bg-gray-200 p-0.5 rounded-lg shadow-xl"
        style={{
          gridTemplateColumns: `repeat(${roomSize.width + 1}, ${CELL_SIZE}px)`,
          width: `${(roomSize.width + 1) * CELL_SIZE + roomSize.width * 2}px`,
        }}
      >
        {gridItems.flat()}
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {objects.map((obj) => (
          <div key={obj.name} className="flex items-center">
            <div
              className={`w-4 h-4 mr-2 ${objectColorMap[obj.name]} rounded`}
            ></div>
            <span>{obj.name}</span>
            {obj.isClosetoWall && (
              <span className="ml-2 text-xs text-gray-500">(Wall adjacent)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};