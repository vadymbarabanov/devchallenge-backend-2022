const colors = {
  reset: "\x1b[0m",
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  },
};

class Builder {
  message = "";
  _dof;
  constructor(dof) {
    this._dof = dof;
  }

  green = (message) => {
    return this._toColor("green", message);
  };

  red = (message) => {
    return this._toColor("red", message);
  };

  cyan = (message) => {
    return this._toColor("cyan", message);
  };

  blue = (message) => {
    return this._toColor("blue", message);
  };

  black = (message) => {
    return this._toColor("black", message);
  };

  magenta = (message) => {
    return this._toColor("magenta", message);
  };

  plain = (message) => {
    this.message += String(message);
    return this;
  };

  log = () => {
    console.log(this._getTextAndClear());
  };

  text = () => {
    return this._getTextAndClear();
  };

  _toColor = (color, message) => {
    this.message += colors[this._dof][color] + String(message) + colors.reset;
    return this;
  };

  _getTextAndClear = () => {
    const buffer = this.message;
    this.message = "";
    return buffer;
  };
}

export default class ColorChanger {
  bg;
  fg;

  constructor() {
    this.bg = new Builder("bg");
    this.fg = new Builder("fg");
  }
}
