
export default class Player {
    static default = {
        id: 0,
        info: {
            name: null,
            position: null,
            personnality: null,
        },

        stats: {
            INT: 0,
            SKL: 0,
            SPD: 0,

            SHT: 0,
            PAS: 0,
            DEX: 0,

            FO: 0,
            AGG: 0,
        },
        goalieStats: {
            ANG: 0,
            REF: 0,
            ANT: 0,
        },
        acquire: {
            beer: 0,
            charm: 0,
            money: 0,
        }
    }

    constructor(prop = {}) {
        Object.assign(this, Player.default, prop);
    }
}