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
      // Increase count if found
      if (yearFilter.year === newBusiness.year_added) {
        yearFilter.count++;
      }
      return yearFilter.year === newBusiness.year_added;
    });

    // Add new year filter if it doesn't already exist on region
    if (!yearFilterFound.length) {
      newBusinesses[regionId].filters.years.push({
        count: 1,
        year: newBusiness.year_added,
      });
    }

    // Check if industry already exists in industry filters for region
    const industryFilterFound = newBusinesses[regionId].filters.industries.filter(
      industryFilter => {
        // Increase count if found
        if (industryFilter.industry === newBusiness.industry) {
          industryFilter.count++;
        }
        return industryFilter.industry === newBusiness.industry;
      }
    );

    // Add new industry filter if it doesn't already exist on region
    if (!industryFilterFound.length) {
      newBusinesses[regionId].filters.industries.push({
        count: 1,
        industry: newBusiness.industry,
      });
    }
  }
  // If region does not exist
  else {
    newBusinesses[regionId].businesses = [newBusiness];
  }

  return newBusinesses;
};
