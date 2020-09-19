const typeDefs = `
  type Subscription {
    messages(userName: String): MSG_PACK
    isTyping(userName: String): isTypingPack
    ntfs(userName: String): ntfs_pack
    
  }
  type ntfs_pack{
    new: [String]
    old: Int
  }
  type isTypingPack{
    set: Boolean
    userName: String
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
    updateIsTyping(userName: String!,target: String!, set: Boolean!): ID
    deleteMsg(index: String,userName: String, target: String): ID
    delAllNotifications(userName: String): ID
    delOneNotification(userName: String, id: String): ID
    markAllNotifications(userName: String): ID
    markOneNotification(userName: String,target: String): ID
    reportIfNtfSeen(userName: String, target: String, seen: Boolean): ID

  }
  type CHAT_NTF {
    _id: String
    user: String
    lastMsg: String
    seen: Boolean
    date: String
    imgsmall: IMG
 
  }
	type Query{
    messages(userName: String, target: String): MSG_PACK
    getChatsNtf(userName: String): [CHAT_NTF]

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
