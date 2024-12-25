import http from 'http';
import fs from 'fs';
import url from 'url';

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);

    let filename =
      !q.pathname || q.pathname == '/'
        ? './pages/index.html'
        : `./pages${q.pathname}.html`;
    let type = 'text/html';

    if (q.pathname && q.pathname.includes('.css')) {
      filename = '.' + q.pathname;
      type = 'text/css';
    }

    fs.readFile(filename, (err, data) => {
      if (err) {
        fs.readFile('./pages/404.html', (err404, data404) => {
          if (err404) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('404 Not Found');
          }
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(data404);
          return res.end();
        });
      } else {
        res.writeHead(200, { 'Content-Type': type });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
