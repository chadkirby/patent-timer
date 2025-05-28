# Patent Filing Countdown Timer

## Background
The United States Patent and Trademark Office (USPTO) is the federal agency that grants patents. Patent attorneys often file a simple "provisional" patent application to establish an early filing date. They then have exactly one year to file a full/formal "non-provisional" application. Missing this 1-year deadline means losing the early filing date and is potential malpractice.

## Assignment Overview
Create a web application that helps patent attorneys track non-provisional deadlines. The application should calculate and display a real-time countdown to a non-provisional patent application deadline.

## Requirements

### Core Functionality
- User enters the filing date of a US provisional patent application
- Application displays a countdown timer showing the exact number of seconds remaining until the non-provisional application deadline
- Timer updates in real-time (every second)
- Display should be clear and professional for legal office use

### Business Rules
- Non-provisional deadline is exactly 1 year from the provisional filing date
- Deadline time is 11:59:59 PM Eastern Time on the anniversary date
- For simplicity, ignore weekends and holidays - treat all days equally

### Comp
```
┌───────────────────────────────────────────────────────────┐
│                   Patent Deadline Tracker                 │
│                                                           │
│  Enter Provisional Filing Date:                           │
│  ┌─────────────┐  ┌──────┐                                │
│  │ 03/15/2024  │  │ SET  │                                │
│  └─────────────┘  └──────┘                                │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           NON-PROVISIONAL DUE                       │  │
│  │              March 15, 2025                         │  │
│  │            11:59:59 PM Eastern                      │  │
│  │                                                     │  │
│  │                 TIME REMAINING                      │  │
│  │                                                     │  │
│  │              ███ 2,847,293 ███                      │  │
│  │                  SECONDS                            │  │
│  │                                                     │  │
│  │          [ 32 days, 23 hours, 1 minute ]            │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ⚠️  Always verify deadlines independently with USPTO     │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Technical Requirements
- Use `moment.js`, `date-fns`, and/or Javascript built-ins for date handling
- Consider timezone handling for users in different locations

### User Experience
- Clean, professional interface suitable for law office environment
- Clear display of remaining time
- Handle edge cases gracefully (past deadlines, invalid dates, etc.)
- Include appropriate disclaimers about checking official deadlines

### Deliverables
- Single HTML file with embedded CSS and JavaScript
- Brief documentation explaining your approach and any assumptions made
- Note any questions or clarifications you would want to discuss with the product team

### Time Estimate
This should take approximately 2-3 hours to complete.
