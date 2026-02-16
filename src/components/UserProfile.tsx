import { useEffect, useRef } from 'react';
import { useUser } from '../queries/main';
import { getRelativeTime } from '../utils';

type Props = {
  username: string;
  anchor: { top: number; left: number };
  onClose: () => void;
};

export function UserProfile({ username, anchor, onClose }: Props) {
  const { data: user, isLoading } = useUser(username);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={cardRef}
      className='user-profile-card border rounded shadow bg-white p-3'
      style={{
        position: 'absolute',
        top: anchor.top,
        left: anchor.left,
        zIndex: 100000,
        minWidth: '220px',
        maxWidth: '300px',
      }}
    >
      {isLoading ? (
        <p className='mb-0 text-xs'>Loading...</p>
      ) : user ? (
        <>
          <h6 className='mb-1 fw-medium'>{user.id}</h6>
          <p className='mb-1 text-xs'>{user.karma.toLocaleString()} karma · joined {getRelativeTime(user.created)}</p>
          {user.about && (
            <p
              className='mb-1 text-xs user-profile-about'
              dangerouslySetInnerHTML={{ __html: user.about }}
            />
          )}
          <a
            className='text-xs text-decoration-none'
            href={`https://news.ycombinator.com/user?id=${user.id}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            View on HN
          </a>
        </>
      ) : (
        <p className='mb-0 text-xs'>User not found</p>
      )}
    </div>
  );
}
