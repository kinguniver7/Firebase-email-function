const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const express = require('express');

const app = express();
const cors = require('cors')({origin: true});
admin.initializeApp();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors);
//app.use(myMiddleware);
//PULL request


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '<email>',
        pass: '<pass>'
    }
});

app.get('/', (req, res) => res.send(res.send("Our services are working normally")));
app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const mailOptions = {
        from: 'DevCrew <from>', 
        to: '<to>',
        subject: 'Message from DevCrew',
        html: "Name: " + name + " <br/> Email: "+ email + " <br/> Message: " + message
    };
    if(name){
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    }else{
        return res.send('Name is empty!');
    }
});



exports.sendMail = functions.https.onRequest(app);