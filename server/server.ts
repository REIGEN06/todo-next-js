const express = require('express');
const todoRouter = require('./routes/todo.routes');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(function (req: any, res: any, next: () => void) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE,PATCH');
	res.header('Access-Control-Allow-Credentials', true);
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});

app.use('/api', todoRouter);

app.listen(PORT, () => console.log(`server just started on port ${PORT}`));
