const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [];

app.post('/save-form', (req, res) => {
  let user = req.body;
  user['id'] = users.length + 1;
  user['fullname'] = `${user.name} ${user.lastname} ${user.lastnameTwo}`;
  console.log(user)
  users.push(user);
  res.status(200).send({ success: true, data: { msg: `El usuario ${user.fullname} fue registrado con éxito` } });
})

app.get('/get-members', (req, res) => {
  let filtered = users;
  if (req.query.id) {
    filtered = filtered.filter(user => (user.id).toString() === req.query.id);
  }
  if (req.query.name) {
    filtered = filtered.filter(user => user.fullname.includes(req.query.name));
  }
  res.status(200).send(filtered);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
