// Exercise reference: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
const http = require('http');

http
  .createServer((req, res) => {
    const { headers, method, url } = req;
    let body = [];
    //The request: handling errors, and as data comes in building an array with it, and finally at the end of the data stream changing the concatenating the contents of the buffer and making it a stream.
    req
      .on('error', err => {
        console.log(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();

        //Setup what to do if the Writablestream returns error on response object
        res.on('error', err => {
          console.error(err);
        });

        //Must define status codes and headers before a response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        const responseBody = { headers, method, url, body };
        //Turns responseBody object into JSON and puts it inside the write method to be sent as a response
        res.end(JSON.stringify(responseBody));
      });
  })
  .listen(8080); //Server listens for req and sends res over port 8080;
