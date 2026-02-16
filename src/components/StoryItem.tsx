import { getRelativeTime, extractDomain } from '../utils';
import { InlineComments } from './InlineComments';
import type { HNItem } from '../types';

type Props = {
  item: HNItem;
  isSelected: boolean;
  onCommentsClick: () => void;
  onUsernameClick?: (username: string, e: React.MouseEvent) => void;
};

export function StoryItem({ item, isSelected, onCommentsClick, onUsernameClick }: Props) {
  const domain = extractDomain(item.url);
  const hnUrl = `https://news.ycombinator.com/item?id=${item.id}`;

  return (
    <div className='mb-2 position-relative text-dark'>
      <h6 className={`mb-0 d-inline-block ${isSelected ? 'fw-bold' : ''}`}>
        <a
          className='text-dark text-hover cursor-pointer inherit-weight'
          href={item.url || hnUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          {item.title}
        </a>
        {domain && <span className='fw-light text-black-50 text-xs ms-1'>({domain})</span>}
      </h6>
      <div className='text-xs'>
        <p className='fw-medium'>
          {item.score} points by{' '}
          <span
            className='cursor-pointer text-hover'
            onClick={(e) => onUsernameClick?.(item.by, e)}
          >
            {item.by}
          </span>{' '}
          {getRelativeTime(item.time)}
          {item.descendants != null && (
            <>
              {' | '}
              <span className='cursor-pointer text-hover' onClick={onCommentsClick}>
                {item.descendants} comments
              </span>
            </>
          )}
        </p>
      </div>
      {isSelected && (
        <InlineComments itemId={String(item.id)} onClose={onCommentsClick} />
      )}
    </div>
  );
}
