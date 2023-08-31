import { isFunction } from "../utils/is-function.js";

export default class MiddlewareStorage {
    _prefix = "";
    _stack = [];

    constructor(options) {
        if (options) {
            this._prefix = options.prefix ?? "";
        }
    }

    use = (...middlewares) => {
        const hasPath = typeof middlewares[0] === "string";
        const path = hasPath ? middlewares[0] : "";

        for (let i = hasPath ? 1 : 0; i < middlewares.length; i++) {
            const middleware = middlewares[i];

            if (!isFunction(middleware)) {
                throw new Error(`Middleware must be a function`);
            }

            this._stack.push({ path: this._prefix + path, middleware });
        }
    };

    compose = (routes) => {
        routes.forEach((route) => {
            this.use(route.path, route.middleware);
        });
    };

    get = (...args) => {
        this._withMethod("GET", ...args);
    };

    post = (...args) => {
        this._withMethod("POST", ...args);
    };

    put = (...args) => {
        this._withMethod("PUT", ...args);
    };

    patch = (...args) => {
        this._withMethod("PATCH", ...args);
    };

    delete = (...args) => {
        this._withMethod("DELETE", ...args);
    };

    _withMethod = (method, ...args) => {
        const path = typeof args[0] === "string" ? args[0] : "";

        for (let i = path ? 1 : 0; i < args.length; i++) {
            this.use(path, (req, res, next) => {
                if (req.method === method) {
                    return args[i](req, res, next);
                }
                next();
            });
        }
    };
}
