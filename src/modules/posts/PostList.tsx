import React from 'react';
import { ApiPost } from '../api/apiRepository';
import { color, spacing } from '../../styles/theme';

export const e2eIds = {
  postList: 'post-list',
  post: 'post-list-post',
};

const PostList = ({ posts }: { posts: ApiPost[] }) => {
  return (
    <div className="list" data-e2e={e2eIds.postList}>
      {posts.map((post) => {
        const date = new Date(post.created_time);
        return (
          <div className="post" key={post.id} data-e2e={e2eIds.post}>
            <div className="date">
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </div>
            <span className="message">{post.message}</span>
          </div>
        );
      })}
      {/*language=CSS*/}
      <style jsx>{`
        .list {
          display: flex;
          flex-direction: column;
        }

        .post {
          display: flex;
          flex-direction: column;
          border: 1px solid ${color.brandLight};
          margin-bottom: ${spacing.md};
        }

        .date {
          padding: ${spacing.md};
        }

        .message {
          padding: ${spacing.md};
        }
      `}</style>
    </div>
  );
};

export default PostList;
