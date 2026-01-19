class LeakyBucket {
    constructor(capacity, leakRate) {
        this.rejectedRequests = 0;
        this.capacity = capacity;
        this.leakRate = leakRate; // tokens per second
        this.tokens = 0;
        this.lastLeakTime = Date.now(); 
    }

    acquire() {
        this._leakTokens();

        if (this.tokens < this.capacity) {
            this.tokens++;
            return true;
        }
        this.rejectedRequests++;
        return false;
    }

    _leakTokens() {
        const now = Date.now();
        const elapsed = (now - this.lastLeakTime) / 1000; // time in seconds
        
        // Calculate how many tokens should have leaked since last time
        const leakedTokens = elapsed * this.leakRate;
        
        // Subtract leaked tokens and ensure we don't go below 0
        this.tokens = Math.max(0, this.tokens - leakedTokens);
        
        this.lastLeakTime = now;
        console.log('Current bucket level:', this.tokens.toFixed(2));
        console.log('Rejected requests:', this.rejectedRequests);
    }
}

module.exports = LeakyBucket;