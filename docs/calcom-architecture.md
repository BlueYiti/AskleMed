# Cal.com Appointment Webhook Integration

## Overview

This project integrates **Cal.com** with a custom Express.js + MongoDB backend to automatically manage telehealth appointments in real time.

The system uses webhooks from Cal.com to create, update, and maintain appointment records in MongoDB whenever a booking event occurs.

---

## Architecture

```

Patient
↓
Doctor Profile (Frontend)
↓
Cal.com Booking Page
↓
Cal.com Webhook Events
↓
Express.js Webhook Endpoint
↓
MongoDB (Appointments Collection)

````

---

## Supported Webhook Events

This implementation supports multiple Cal.com webhook events:

- `PING` → health check
- `BOOKING_CREATED` → create appointment
- `BOOKING_CANCELLED` → cancel appointment
- `BOOKING_RESCHEDULED` → update appointment time
- `BOOKING_REJECTED` → reject appointment

---

## How It Works

### 1. Booking Flow

1. Patient visits a doctor profile
2. Clicks "Book Appointment"
3. Redirected to Cal.com scheduling page
4. Selects time and confirms booking
5. Cal.com triggers a webhook event

---

### 2. Webhook Payload Example

```json
{
  "triggerEvent": "BOOKING_CREATED",
  "payload": {
    "uid": "unique-booking-id",
    "startTime": "2026-05-29T10:00:00Z",
    "endTime": "2026-05-29T10:30:00Z",
    "organizer": {
      "name": "Dr. John",
      "email": "doctor@example.com"
    },
    "attendees": [
      {
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    ]
  }
}
````

---

## Backend Processing Logic

The webhook extracts and processes:

* `triggerEvent`
* `payload`
* `calEventId` (from `uid` or `bookingId`)
* patient info (from responses or attendees)

It also optionally looks up the patient in MongoDB using email.

---

## Event Handling

### BOOKING_CREATED

* Prevents duplicates using `calEventId`
* Creates new appointment
* Stores:

  * patient info
  * doctor info
  * start/end time
  * meeting link (if available)
  * status = `confirmed`

---

### BOOKING_CANCELLED

Updates appointment:

```ts
status: "cancelled"
```

---

### BOOKING_RESCHEDULED

Updates:

```ts
startsAt
endsAt
status: "rescheduled"
```

---

### BOOKING_REJECTED

Updates:

```ts
status: "rejected"
```

---

### PING

Used to verify webhook connectivity:

```json
{
  "success": true,
  "type": "ping"
}
```

---

## Database Model

```ts
patientId?: ObjectId

patientName: string
patientEmail: string

doctorName: string
doctorEmail: string

startsAt: Date
endsAt: Date

calEventId: string

meetingLink?: string

status: "confirmed" | "cancelled" | "rescheduled" | "rejected"
```

---

## Webhook Configuration

In Cal.com:

```
Settings → Developer → Webhooks
```

### Configuration

* Event Types:

  * BOOKING_CREATED
  * BOOKING_CANCELLED
  * BOOKING_RESCHEDULED
  * BOOKING_REJECTED
  * PING

* Webhook URL:

```
https://your-api.ngrok-free.app/api/webhooks/calcom
```

* Secret:
  Stored in environment variables

---

## Testing

### 1. PING Event

Used to verify webhook connectivity

### 2. Postman Test

Simulate booking payloads manually

### 3. Real Booking Test

Complete booking flow via Cal.com UI

---

## Key Design Decisions

### 1. Event-Driven Architecture

Each webhook event directly updates MongoDB.

### 2. Cal.com as Scheduling Layer

Cal.com handles:

* availability
* booking UI
* scheduling logic

### 3. Backend as Source of Truth

All appointment data is persisted in MongoDB.

---

## Outcome

This integration enables:

* Real-time appointment creation
* Automatic rescheduling sync
* Cancellation tracking
* Multi-doctor support
* Scalable event-driven scheduling system