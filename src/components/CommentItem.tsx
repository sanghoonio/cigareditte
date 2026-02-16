import { useState } from 'react';

import { useItem } from '../queries/main';
import { getRelativeTime } from '../utils';
import { CommentTree } from './CommentTree';
import type { HNItem } from '../types';

type Props = {
  id: number;
  depth: number;
  onUsernameClick?: (username: string, e: React.MouseEvent) => void;
};

export function CommentItem({ id, depth, onUsernameClick }: Props) {
  const { data: comment, isLoading } = useItem(id);
  const [collapsed, setCollapsed] = useState(false);

  if (isLoading) return <div className='text-xs text-black-50 mb-1'>Loading...</div>;
  if (!comment || comment.deleted || comment.dead) return null;

  const item = comment as HNItem;
  const kidCount = item.kids?.length || 0;

  return (
    <div className='comment-item' style={{ marginLeft: depth > 0 ? '1rem' : 0 }}>
      <div className='d-flex align-items-baseline mb-0'>
        <span
          className='text-xs cursor-pointer text-black-50 me-1'
          onClick={() => setCollapsed(!collapsed)}
        >
          [{collapsed ? '+' : '-'}]
        </span>
        <span
          className='text-xs fw-medium cursor-pointer text-hover'
          onClick={(e) => onUsernameClick?.(item.by, e)}
        >
          {item.by}
        </span>
        <span className='text-xs text-black-50 ms-1'>
          {getRelativeTime(item.time)}
        </span>
      </div>
      {!collapsed && (
        <>
          <div
            className='comment-text text-xs mb-2'
            dangerouslySetInnerHTML={{ __html: item.text || '' }}
          />
          {kidCount > 0 && (
            <CommentTree
              kidIds={item.kids!}
              depth={depth + 1}
              onUsernameClick={onUsernameClick}
            />
          )}
        </>
      )}
    </div>
  );
}
