import {
  AllUsersProfile,
  UserProfile,
} from '../types/user';

/**
 * Appends the new user to the all users list
 * or updates the existing entry
 * @param prevAllUsers Previous list of all users
 * @param newUserId New user ID
 * @param newUserProfile New user profile
 */
export const getNewAllUsers = (
  prevAllUsers: AllUsersProfile,
  newUserId: string,
  newUserProfile: UserProfile,
): AllUsersProfile => {
  const newAllUsers: AllUsersProfile = prevAllUsers;
  newAllUsers[newUserId] = newUserProfile;
  return newAllUsers;
};

/**
 * Gets a user's profile by an ID
 * @param id User ID
 * @param allUsers All users from state
 * @returns User profile
 */
export const getUserProfileById = (
  id: string,
  allUsers: AllUsersProfile,
): UserProfile => {
  if (!allUsers[id]) {
    console.error(new Error(`User ID ${id} does not exist`));
  }

  return allUsers[id] ? allUsers[id] : {};
};
