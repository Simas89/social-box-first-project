const { buildSchema } = require("graphql");

const schema = buildSchema(`
	type Query{
    messageToMe(guest: String, email: String, msg: String): String
    User(name: String): UserData
    Test: String
    addPost(token : String, textContent: String): String

  }
  type POST{
    token: String
  }

  type UserData{
    _id: String
    userName: String
		credits: Int
		verified: Boolean
  }

  `);

module.exports = schema;
