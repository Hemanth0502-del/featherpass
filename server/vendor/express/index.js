const http = require('http');
const { parse: parseUrl } = require('url');

function createResponseEnhancers(res) {
  res.status = function status(code) {
    res.statusCode = code;
    return res;
  };

  res.set = function set(field, value) {
    res.setHeader(field, value);
    return res;
  };

  res.json = function json(body) {
    if (!res.getHeader('Content-Type')) {
      res.setHeader('Content-Type', 'application/json');
    }
    res.end(JSON.stringify(body));
  };

  res.send = function send(body) {
    if (typeof body === 'object' && body !== null) {
      return res.json(body);
    }
    res.end(body);
  };
}

function pathToRegex(path, keys) {
  const pattern = path
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        keys.push(segment.slice(1));
        return '([^/]+)';
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');

  return new RegExp(`^${pattern}$`);
}

function createApp() {
  const middlewares = [];
  const routes = [];

  function addRoute(method, path, handler) {
    const keys = [];
    const regex = pathToRegex(path, keys);
    routes.push({ method, handler, regex, keys });
  }

  function runMiddlewares(req, res, done) {
    let index = 0;

    const next = (err) => {
      if (err) {
        res.statusCode = err.statusCode || 500;
        res.end(err.message || 'Internal Server Error');
        return;
      }

      if (index >= middlewares.length) {
        return done();
      }

      const middleware = middlewares[index++];
      if (middleware.length <= 2) {
        try {
          middleware(req, res);
          next();
        } catch (error) {
          next(error);
        }
      } else {
        middleware(req, res, next);
      }
    };

    next();
  }

  function handle(req, res) {
    createResponseEnhancers(res);
    const parsedUrl = parseUrl(req.url, true);
    req.path = parsedUrl.pathname;
    req.query = parsedUrl.query;

    runMiddlewares(req, res, () => {
      const route = routes.find(
        (candidate) =>
          candidate.method === req.method && candidate.regex.test(req.path)
      );

      if (!route) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }

      const match = route.regex.exec(req.path);
      req.params = {};
      if (match) {
        route.keys.forEach((key, idx) => {
          req.params[key] = match[idx + 1];
        });
      }

      try {
        const maybePromise = route.handler(req, res);
        if (maybePromise && typeof maybePromise.then === 'function') {
          maybePromise.catch((error) => {
            res.statusCode = error?.statusCode || 500;
            res.end(error?.message || 'Internal Server Error');
          });
        }
      } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.end(error.message || 'Internal Server Error');
      }
    });
  }

  const app = (req, res) => handle(req, res);

  app.use = (fn) => {
    middlewares.push(fn);
    return app;
  };

  ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].forEach((method) => {
    app[method.toLowerCase()] = (path, handler) => {
      addRoute(method, path, handler);
      return app;
    };
  });

  app.listen = (port, callback) => {
    const server = http.createServer(app);
    return server.listen(port, callback);
  };

  return app;
}

function json() {
  return (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
      req.body = {};
      return next();
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        req.body = body ? JSON.parse(body) : {};
        next();
      } catch (error) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
  };
}

module.exports = Object.assign(createApp, { json });
