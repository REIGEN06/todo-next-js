const express = require('express');
const todoRouter = require('./routes/todo.routes');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', todoRouter);

app.listen(PORT, () => console.log(`server just started on port ${PORT}`));
