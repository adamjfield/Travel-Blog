const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// The `/api/users` endpoint

router.get('/', (req, res) => {
  // find all users
  User.findAll({
    attributes: { exclude: ['password'] },   
  })
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one User by its `id` value
  // be sure to include its associated posts
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'created_at'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title'],
        },
      },
      {
        model: Post,
        attributes: ['title'],
      },
    ],
  })
  .then((dbUserData) => {
    if (!dbUserData) {
      res.status(404).json({ message: "No User found with given id." });
      return;
    }
    res.json(dbUserData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new User
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.user_name;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No User with given email!' });
      return;
    }
    const validPass = dbUserData.checkPassword(req.body.password);
    if (!validPass) {
      res.status(400).json({ message: 'The given Password is Incorrect!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: 'You are logged in!' });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/logout', (req,res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  // update a User by its `id` value
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
  .then((dbUserData) => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: "No User found with given id." });
      return;
    }
    res.json(dbUserData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req,res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No User found with given id.' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router;