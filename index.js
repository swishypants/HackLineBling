var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var app = express();
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

console.log('app running on port 5000');

app.get('/', function(req, res) {
    console.log('home');
    res.render('pages/index');  
});

app.post('/hackline', function(req, res) {
    console.log('thanks');
    console.log(req.body.phone_num);
    var phone_num = req.body.phone_num;

    twilioClient.calls.create({
		to: phone_num,
		from: '+17322534352',
		url: 'https://fea0d7de.ngrok.io/voice'
	});

    res.render('pages/thanks');
});

app.post('/voice', function (req, res) {
	// Set the url of the song we are going to play
	//var songUrl = 'http://ocrmirror.org/files/music/remixes/Street_Fighter_2_Guile%27s_Theme_Goes_with_Metal_OC_ReMix.mp3'
	//var songUrl = "/public/HotLineBling.mp3";
	var songUrl = "/public/HotlineBling_edit.wav";

	// Generate a TwiML response
	var twiml = new twilio.TwimlResponse();

	// Play Guile's theme over the phone.
	twiml.play(songUrl);

	// Set the response type as XML.
	res.header('Content-Type', 'text/xml');

	// Send the TwiML as the response.
	res.send(twiml.toString());
});

app.listen(5000);
