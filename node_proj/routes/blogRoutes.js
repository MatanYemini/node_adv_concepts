const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const util = require('util');
const cleanCache = require('../middlewares/cleanCache');
const client = redis.createClient(redisUrl);
const Blog = mongoose.model('Blog');

module.exports = (app) => {
  // since we put next first at cleanchache it will create a new blog and only then go back to this middleware,
  // so we will update our cache memory only when we will finish adding the blog
  app.get('/api/blogs/:id', requireLogin, cleanCache, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = await Blog.find({ _user: req.user.id }).cache({
      key: req.user.id,
    });

    res.send(blogs);

    // client.get = util.promisify(client.get);
    // const cachedBlogs = await client.get(req.user.id); // used promisify
    // // check if data was chached
    // if (cachedBlogs) {
    //   console.log('Serving from cached');
    //   return res.send(JSON.parse(cachedBlogs));
    // }
    // // if there is no relevant chached data
    // const blogs = await Blog.find({ _user: req.user.id }); // reaching mongoDB
    // console.log('Serving from MongoDb');
    // res.send(blogs);
    // // update the cache because it is not exit there
    // client.set(req.user.id, JSON.stringify(blogs)); // pay attention to use stringify
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
