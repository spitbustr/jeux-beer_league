
import Jersey from "@/models/Jersey"
import Player from "@/models/Player"
export default class Team {
    static default = {
        index: 0,
        name: "",
        city: "",
        jersey: new Jersey(),
        logo: "",
        players: []
    }

    constructor(prop = {}) {
        Object.assign(this, Team.default, prop);
    }
}