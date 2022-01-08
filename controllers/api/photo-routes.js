const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, Photo } = require('../../models');
const withAuth = require('../../utils/auth');

//get all images
router.get('/', (req, res) => {
  Photo.findAll({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get one image
router.get('/:id', (req, res) => {
  Photo.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add images
router.post('/', (req, res) => {
  let data = [];
  const post_id = req.body.post_id;
  req.body.images.map(url => {
    data.push({ url, post_id });
  });
  Photo.bulkCreate(data).then(() => console.log('Users data have been saved'));
  res.send({ response: true });
});

//delete an image
router.delete('/:id', (req, res) => {
  Photo.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
