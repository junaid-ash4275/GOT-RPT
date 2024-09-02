// utils/dateUtils.js
import moment from "moment";

/**
 * Formats a date to YYYY-MM-DD.
 * @param {Date | string | moment.Moment} date - The date to format.
 * @returns {string} - The formatted date.
 */
export const formatDate = (date) => {
  if (!date) return "";
  return moment(date).format("YYYY-MM-DD");
};
