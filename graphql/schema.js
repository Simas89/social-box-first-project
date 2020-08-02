const { buildSchema } = require("graphql");

const schema = buildSchema(`
	type Query{
    UserTest(name: String): String
    addPost(token : String, textContent: String): String
    getPosts(TYPE: String, id: String) : [POST]
    likePost(userName: String, id: String): String

  }
  type POST{
    _id: String
    userName: String
    textContent: String 
    likes: Int
    timestamp: String
    likedByMe: Boolean
    imgsmall: IMG
    
	 

  }
  type IMG{
    contentType: String
    data: String
  }


  `);

module.exports = schema;

// timestamp: { type: Date, default: Date.now },
