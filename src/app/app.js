import http from "http";
import {
  getPathPlaceholders,
  getUrlParamValues,
  replacePlaceholdersWithRegExp,
} from "../utils/param-regexp.js";
import MiddlewareStorage from "./_middleware-storage.js";

export default class App extends MiddlewareStorage {
  constructor(options) {
    super(options);
  }

  extend(...middlewares) {
    middlewares.forEach((middleware) => {
      this._stack.push({ path: "/", middleware });
    });
  }

  listen({ port, host }, callback) {
    const server = http
      .createServer(this._handler)
      .listen({ port, host }, callback);

    process.on("SIGINT", () => {
      server.close();
    });

    return server;
  }

  _handler = (req, res) => {
    let index = 0;

    const next = () => {
      const route = this._stack[index++];

      if (!route) {
        res.statusCode = 404;
        res.end();
        return;
      }

      const urlParams = this._getUrlParams(req.url, route.path);

      if (urlParams.length) {
        this._addUrlParamsToRequest(req, urlParams);

        return route.middleware(req, res, next);
      }

      if (!this._isPathMatch(req.url, route.path)) {
        return next();
      }

      route.middleware(req, res, next);
    };
    next();
  };

  _isPathMatch(reqUrl, path) {
    if (path.endsWith("/")) {
      return reqUrl.startsWith(path);
    }

    return reqUrl === path;
  }

  _getUrlParams(reqUrl, path) {
    const placeholders = getPathPlaceholders(path);

    if (!placeholders.length) {
      return [];
    }

    const pathWithRegExp = replacePlaceholdersWithRegExp(path, placeholders);

    const urlParamValues = getUrlParamValues(reqUrl, pathWithRegExp);

    return urlParamValues.map((value, idx) => {
      return [placeholders[idx].slice(1), value];
    });
  }

  _addUrlParamsToRequest(req, params) {
    req.param = {};
    params.forEach(([key, value]) => {
      req.param[key] = value;
    });
  }
}
