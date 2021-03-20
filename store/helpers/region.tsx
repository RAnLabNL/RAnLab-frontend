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

/**
 * Gets a region's name by an ID
 * @param id Region ID
 * @param regions All regions from state
 * @returns Region name
 */
export const getRegionNameById = (
  id: string,
  regions: Region[]
): string => {
  const filteredRegions = regions.filter(region => {
    return region.id === id;
  });

  if (!filteredRegions.length) {
    console.error(new Error(`Region ID ${id} does not exist`));
  }

  return filteredRegions.length ? filteredRegions[0].name : '';
};
