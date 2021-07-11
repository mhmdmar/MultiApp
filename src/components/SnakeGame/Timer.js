class Timer {
    constructor(intervalTime, callback) {
        this.intervalTime = intervalTime;
        this.callback = callback;
        this.interval = null;
    }
    isOff() {
        return this.interval === null;
    }
    start() {
        this.stop();
        this.interval = setInterval(() => {
            this.callback();
        }, this.intervalTime);
    }
    stop() {
        if (this.interval) {
            window.clearInterval(this.interval);
        }
    }
}

export default Timer;
