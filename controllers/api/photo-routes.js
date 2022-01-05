const sequelize = require("../../config/connection");
const { Post, Photo } = require("../../models");
const withAuth = require("../../utils/auth");

const router = require("express").Router();

router.post(
  "/posts",
  /*withAuth,*/ (req, res) => {
    //Need to login first
    Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    })
      .then((dbPostData) => {
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
);

router.post("/image",/*withAuth,*/ (req, res) => {
  let data = [];
  const post_id = req.body.post_id;
  req.body.images.map((url) => {
    data.push({ url, post_id });
  });
  Photo.bulkCreate(data).then(() => console.log("Users data have been saved"));
  res.send({ response: true });
});

router.post("/images",/*withAuth,*/ async(req, res) => {  
  const post_id = req.body.post_id;
  const photos = await Photo.findAll({ where: { post_id: post_id } });
  console.log(photos)
  res.json(photos);
});

module.exports = router;
