const express = require('express')
const app = express();

const port = 3000

app.use(express.json());
app.use(express.urlencoded( {extended : false } ));
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));

const database = []

app.get('/todo',(req, res) => {
  res.json(database)
})

app.post('/todo', (req, res) => {
  const todoItem = req.body
  database.push(todoItem);
  res.json({ success: true, list: database });
})

app.post('/todo/:id',(req, res) => {
  const id = req.params.id;
  const todoItem = req.body;
  database[id].success = todoItem.success
  res.json({ success: true, list: database });
})

app.delete('/todo/:id',(req, res) => {
  const id = req.params.id;
  database.splice(id, 1);
  res.json({ success: true, list: database });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})