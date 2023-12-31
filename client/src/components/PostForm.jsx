import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

export default function PostForm() {
  const [body, setBody] = useState('');

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {body},
    refetchQueries: [{query: FETCH_POSTS_QUERY}] //this adds the newest post at the top of the latest posts
    // update(proxy, result) {
    //   const { getPosts } = proxy.readQuery({
    //     query: FETCH_POSTS_QUERY,
    //   });
    //   proxy.writeQuery({
    //     query: FETCH_POSTS_QUERY,
    //     data: { getPosts: [...getPosts, result.data.createPost]},
    //   });
    // }, this works but adds the newest post under all posts, but sorts to first after refresh
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    setBody('')
  };

  return (
    <div className="form-container">
      <div className="row">
        <h1 className="page-title">Create a Post</h1>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          {/* <input
            type="text"
            name="body"
            className="form-control"
            placeholder="Hi World!"
            onChange={(e)=>setBody(e.target.value)}
            value={body}
          /> */}
          <>
          
          <textarea className="form-control" onChange={(e)=>setBody(e.target.value)} value={body} name="body"></textarea>
          </>
          {error && (
            <span className="error-msg">{error.graphQLErrors[0]?.message}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Create a post
        </button>
      </form>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
