import React, { ReactNode, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import ExpiredTokenError from '../api/ExpiredTokenError';
import { useAuth } from '../auth/AuthServiceProvider';
import { fetchPosts, FetchPostsResponse } from '../api/apiRepository';
import { spacing } from '../../styles/theme';
import Button from '../elements/Button';
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

const DirectionButton = ({
  children,
  onClick,
  active,
}: {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <Button
      onClick={onClick}
      className={`direction-button ${active ? 'active' : ''}`}
      variant={active ? 'brand' : 'dark'}
    >
      {children}
    </Button>
  );
};

const PostScreen = () => {
  const router = useRouter();
  const { initiateReauthorization, token } = useAuth();
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');
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

  const activeUserPosts =
    direction === 'ASC'
      ? posts[activeUserId]
      : posts[activeUserId]?.slice().reverse();

  return (
    <div className="screen">
      <div className="topbar">
        <div className="buttons">
          <DirectionButton
            onClick={() => setDirection('ASC')}
            active={direction === 'ASC'}
          >
            ↑
          </DirectionButton>
          <DirectionButton
            onClick={() => setDirection('DESC')}
            active={direction === 'DESC'}
          >
            ↓
          </DirectionButton>
        </div>
      </div>
      <div className="columns">
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
          <PostList posts={activeUserPosts} />
        </div>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .screen {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .topbar {
          display: flex;
          flex: 0 0 50px;
          justify-content: center;
          align-items: center;
        }

        .buttons > :global(*) {
          margin: ${spacing.xs};
        }

        .columns {
          display: flex;
          flex: 1;
          min-height: 0;
        }

        .left-column {
          flex: 0 0 30%;
          overflow-x: auto;
        }

        .right-column {
          flex: 0 0 70%;
          overflow-x: auto;
          padding: 0 0 0 ${spacing.lg};
        }

        @media (max-width: 640px) {
          .columns {
            flex-direction: column;
          }

          .left-column {
            flex: 0 0 25%;
          }

          .right-column {
            width: 100%;
            flex: 0 0 75%;
            padding: ${spacing.lg} 0 0 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PostScreen;
