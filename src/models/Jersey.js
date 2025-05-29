
export default class Jersey {
    static default = {
        jersey: {
            image: "jersey_0",
            colors: {
                main: "#FFFFFF",
                secondary: "#1b1b1b",
            },
        },
        logo: {
            image: "beerbuds",
            colors: {
                main: "#1b1b1b",
            }
        }
    }

    constructor(prop = {}) {
        Object.assign(this, Jersey.default, prop);
    }
}