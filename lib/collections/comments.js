Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    // Create the comment, save the id
    comment._id = Comments.insert(comment);
    // Now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);

    // Update the post with the number of comments
    if (comment.error) {
      return Errors.throw('Comment was not created');
    } else {
      Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    }

    return comment._id;
  }
});
