import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import ExpiredTokenError from '../api/ExpiredTokenError';
import { useAuth } from '../auth/AuthServiceProvider';
import { fetchPosts, FetchPostsResponse } from '../api/apiRepository';
import { spacing } from '../../styles/theme';
import User from './User';
import UserList from './UserList';
import PostList from './PostList';

function extractUsers(posts: FetchPostsResponse): User[] {
  return Object.keys(posts)
    .map((id) => {
      const userPosts = posts[id];
      const name = userPosts[0].from_name;
      const numberOfPosts = userPosts.length;
      return { id, name, numberOfPosts };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

const activeUserQueryParam = 'user';

const PostScreen = () => {
  const router = useRouter();
  const { initiateReauthorization, token } = useAuth();
  const { data: posts, error } = useSWR('posts', () => fetchPosts(token), {
    revalidateOnFocus: false,
    onError: (error) => {
      if (error instanceof ExpiredTokenError) {
        initiateReauthorization();
      }
    },
  });

  if (error) {
    return <div>Error fetching posts.</div>;
  }

  if (!posts) {
    return <div>Loading...</div>;
  }

  const users = extractUsers(posts);

  const activeUserId = router.query[activeUserQueryParam]
    ? String(router.query[activeUserQueryParam])
    : users[0].id;

  return (
    <div className="screen">
      <div className="left-column">
        <UserList
          activeUserId={activeUserId}
          users={users}
          onUserClick={(userId) => {
            router.push(`/?${activeUserQueryParam}=${userId}`, undefined, {
              shallow: true,
            });
          }}
        />
      </div>
      <div className="right-column">
        <PostList posts={posts[activeUserId]} />
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .screen {
          display: flex;
          height: 100vh;
        }

        .left-column {
          width: 30%;
          overflow-x: auto;
        }

        .right-column {
          width: 70%;
          overflow-x: auto;
          padding: 0 0 0 ${spacing.lg};
        }

        @media (max-width: 640px) {
          .screen {
            flex-direction: column;
          }

          .left-column {
            width: 100%;
            height: 25%;
          }

          .right-column {
            width: 100%;
            height: 75%;
            padding: ${spacing.lg} 0 0 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PostScreen;
