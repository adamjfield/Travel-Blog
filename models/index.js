const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comments');
const Photo = require('./Photos');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.hasMany(Photo, {
    foreignKey: 'post_id'
});

Photo.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})

module.exports = { User, Post, Comment, Photo }; 
