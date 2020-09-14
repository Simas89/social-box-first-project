const typeDefs = `
  type Subscription {
    messages(userName: String): MSG_PACK
    
  }
  type MSG_PACK {
    target: String
    msg: [Message]
  }
  type Message {
    id: String!
    user: String!
    content: String!
    date: String
  }
  type Mutation{
    postMessage(userName: String!,target: String!, content: String!): ID

  }
	type Query{
    messages(userName: String, target: String): MSG_PACK

    emailMe(guest: String, email: String, msg: String) : String
    addPost(token : String, textContent: String): String
    getPosts(TYPE: String, clientUserName: String, target: String ) : [POST]
    editPost(_id: String, textContent: String) : String
    likePost(userName: String, id: String): LIKES_PACK
    delPost(_id: String) : String
    sendComment(userName: String, comment: String, postID: String) : [COMMENT]
    delComment(_id: String) : String
    editComment(_id: String, textContent: String) : String
    setOnlineParam(userName: String, param: String) : Boolean
    
    test: Int

  }



  type POST{
    _id: String
    userName: String
    isVerified: Boolean
    textContent: String
    timestamp: String
    isOnline: Boolean
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
    timestamp: String
    edited: String

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

  `;

module.exports = typeDefs;
