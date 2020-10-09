const http = require('http');
const url = require('url');
const fs = require('fs');

//creating server

http.createServer((req,res)=>{
    const pathName = url.parse(req.url,true);
   // console.log("Path name", pathName);
    if(pathName.path ==='/'){
        fs.readFile('index.html',(err,data)=>{
            if(err) console.log("Error");

            res.writeHead(200, {"Content-Type": 'text/html'});
            res.write(data);

            return res.end();
        });
    }
    else {
        fullpath = '.'+ pathName.path + '.html';
        fs.readFile(fullpath,(err,data)=>{
            if(err){
                fs.readFile('404.html',(err,data)=>{
                    if (err) throw err;
                    res.writeHead(404, {"Content-Type": 'text/html'});
                    res.write(data);
                    return res.end();
                });
            }

            res.writeHead(200, {"Content-Type": 'text/html'});
            res.write(data);
            return res.end();
        });
    }
}).listen(8080,()=>{
    console.log('server is running on port 8080');
});

