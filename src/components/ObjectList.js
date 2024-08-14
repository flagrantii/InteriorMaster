import React from 'react';

const ObjectList = ({ objects, selectedObject, setSelectedObject, objectColorMap }) => {
    return (
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2">Room Objects</h3>
        <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '600px' }}>
          {objects.map((obj) => (
            <div
              key={obj.name}
              className={`flex items-center p-2 rounded border-2 ${
                obj === selectedObject ? 'border-blue-500 bg-blue-100' : 'border-transparent hover:bg-gray-200'
              } cursor-pointer transition`}
              onClick={() => setSelectedObject(obj)}
            >
              <div
                className={`w-4 h-4 mr-2 rounded`}
                style={{ backgroundColor: objectColorMap[obj.name] }}
              ></div>
              <span className="text-gray-800">{obj.name}</span>
              {obj.isClosetoWall && (
                <span className="ml-2 text-xs text-gray-500">(Wall adjacent)</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default ObjectList;
