const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require('morgan');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

const db = require("./api/models");


// console.log("Drop and re-sync db.");

// });

app.use(morgan('dev'));
app.use((req,res,next) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Authorization,Accept",
	);
	if(req.method  === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE');
		return res.status(200).json({});
	}
	next();
});

const routes = require('./api/routes/index');
app.use('/',routes);
app.use(express.static('uploads/'));

app.use((req,res,next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req,res,next) => {
	res.status(error.status || 500).json({
		error : {
			message: error.message
		}
	});
});


module.exports = app;
