import { useState } from 'react';

import { useStoryIds, useItems } from '../queries/main';
import { StoryItem } from './StoryItem';
import { UserProfile } from './UserProfile';
import type { StoryType, HNItem } from '../types';

type Props = {
  type: StoryType;
};

export default function StoryList({ type }: Props) {
  const [openComments, setOpenComments] = useState<Set<string>>(new Set());
  const [startIndex, setStartIndex] = useState<number>(0);
  const [profileUser, setProfileUser] = useState<{ username: string; anchor: { top: number; left: number } } | null>(null);

  const { data: storyIds } = useStoryIds(type);

  const itemQueries = useItems(storyIds?.slice(startIndex, startIndex + 30));
  const isLoading = itemQueries.some(query => query.isFetching || query.isLoading);
  const items = itemQueries.map(query => query.data).filter(Boolean) as HNItem[];

  const toggleComments = (id: string) => {
    setOpenComments(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleUsernameClick = (username: string, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setProfileUser({ username, anchor: { top: rect.bottom + window.scrollY, left: rect.left } });
  };

  return (
    <div className='row'>
      <div className='col-12'>
        {profileUser && (
          <UserProfile
            username={profileUser.username}
            anchor={profileUser.anchor}
            onClose={() => setProfileUser(null)}
          />
        )}
        {isLoading ? (
          <h6>Loading...</h6>
        ) : (
          <>
            {items.map((item) => (
              <StoryItem
                key={item.id}
                item={item}
                isSelected={openComments.has(String(item.id))}
                onCommentsClick={() => toggleComments(String(item.id))}
                onUsernameClick={handleUsernameClick}
              />
            ))}

            <div className='mt-4 d-flex flex-row justify-content-start'>
              <span onClick={() => setStartIndex(startIndex - 30)}>
                <h5 className={`text-dark bi bi-arrow-left-short cursor-pointer me-2 ${startIndex === 0 && 'd-none'}`} />
              </span>
              <span onClick={() => setStartIndex(startIndex + 30)}>
                <h5 className={`text-dark bi bi-arrow-right-short cursor-pointer ${startIndex > 300 && 'd-none'}`} />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
