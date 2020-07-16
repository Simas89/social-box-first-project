const { buildSchema } = require("graphql");

const schema = buildSchema(`
	type Query{
    User(name: String): UserData
    Test: String
  }
  type UserData{
    _id: String
    userName: String
		credits: Int
		verified: Boolean
  }
  `);

module.exports = schema;
