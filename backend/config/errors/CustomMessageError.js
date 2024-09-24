const util = require('util');

class CustomMessageError extends Error {
    constructor(...args) {
        if (args.length === 1) {
            if (typeof args[0] === 'string') {
                super(args[0]);
                this.name = this.constructor.name;
                this.status = 400;
                this.data = {};
                this.message = args[0] || null;
                this.code = null;
            } else if (typeof args[0] === 'object') {
                super(args[0].message);
                this.name = this.constructor.name;
                this.status = args[0].status || 500;
                this.data = args[0].data || {};
                this.message = args[0].message || null;
                this.code = args[0].code || null;
            }
        } else if (args.length === 2) {
            if (typeof args[0] === 'number' && typeof args[1] === 'string') {
                super(args[1]);
                this.name = this.constructor.name;
                this.status = args[0] || 500;
                this.data = {};
                this.message = args[1] || null;
                this.code = null;
            }
        } else if (args.length === 3) {
            if (typeof args[0] === 'number' && typeof args[1] === 'string' && typeof args[2] === 'string') {
                super(args[2]);
                this.name = this.constructor.name;
                this.status = args[0] || 500;
                this.data = {};
                this.message = args[2] || null;
                this.code = args[1] || null;
            }
        }
    }

    [util.inspect.custom](depth, options) {
        const {stack} = this;
        return `${this.name}: ${this.code}\n${stack}`;
    }
}

module.exports = CustomMessageError;
