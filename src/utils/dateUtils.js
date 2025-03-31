import { format, formatDistance, addDays, isAfter } from 'date-fns';
import { locations } from './config';

// Simple function to get the current time in a specific timezone
export const getCurrentTimeInTimezone = (timezone) => {
  // This returns the local date object, but when displayed it will respect the timezone
  return new Date();
};

export const formatTimeForTimezone = (date, timezone, formatStr = 'HH:mm') => {
  // Format the time according to the specified timezone
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: timezone
    }).format(date);
  } catch (error) {
    console.error('Error formatting time:', error);
    return format(date, formatStr); // Fallback to date-fns without timezone
  }
};

export const getDateForTimezone = (timezone, formatStr = 'yyyy-MM-dd') => {
  const now = new Date();
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: timezone
    }).format(now);
  } catch (error) {
    console.error('Error formatting date:', error);
    return format(now, formatStr); // Fallback to date-fns without timezone
  }
};

export const getMidnightForTimezone = (timezone) => {
  // Get current date in the specified timezone
  const now = new Date();
  // Create a new date set to midnight
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);
  
  // If it's already past midnight, get the next day's midnight
  if (isAfter(now, midnight)) {
    return addDays(midnight, 1);
  }
  
  return midnight;
};

export const getTimeUntilMidnight = (timezone) => {
  const now = new Date();
  const midnight = getMidnightForTimezone(timezone);
  return formatDistance(midnight, now);
};

export const isDaytime = (timezone) => {
  // Get the hours in the specified timezone
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: timezone
    });
    const hours = parseInt(formatter.format(new Date()), 10);
    return hours >= 6 && hours < 18;
  } catch (error) {
    console.error('Error determining daytime:', error);
    // Fallback to local time
    const hours = new Date().getHours();
    return hours >= 6 && hours < 18;
  }
};

export const getTimeDifference = (timezoneA, timezoneB) => {
  // This is a simplified approach that doesn't account for DST and other complexities
  try {
    const formatterA = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: timezoneA
    });
    const formatterB = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: timezoneB
    });
    
    const hoursA = parseInt(formatterA.format(new Date()), 10);
    const hoursB = parseInt(formatterB.format(new Date()), 10);
    
    return hoursA - hoursB;
  } catch (error) {
    console.error('Error calculating time difference:', error);
    return 0; // Fallback
  }
}; 