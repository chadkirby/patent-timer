import './style.css'
import { handleDateSubmit, loadSavedDate } from './patentTimer.ts'

// Create the app HTML structure
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Patent Deadline Tracker</h1>

    <form id="filing-date-form">
      <label for="filing-date">Enter Provisional Filing Date:</label>
      <div class="input-group">
        <input type="date" id="filing-date" required>
        <button type="submit" id="set-date-btn">SET</button>
      </div>
    </form>

    <div id="result-container" class="result-container">
      <h2>NON-PROVISIONAL DUE</h2>
      <p id="deadline-date"></p>
      <p class="deadline-time">11:59:59 PM Eastern</p>

      <h3>TIME REMAINING</h3>

      <div class="seconds-container">
        <div class="seconds-display">
          <span id="seconds-remaining"></span>
        </div>
        <p class="seconds-label">SECONDS</p>
      </div>

      <p id="formatted-time" class="formatted-time"></p>
    </div>

    <p class="disclaimer">⚠️ Always verify deadlines independently with USPTO</p>
  </div>
`

// Get DOM elements
const filingDateForm = document.getElementById('filing-date-form') as HTMLFormElement;
const filingDateInput = document.getElementById('filing-date') as HTMLInputElement;
const deadlineDateElement = document.getElementById('deadline-date') as HTMLElement;
const secondsRemainingElement = document.getElementById('seconds-remaining') as HTMLElement;
const formattedTimeElement = document.getElementById('formatted-time') as HTMLElement;
const resultContainer = document.getElementById('result-container') as HTMLElement;

// Hide result container initially
resultContainer.style.display = 'none';

// Load saved date if available
loadSavedDate(filingDateInput);

// Add event listener to form
filingDateForm.addEventListener('submit', (event) => {
  handleDateSubmit(
    event,
    filingDateInput,
    deadlineDateElement,
    secondsRemainingElement,
    formattedTimeElement,
    resultContainer
  );
});

// If there's a saved date, trigger the form submission to show the countdown
if (filingDateInput.value) {
  filingDateForm.dispatchEvent(new Event('submit'));
}
