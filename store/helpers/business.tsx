import {
  RegionBusiness,
  Business,
} from '../types/business';

/**
 * Appends the new business to the previous region
 * or creates a new region instance for the business
 * @param prevBusinesses Previous list of region businesses
 * @param regionId Region ID of new business
 * @param newBusiness New business data
 */
export const getNewBusinesses = (
  prevBusinesses: RegionBusiness,
  regionId: string,
  newBusiness: Business
): RegionBusiness => {
  const newBusinesses: RegionBusiness = prevBusinesses;
  if (prevBusinesses[regionId]) {
    newBusinesses[regionId].push(newBusiness);
  }
  else {
    newBusinesses[regionId] = [newBusiness];
  }
  return newBusinesses;
};
