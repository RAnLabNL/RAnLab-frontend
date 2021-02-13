import { Region } from '../types/region';

/**
 * Appends the new region to the list of previous regions
 * if not already part of the array
 * @param prevRegions Previous list of regions from state
 * @param newRegion New region to be appended or skipped
 */
export const getNewRegions = (
  prevRegions: Region[],
  newRegion: Region,
): Region[] => {
  const newRegions = prevRegions;
  const existingRegion = prevRegions.filter(region => {
    return region.id === newRegion.id;
  });
  if (!existingRegion.length) {
    newRegions.push(newRegion);
  }
  return newRegions;
};
