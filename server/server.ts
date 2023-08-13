const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo.routes');
const app = express();
const PORT = process.env.PORT;
const corsOptions = {
	origin: process.env.ORIGIN,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', todoRouter);

app.listen(PORT, () => console.log(`server just started on port ${PORT}`));
