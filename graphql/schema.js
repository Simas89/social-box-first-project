const { buildSchema } = require("graphql");

const schema = buildSchema(`
	type Query{
    UserTest(name: String): String
    addPost(token : String, textContent: String): String
    getPosts(TYPE: String, clientUserName: String, target: String ) : [POST]
    editPost(_id: String, textContent: String) : String
    likePost(userName: String, id: String): LIKES_PACK
    sendComment(userName: String, comment: String, postID: String) : [COMMENT]

  }
  type POST{
    _id: String
    userName: String
    textContent: String 
    timestamp: String
    edited: String
    imgsmall: IMG
    likesPack: LIKES_PACK
    comments: [COMMENT]
  }

  type COMMENT{
    _id: String
    userName: String
    imgsmall: IMG
    textContent: String

  }
 

  type IMG{
    contentType: String
    data: String
  }
  type LIKES_PACK{
    likes: Int
    likedByMe: Boolean
    approves: [APPROVES]
  }
  type APPROVES{
    userName: String
    imgmicro: String
  }


  `);

module.exports = schema;

// timestamp: { type: Date, default: Date.now },
