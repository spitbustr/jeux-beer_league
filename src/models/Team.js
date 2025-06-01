
import Jersey from "@/models/Jersey"
import SeasonTeamsStats from "@/models/SeasonTeamsStats"
export default class Team {
    static default = {
        index: 0,
        name: "TEAM",
        location: "CITYVILLE",
        jersey: new Jersey(),
        logo: "",
        mainColor: "",
        players: [],
        stats: new SeasonTeamsStats(),
    }
    constructor(prop = {}) {
        Object.assign(this, Team.default, prop)
        this.jersey = new Jersey(prop.jersey)
        this.stats = new SeasonTeamsStats(prop.stats)
    }

    get fullName() {
        return `${this.location} ${this.name}`
    }
}