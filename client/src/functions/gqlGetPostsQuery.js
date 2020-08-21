const gqlGetPostsQuery = (TYPE, clientUserName, target) => {
	const query = `
  getPosts(TYPE: "${TYPE}",  clientUserName: "${clientUserName}", target: "${target}"){
    _id
    userName
    textContent
    timestamp
    isOnline
    isVerified
    edited
    imgsmall{
      contentType
      data
    }

    comments{
      _id
			userName
			imgsmall{
				contentType
				data
			}
			textContent
			timestamp
			edited
    }
    
    likesPack{
      likes
      likedByMe
      approves{
        userName
        imgmicro
      }
    }
    
    
  }
`;

	return query;
};

export default gqlGetPostsQuery;
