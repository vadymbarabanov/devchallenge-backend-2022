import MiddlewareStorage from "./_middleware-storage.js";

export default class Router extends MiddlewareStorage {
  constructor(options) {
    super(options);
  }

  getRoutes() {
    return this._stack;
  }
}
