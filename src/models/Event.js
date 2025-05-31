
import Result from "@/models/Result"
export default class Event {
    static default = {
        id: "",
        name: "",
        detail: "",
        results: new Result(),
    }

    constructor(prop = {}) {
        Object.assign(this, Event.default, prop);
    }
}