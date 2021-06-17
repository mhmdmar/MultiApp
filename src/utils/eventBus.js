class EventBus {
    setEventBus(bus) {
        this.eventBus = bus;
    }
    off() {
        this.eventBus.$off();
    }
    subscribe(name, func) {
        this.eventBus.$on(name, func);
    }
    emit(name, payload) {
        this.eventBus.$emit(name, payload);
    }
}

const eventBus = new EventBus();
export default eventBus;
