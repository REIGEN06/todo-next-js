const express = require('express');
const todoRouter = require('./routes/todo.routes');
const PORT = process.env.PORT || 8080;
import { Request, Response, NextFunction } from 'express';
const app = express();

app.use(express.json());
app.use(function (req: Request, res: Response, next: NextFunction) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE,PATCH');

	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});

app.use('/api', todoRouter);

app.listen(PORT, () => console.log(`server just started on port ${PORT}`));
