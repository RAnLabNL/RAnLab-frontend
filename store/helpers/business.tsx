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

  // If region already exists
  if (prevBusinesses[regionId]) {
    newBusinesses[regionId].businesses.push(newBusiness);

    // Check if year already exists in year filters for region
    const yearFilterFound = newBusinesses[regionId].filters.years.filter(yearFilter => {
      return yearFilter === newBusiness.year_added;
    });

    // Add new year filter if it doesn't already exist on region
    if (!yearFilterFound.length) {
      newBusinesses[regionId].filters.years.push(newBusiness.year_added);
    }

    // Check if industry already exists in industry filters for region
    const industryFilterFound = newBusinesses[regionId].filters.industries.filter(
      industryFilter => {
        return industryFilter === newBusiness.industry;
      }
    );

    // Add new industry filter if it doesn't already exist on region
    if (!industryFilterFound.length) {
      newBusinesses[regionId].filters.industries.push(newBusiness.industry);
    }
  }
  // If region does not exist
  else {
    newBusinesses[regionId].businesses = [newBusiness];
  }

  return newBusinesses;
};
