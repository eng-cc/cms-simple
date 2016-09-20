var http = require('http')
var exec = require('exec')

const PORT = 8004

var deployServer = http.createServer(function (request, response) {
  var body = []
  // console.log(request.url)
  request.on('error', function (err) {
    console.error(err)
  }).on('data', function (chunk) {
    body.push(chunk)
  }).on('end', function () {
    body = Buffer.concat(body).toString()
    var json = JSON.parse(body)
    console.log(json)
    if (json.commits && json.commits[0].short_message.match('deploy')) {
      var commands = 'git pull && npm run build && cp -r ./dist/* ./deploy'

      exec(commands, function (err, out, code) {
        if (err instanceof Error) {
          response.writeHead(500)
          response.end('server error')
          throw err
        }
        process.stderr.write(err)
        process.stdout.write(out)
        response.writeHead(200)
        response.end('Deploy Done')
      })
    } else {
      response.writeHead(200)
      response.end('no Deploy')
    }
  })
})

deployServer.listen(PORT)
