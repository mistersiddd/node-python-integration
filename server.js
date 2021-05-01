const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express();
const {spawn} = require('child_process');

//const data = require('/vagrant/WebApp/data.json');
// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
// file upload api
app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        else {
             const python = spawn('python3', ['/Users/sidharthr/Downloads/WebApp/create_json.py']);
            //  console.log(python.stdout);
            var dataToSend;
             python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
                dataToSend = data.toString();
                returnString = JSON.stringify(dataToSend);
                dataToSend = returnString;
                
               });
               python.stderr.on('data', (data) => console.log(data.toString()))

               //in close event we are sure that stream from child process is closed
               python.on('close', (code) => {
               console.log(`child process close all stdio with code ${code}`);
               // send data to browser
               console.log(dataToSend);
               res.send(dataToSend);
               });
               console.log(dataToSend);
            //  python.stdout.on('data',function(data){dataToSend=data.toString()});
            //console.log(data);
        }
        // returing the response with file path and name
        //return res.send({name: myFile.name, path: `/${myFile.name}`});
        // console.log(dataToSend);
        // return res.send(dataToSend);
    });
})
app.listen(4500, () => {
    console.log('server is running at port 4500');
})


