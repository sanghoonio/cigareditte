import { useState } from 'react';
import { CommentItem } from './CommentItem';

type Props = {
  kidIds: number[];
  depth: number;
  onUsernameClick?: (username: string, e: React.MouseEvent) => void;
};

const AUTO_EXPAND_DEPTH = 3;

export function CommentTree({ kidIds, depth, onUsernameClick }: Props) {
  const [expanded, setExpanded] = useState(depth < AUTO_EXPAND_DEPTH);

  if (!kidIds.length) return null;

  if (!expanded) {
    return (
      <div
        className='text-xs text-black-50 cursor-pointer mb-2'
        style={{ marginLeft: depth > 0 ? '1rem' : 0 }}
        onClick={() => setExpanded(true)}
      >
        [{kidIds.length} {kidIds.length === 1 ? 'reply' : 'replies'}]
      </div>
    );
  }

  return (
    <div>
      {kidIds.map((id) => (
        <CommentItem
          key={id}
          id={id}
          depth={depth}
          onUsernameClick={onUsernameClick}
        />
      ))}
    </div>
  );
}
