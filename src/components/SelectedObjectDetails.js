import React from 'react';

const SelectedObjectDetails = ({ selectedObject }) => {
  if (!selectedObject) return null;

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">{selectedObject.name}</h3>
      <p className="text-gray-700 mb-2">{selectedObject.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Width: {selectedObject.size?.width || 'N/A'}m</div>
        <div>Depth: {selectedObject.size?.depth || 'N/A'}m</div>
        <div>Height: {selectedObject.size?.height || 'N/A'}m</div>
        <div>Position: ({selectedObject.position?.x || 'N/A'}, {selectedObject.position?.z || 'N/A'})</div>
      </div>
    </div>
  );
};

export default SelectedObjectDetails;
