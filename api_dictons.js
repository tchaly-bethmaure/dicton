const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const readline = require('readline');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const method = req.method;
    const page = req.url
    if(page == "/"){
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("URI :\n/phrase/list : lister les dictons.\n/phrase/create : créer dicton.");
      res.end();
    }
    else if(page == "/phrase/list"){
      fs.readFile("dictons.txt", "utf8", function (err, dictons) {
        if (err) throw err;
        console.log(dictons);
        res.end(dictons);
      });
    }
    else if(page == "/phrase/create" && req.method === 'POST'){
      let data = '';
      req.on('data', chunk => {
        data += chunk.toString();
      });
      req.on('end', () => {
        data = querystring.parse(data);
        fs.appendFile('dictons.txt', data.dicton+"\n", function (err) {
          if (err) throw err;
          console.log("Dicton : "+data.dicton+" Ajouté !");
        });
      });
      res.end("OK");
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
