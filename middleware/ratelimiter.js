const LeakyBucket = require('../lib/RateLimiter/leakeyBucket/lb');
const TockenBucket = require('../lib/RateLimiter/tocken-bucket/tb');

function leakeyBucketMiddleware(capacity, rate, key = 'tockenbucket') {
    const bucket = (key === 'leakeybucket') ? new LeakyBucket(capacity, rate) : new TockenBucket(capacity, rate);
    return (req, res, next) => {
        if (bucket.acquire()) {
            next();
        } else {
            res.status(429).send('Too many requests');
        }
    };
}
module.exports = leakeyBucketMiddleware;