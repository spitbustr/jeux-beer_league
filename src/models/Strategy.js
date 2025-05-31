
import Result from "@/models/Result"
export default class Strategy {
    static default = {
        id: "",
        name: "",
        detail: "",
        effects: {
            attributes: []
        }
    }

    constructor(prop = {}) {
        Object.assign(this, Strategy.default, prop);
    }
}