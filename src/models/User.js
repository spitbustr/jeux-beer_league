
export default class User {
    static default = {
        id: 0,
        manager: null,

    }

    constructor(prop = {}) {
        Object.assign(this, User.default, prop);
    }
}