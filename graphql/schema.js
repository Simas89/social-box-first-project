const { buildSchema } = require("graphql");

const schema = buildSchema(`
	type Query{
    UserTest(name: String): String
    addPost(token : String, textContent: String): String
    getPosts(TYPE: String, postID: String) : [POST]

  }
  type POST{
    _id: String
    userName: String
    textContent: String 
    likes: Int
    timestamp: String
    imgsmall: IMG
    
	 

  }
  type IMG{
    contentType: String
    data: String
  }


  `);

module.exports = schema;

// timestamp: { type: Date, default: Date.now },
