import { addYears, differenceInSeconds, format, isPast, isValid } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

// Eastern Time Zone
const EASTERN_TIMEZONE = 'America/New_York';

// Interface for time remaining
interface TimeRemaining {
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/**
 * Calculate the non-provisional deadline (1 year from filing date at 11:59:59 PM ET)
 */
export function calculateDeadline(filingDate: Date): Date {
  if (!isValid(filingDate)) {
    throw new Error('Invalid date provided');
  }

  // Add 1 year to the filing date
  const oneYearLater = addYears(filingDate, 1);

  // Create a date object for 11:59:59 PM Eastern Time on the anniversary date
  const easternDate = toZonedTime(oneYearLater, EASTERN_TIMEZONE);

  // Set the time to 11:59:59 PM
  easternDate.setHours(23, 59, 59, 999);

  return easternDate;
}

/**
 * Calculate the time remaining until the deadline
 */
export function calculateTimeRemaining(deadline: Date): TimeRemaining {
  const now = new Date();
  const nowInEastern = toZonedTime(now, EASTERN_TIMEZONE);

  // Check if deadline has passed
  const deadlinePassed = isPast(deadline);

  // Calculate total seconds remaining (or passed)
  const totalSeconds = deadlinePassed
    ? 0
    : Math.max(0, differenceInSeconds(deadline, nowInEastern));

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    totalSeconds,
    days,
    hours,
    minutes,
    seconds,
    isPast: deadlinePassed
  };
}

/**
 * Format the deadline date for display
 */
export function formatDeadlineDate(deadline: Date): string {
  return formatInTimeZone(deadline, EASTERN_TIMEZONE, 'MMMM d, yyyy');
}

/**
 * Format the time remaining for display
 */
export function formatTimeRemaining(timeRemaining: TimeRemaining): string {
  if (timeRemaining.isPast) {
    return 'DEADLINE EXPIRED';
  }

  return `${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes`;
}

/**
 * Update the countdown display
 */
export function updateCountdown(
  deadline: Date,
  secondsElement: HTMLElement,
  formattedTimeElement: HTMLElement
): void {
  const timeRemaining = calculateTimeRemaining(deadline);

  // Update seconds display
  secondsElement.textContent = timeRemaining.isPast
    ? 'EXPIRED'
    : timeRemaining.totalSeconds.toLocaleString();

  // Update formatted time display
  formattedTimeElement.textContent = `[ ${formatTimeRemaining(timeRemaining)} ]`;

  // Add expired class if deadline has passed
  if (timeRemaining.isPast) {
    secondsElement.classList.add('expired');
    formattedTimeElement.classList.add('expired');
  } else {
    secondsElement.classList.remove('expired');
    formattedTimeElement.classList.remove('expired');
  }
}

/**
 * Initialize the countdown timer
 */
export function initializeCountdown(
  deadlineDate: Date,
  deadlineDateElement: HTMLElement,
  secondsElement: HTMLElement,
  formattedTimeElement: HTMLElement
): void {
  // Set the deadline date display
  deadlineDateElement.textContent = formatDeadlineDate(deadlineDate);

  // Update countdown immediately
  updateCountdown(deadlineDate, secondsElement, formattedTimeElement);

  // Update countdown every second
  setInterval(() => {
    updateCountdown(deadlineDate, secondsElement, formattedTimeElement);
  }, 1000);
}

/**
 * Handle form submission
 */
export function handleDateSubmit(
  event: Event,
  dateInput: HTMLInputElement,
  deadlineDateElement: HTMLElement,
  secondsElement: HTMLElement,
  formattedTimeElement: HTMLElement,
  resultContainer: HTMLElement
): void {
  event.preventDefault();

  try {
    // Get the filing date from the input
    const filingDateStr = dateInput.value;
    const filingDate = new Date(filingDateStr);

    // Validate the date
    if (!isValid(filingDate)) {
      throw new Error('Please enter a valid date');
    }

    // Calculate the deadline
    const deadline = calculateDeadline(filingDate);

    // Show the result container
    resultContainer.style.display = 'block';

    // Initialize the countdown
    initializeCountdown(deadline, deadlineDateElement, secondsElement, formattedTimeElement);

    // Save the filing date to localStorage for persistence
    localStorage.setItem('filingDate', filingDateStr);
  } catch (error) {
    alert(error instanceof Error ? error.message : 'An error occurred');
  }
}

/**
 * Load saved filing date from localStorage
 */
export function loadSavedDate(dateInput: HTMLInputElement): void {
  const savedDate = localStorage.getItem('filingDate');
  if (savedDate) {
    dateInput.value = savedDate;
  }
}
