# Rate Limiting Demonstration: Leaky vs. Token Bucket 🪣

This is a simple demonstration project exploring two fundamental rate-limiting algorithms used in system design: **Leaky Bucket** and **Token Bucket**.

> [!IMPORTANT]  
> **Note:** This repository is for **demonstration and educational purposes only**. It is not intended for production use.

## 🚀 Overview
Rate limiting is a strategy used to limit network traffic. It is implemented at the server side to prevent resource exhaustion and protect against DoS attacks.

## How to setup and test:
1. Fork the repo.
2. Fire up the server using Nodemon.
3. Use a API testing tool like Postman.
4. If using postman, make collections to run a performance test on the server '/' endpoint.

### 1. Leaky Bucket Algorithm
* **Concept:** Processes requests at a constant, fixed rate.
* **Metaphor:** A bucket with a small hole at the bottom. Water (requests) can enter at any speed, but it "leaks" (processes) at a steady pace. If the bucket is full, new requests are discarded.
* **Best for:** Consistent, predictable traffic shaping.

### 2. Token Bucket Algorithm
* **Concept:** Allows for a certain amount of "bursty" traffic by accumulating tokens.
* **Metaphor:** A bucket is filled with tokens at a fixed rate. Each request consumes one token. If tokens are available, the request is processed immediately.
* **Best for:** Systems that need to handle occasional spikes in traffic while maintaining an average rate.

## 🧠 Algorithm Workflows

### 1. Token Bucket Algorithm 🪙
The Token Bucket is designed to allow for **bursty traffic** while enforcing a long-term average rate.

**Logic Flow:**
1.  **Refill:** On every request arrival, calculate the time passed since the last refill. Add new tokens to the bucket:
    $Tokens_{new} = (CurrentTime - LastRefillTime) \times RefillRate$
2.  **Cap:** Ensure the bucket does not exceed its `MaxCapacity`.
3.  **Evaluate:** * **IF** $Tokens \ge 1$: 
        * Consume 1 token.
        * **Accept** the request.
    * **ELSE**: 
        * **Reject** the request (Rate Limit Exceeded).
4.  **Update:** Store the `CurrentTime` as the new `LastRefillTime`.



---

### 2. Leaky Bucket Algorithm 🚰
The Leaky Bucket acts as a **traffic shaper**, ensuring that requests are processed at a strictly constant, smooth rate regardless of the input speed.

**Logic Flow:**
1.  **Arrival:** A new request arrives at the system.
2.  **Capacity Check:** * **IF** $CurrentQueueSize < BucketCapacity$:
        * Add the request to the queue (the "bucket").
        * **Accept** for future processing.
    * **ELSE**:
        * **Drop** the request (Bucket Overflow).
3.  **Leakage (Background Process):** * At every fixed interval (e.g., every 100ms), "leak" one request from the front of the queue.
    * The system executes the request at this precise moment.
4.  **Smoothing:** This ensures that even if 100 requests arrive at once, they are "leaked" out one by one at the defined rate.



---

## ⚖️ At a Glance: Comparison

| Feature | Token Bucket | Leaky Bucket |
| :--- | :--- | :--- |
| **Burstiness** | Allowed (up to bucket size) | Not allowed (strictly smoothed) |
| **Request Handling** | Processed immediately if tokens exist | Queued and processed at fixed intervals |
| **Idle Time** | Accumulates tokens for future use | Does not accumulate "credits" |
| **Best For** | Modern API Rate Limiting | Network Traffic Shaping |

---
Developed as a part of System Design exploration.
