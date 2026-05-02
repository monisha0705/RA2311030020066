
 Campus Notification System — Design

 Stage 1: API Design

 Overview

The system exposes REST endpoints for retrieving, creating, and updating notifications. It also supports real-time delivery using a push-based mechanism.
 Base Path

`/api/v1`

Common Headers

* Content-Type: application/json
* Authorization: Bearer <token>

---

1. Fetch Notifications

GET /notifications?studentId=123&limit=10

Returns the most recent notifications for a student.

Response:
{
"data": [
{
"id": 101,
"category": "placement",
"message": "Interview scheduled for XYZ company",
"read": false,
"createdAt": "2026-05-02T10:00:00Z"
}
]
}

---

 2. Create Notification

POST /notifications

Request:
{
"studentId": 123,
"category": "event",
"message": "Hackathon starts tomorrow"
}

---

3. Mark Notification as Read

PATCH /notifications/{id}

Request:
{
"read": true
}

---

 Real-Time Delivery

Instead of polling, the system uses WebSockets to push updates instantly when a new notification is created. This reduces unnecessary network calls and improves responsiveness.

---

Stage 2: Database Design

Choice

Relational database (PostgreSQL) is preferred because notification data is structured and requires filtering and ordering.

Table Structure

notifications:

* id (primary key)
* student_id (indexed)
* category
* message
* read (boolean)
* created_at (timestamp)

Considerations

* Queries will frequently filter by student_id and sort by created_at
* Data growth can slow down reads if not indexed properly

---

 Stage 3: Query Optimization

A common query:
SELECT * FROM notifications
WHERE student_id = 123 AND read = false
ORDER BY created_at DESC;

 Optimization

Create a composite index:
(student_id, read, created_at DESC)

This avoids full table scans and speeds up sorting.

---

Stage 4: Performance Improvements

Techniques Used

1. Caching:
   Frequently accessed notifications can be cached using Redis.

2. Pagination:
   Always limit results (e.g., top 10 or 20) to avoid large payloads.

3. Push Model:
   Using WebSockets avoids repeated API polling.

Trade-offs

* Cache invalidation adds complexity
* Real-time systems require persistent connections

---

Stage 5: Reliability

Problem

Sending notifications (email/push) synchronously can slow down the system and fail under load.

Solution

Use a message queue:

* Producer: API server
* Consumer: Worker service

Flow:

1. Save notification in DB
2. Push event to queue
3. Worker processes delivery

Benefits

* Retry on failure
* Decoupled system
* Better fault tolerance

---

Stage 6: Prioritization Logic

Not all notifications have equal importance.

Strategy

Assign weights:

* placement → high priority
* results → medium
* events → low

Combine with recency:
Recent notifications should rank higher.

Approach

Maintain a fixed-size min-heap:

* Insert new notifications with score
* Remove lowest when size exceeds limit

This ensures efficient retrieval of top N notifications.
