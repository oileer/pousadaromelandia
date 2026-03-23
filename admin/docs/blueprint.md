# **App Name**: Inn Keeper

## Core Features:

- Reservation Creation: Create new reservations with guest details, room number, number of people, reservation value, start and end dates, and optional notes. Dates are stored as ISO strings.
- Reservation Listing: List all reservations sorted by start date, with options to edit or delete.
- Dashboard Summary: Display a dashboard with summary cards for today's occupancy, next 7 days occupancy, and revenue for the next 7 days.
- Weekly Calendar View: Show a weekly calendar view displaying reservations across the next 7 days, with each reservation card showing room number, guest name, number of people, and reservation value.
- Data validation and Business logic enforcement: Validation and error handling: validating required fields to create new reservations and enforcing the occupancy limits of a room, alerting the user to any invalid inputs.
- Firebase Authentication: Secure the app with Firebase Authentication, allowing only the owner to access the reservation system.
- Single source of truth: Implements centralized data management for all features of the app.

## Style Guidelines:

- Primary color: Dark blue (#30475E) for a calm and professional feel.
- Background color: Light gray (#F0F0F0) for a clean, neutral backdrop.
- Accent color: Burnt orange (#F05454) for important actions and highlights, drawing the user's eye.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a clean, modern, objective look.
- Mobile-first design with a simple, clean layout and large, easily tappable buttons. Rounded cards will provide a softer, more approachable feel.
- Use simple, clear icons to represent different actions and data points. Ensure icons are easily understandable.
- Subtle animations and transitions to provide feedback on user interactions.