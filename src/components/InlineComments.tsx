import { useState } from 'react';

import { useItem } from '../queries/main';
import { CommentTree } from './CommentTree';
import { UserProfile } from './UserProfile';
import type { HNItem } from '../types';

type Props = {
  itemId: string;
  onClose: () => void;
};

export function InlineComments({ itemId, onClose }: Props) {
  const { data: item } = useItem(itemId);
  const [profileUser, setProfileUser] = useState<{ username: string; anchor: { top: number; left: number } } | null>(null);

  const handleUsernameClick = (username: string, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setProfileUser({ username, anchor: { top: rect.bottom + window.scrollY, left: rect.left } });
  };

  const hnItem = item as HNItem | undefined;

  return (
    <div className='mb-3 mt-1 rounded p-3 inline-comments-card'>
      {profileUser && (
        <UserProfile
          username={profileUser.username}
          anchor={profileUser.anchor}
          onClose={() => setProfileUser(null)}
        />
      )}
      <div className='d-flex align-items-center mb-2'>
        <a
          className='text-xs text-black-50 text-decoration-none me-2'
          href={`https://news.ycombinator.com/item?id=${itemId}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          [view on hn]
        </a>
        <span className='text-xs text-black-50 cursor-pointer' onClick={onClose}>
          [close]
        </span>
      </div>
      {hnItem?.text && (
        <div
          className='comment-text text-xs mb-2 pb-2'
          dangerouslySetInnerHTML={{ __html: hnItem.text }}
        />
      )}
      {hnItem?.kids ? (
        <CommentTree
          kidIds={hnItem.kids}
          depth={0}
          onUsernameClick={handleUsernameClick}
        />
      ) : (
        <p className='text-xs text-black-50 mb-0'>{hnItem ? 'No comments yet.' : 'Loading...'}</p>
      )}
    </div>
  );
}
