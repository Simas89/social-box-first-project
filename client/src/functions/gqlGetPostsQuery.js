const gqlGetPostsQuery = (TYPE, clientUserName, target) => {
	const query = `
  getPosts(TYPE: "${TYPE}",  clientUserName: "${clientUserName}", target: "${target}"){
    _id
    userName
    textContent
    timestamp
    edited
    comments{
      _id
      userName
      imgsmall{
        contentType
        data
      }
      textContent
    }


    imgsmall{
      contentType
      data
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
