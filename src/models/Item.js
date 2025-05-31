
import Result from "@/models/Result"
export default class Item {
    static default = {
        id: "",
        name: "",
        detail: "",
        effects: {
            attributes: []
        }
    }

    constructor(prop = {}) {
        Object.assign(this, Item.default, prop);
    }
}