import { MIN_CELL_SIZE, MAX_CELL_SIZE, TARGET_GRID_SIZE  } from '../config/config';

export const calculateCellSize = (roomWidth, roomDepth) => {
    const maxDimension = Math.max(roomWidth, roomDepth);
    let cellSize = Math.floor(TARGET_GRID_SIZE / maxDimension);
    return Math.max(MIN_CELL_SIZE, Math.min(cellSize, MAX_CELL_SIZE));
};