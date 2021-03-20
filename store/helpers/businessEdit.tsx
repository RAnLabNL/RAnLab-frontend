import { BusinessEdit, Status, StatusBusinessEdit } from '../types/businessEdit';

/**
 * Appends the new business edits to the previous region
 * or creates a new region instance for the business edits
 * @param prevBusinesses Previous list of region business edits
 * @param regionId Region ID of new business edits
 * @param newBusiness New business edits
 */
export const getNewBusinessEdits = (
  prevBusinessEdits: StatusBusinessEdit,
  status: Status,
  newBusinessEdits: BusinessEdit[],
): StatusBusinessEdit => {
  const returnedBusinessEdits: StatusBusinessEdit = prevBusinessEdits;
  let prevBusinessEditIndex = -1;

  if (newBusinessEdits.length === 1) {
    prevBusinessEdits[status].forEach((edit, index) => {
      if (edit.id === newBusinessEdits[0].id) {
        prevBusinessEditIndex = index;
      }
    });

    if (prevBusinessEditIndex > 0) {
      returnedBusinessEdits[status][prevBusinessEditIndex] = newBusinessEdits[0];
    }
    else {
      returnedBusinessEdits[status].unshift(newBusinessEdits[0]);
    }
  }
  else {
    newBusinessEdits.forEach(edit => {
      if (edit.status) {
        returnedBusinessEdits[edit.status].push(edit);
      }
    });
  }

  return returnedBusinessEdits;
};

/**
 * Updates the status of a given business edit
 * @param prevBusinessEdits Previous list of business edits
 * @param businessEdit Updated business edit
 * @param prevStatus Previous status
 * @param newStatus New status
 * @returns New business edits
 */
export const updateBusinessEditStatus = (
  prevBusinessEdits: StatusBusinessEdit,
  businessEdit: BusinessEdit,
  prevStatus: Status,
  newStatus: Status,
): StatusBusinessEdit => {
  const returnedBusinessEdits: StatusBusinessEdit = prevBusinessEdits;

  // Remove from previous status array
  prevBusinessEdits[prevStatus].filter((edit, index) => {
    if (businessEdit.id === edit.id) {
      return returnedBusinessEdits[prevStatus].splice(index, 1);
    }
  });

  // Add to new status array
  returnedBusinessEdits[newStatus].unshift(businessEdit);

  return returnedBusinessEdits;
};
