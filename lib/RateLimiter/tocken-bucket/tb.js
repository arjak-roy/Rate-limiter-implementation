class TokenBucket {
    constructor(capacity, refillRate) {
        this.capacity = capacity;
        this.tokens = capacity;
        this.refillRate = refillRate; // tokens per second
        this.lastRefillTime = Date.now();
        this.rejectedRequests = 0;
    }

    acquire() {
        this._refillTokens();

        if (this.tokens > 0) {
            
            this.tokens--;
            return true;
        }

        this.rejectedRequests++;
        return false;
    }

    _refillTokens() {
        const now = Date.now();
        const elapsed = (now - this.lastRefillTime) / 1000; // time in seconds

        // Calculate how many tokens should have been refilled since last time
        const refilledTokens = elapsed * this.refillRate;

        // Add refilled tokens and ensure we don't exceed capacity
        this.tokens = Math.min(this.capacity, this.tokens + refilledTokens);

        this.lastRefillTime = now;
        console.log('Current bucket level:', this.tokens.toFixed(2));
        console.log('Rejected requests:', this.rejectedRequests);
    }
}

module.exports = TokenBucket;