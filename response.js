const { Cookie } = require('kelp-cookie');
const Negotiator = require('negotiator');
const BaseResponse = require('kelp-send/response');

class Response extends BaseResponse {
  static create(options) {
    return new Response(options);
  }
  constructor() {
    super();
    this.code = 200;
    this.headers = {};
    this.cookies = {};
    this.contents = [];
  }
  html(view, data, options) {
    this.contents.push({
      type: 'text/html',
      fn: (req, res) => res.render(view, data, options)
    });
    return this;
  }
  json(obj) {
    this.contents.push({
      type: 'application/json',
      fn: (req, res) => res.end(JSON.stringify(obj))
    });
    return this;
  }
  text(content) {
    this.contents.push({
      type: 'text/plain',
      fn: (req, res) => res.end(content)
    });
    return this;
  }
  header(key, value) {
    this.headers[key] = value;
    return this;
  }
  status(code) {
    this.code = code;
    return this;
  }
  cookie(key, value, options) {
    const cookie = new Cookie(key, value, options);
    this.headers['Set-Cookie'] = cookie.toHeader();
    return this;
  }
  redirect(url, code = 302) {
    this.code = code;
    this.headers.Location = url;
    return this;
  }
  respond(req, res) {
    const negotiator = new Negotiator(req);
    const availableMediaTypes = this.contents.map(content => content.type);
    const responseType = negotiator.mediaType(availableMediaTypes);
    const index = this.contents.findIndex(x => x.type === responseType);
    if (~index) {
      res.writeHead(this.code, Object.assign(this.headers, {
        'content-type': responseType
      }));
      this.contents[index].fn(req, res);
    } else {
      res.writeHead(this.code, this.headers);
      res.end();
    }
  }
}

module.exports = Response;
