const http = require('http')

http.createServer(req, res) => {
  const {headers, method, url} = req;
  let body = []
  //The request: handling errors, and as data comes in building an array with it, and finally at the end of the data stream changing the concatenating the contents of the buffer and making it a stream.
  req.on('error', err => {
    console.log(err);
  }).on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
  })
}