
import Result from "@/models/Result"
export default class Event {
    static default = {
        name: "",
        description: "",
        icons: [],
        results: {},
        amountOfCards: 4,
    }

    constructor(prop = {}) {
        Object.assign(this, Event.default, prop);
    }
}