var express = require('express');
var app = express(),
    fs = require('fs');
app.use(express.static('public'));
app.use(express.static('dist'));

app.get('/', function(req, res){
    res.send('Hello home page');;
});
app.get('/dynamic', function(req, res){
    var lis = '';
    for(var i=0; i<5; i++){
        lis = lis + '<li>coding</li>';
    }
    var time = Date();
    var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
    res.send(output);
});
app.get('/route', function(req, res){
    fs.readFile( '../dist/index.html', (err, data) => {
        if (err) {
            console.log( err );
            // emit the error
            return callback(err, `<h2>File Read Error: ${err.message}</h2>`);
        }

        let text = data.toString();

        // pageCache[ file ] = {
        //     cacheDate:Date.now(),
        //     text:text
        // };
        //
        // return callback(null, text);
        res.send(text);
    });

})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
