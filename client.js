const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    var uri = req.url;
    if(uri == "/"){
      res.end(`
          <!doctype html>
          <html>
          <body>
              <form action="/phrase/create" method="post">
                  <input type="text" name="dicton" /><br />
                  <button>Créer dicton</button>
              </form>
          </body>
          </html>
      `);
    }
    else if(uri == "/phrase/create"){
      let data = '';
      req.on('data', chunk => {
                  data += chunk.toString();
      });
      req.on('end', () => {
            data = querystring.parse(data);
            console.log(data);

            var request = require('request');

            // Set the headers
            var headers = {
              'User-Agent':       'Nodejs Agent/1.0',
              'Content-Type':     'application/x-www-form-urlencoded'
            }

            // Configure the request
            var options = {
              url: 'http://127.0.0.1:3000/phrase/create',
              method: 'POST',
              headers: headers,
              form: data
            }

            // Start the request
            request(options, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  console.log(body)
              }
              else if(error){
                console.log(error);
              }
            });
      });
      res.end();
    }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
