import React from 'react';
import { color, spacing } from '../../styles/theme';
import User from './User';

export const e2eIds = {
  userList: 'user-list',
  user: 'user-list-user',
};

const UserList = ({
  activeUserId,
  users,
  onUserClick,
}: {
  activeUserId: string;
  users: User[];
  onUserClick: (userId: string) => void;
}) => {
  return (
    <div className="list" data-e2e={e2eIds.userList}>
      {users.map((user) => (
        <button
          className={`user ${user.id === activeUserId ? 'active' : ''}`}
          key={user.id}
          onClick={() => onUserClick(user.id)}
          data-e2e={e2eIds.user}
        >
          <span>{user.name}</span>
          <span className="badge">{user.numberOfPosts}</span>
        </button>
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .list {
          display: flex;
          flex-direction: column;
        }

        .user {
          display: flex;
          justify-content: space-between;
          padding: ${spacing.md} ${spacing.lg};
          margin-bottom: ${spacing.md};
          align-items: center;
        }

        .user.active,
        .user:hover {
          background: ${color.brandLight};
        }

        .badge {
          background: ${color.brand};
          padding: ${spacing.md};
          color: ${color.white};
          border-radius: 100%;
        }
      `}</style>
    </div>
  );
};

export default UserList;
