const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://william:DCXzTUZQDTL4Zip6@cluster0-s6kui.mongodb.net/test?retryWrites=true").then(() => {
  console.log('Connected to database.');
}).catch(() => {
  console.log('Failed to connected to database.');
});
// DCXzTUZQDTL4Zip6

app.use(bodyparser.json());
app.use(bodyparser.urlencoded ({ extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  })
});


app.get('/api/posts',(req, res, next) => {
  const posts = [
    {id: 'sgfdhsfdhs', title: 'First serverside post', content: 'This is coming from the server'},
    {id: 'uscdyufdsu', title: 'Second serverside post', content: 'This is coming from the server'}
  ];
  res.status(200).json({
    message: 'Post fecthed successfully',
    posts: posts
  });
});

module.exports = app;
