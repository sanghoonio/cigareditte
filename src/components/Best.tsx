import { useState } from 'react';

import { useBestItems, useItems } from '../queries/main';
import { getRelativeTime } from '../utils';
import { SelectedItemView } from './SelectedItemView';

function best() {
  const [selectedURL, setSelectedURL] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const { data: bestItems } = useBestItems();

  const bestItemDetails = useItems(bestItems?.slice(0, 30));
  const isLoading = bestItemDetails.some(query => query.isLoading);
  const bestItemsData = bestItemDetails.map(query => query.data);

  if (isLoading) {
    return <div className='row'><h6>Loading...</h6></div>;
  }

  return (
    <div className='row'>
      <div className='col-12 col-lg-5'>

        {bestItemsData.map((item, index) => 
          <div className='mb-2 position-relative text-dark'>
            <h6 className={`mb-0 cursor-pointer desktop item ${selectedIndex == index ? 'fw-bold' : ''}`} onClick={() => {
              if (selectedURL == item?.url) {
                setSelectedURL(null)
                setSelectedIndex(null)
              } else {
                setSelectedURL(item?.url)
                setSelectedIndex(index)
              }
            }}
            >{item?.title}</h6>
            <a className='text-decoration-none text-dark mobile item' href={item?.url} target='_blank' rel='noopener noreferrer'>
              <h6 className='mb-0'>{item?.title}</h6>
            </a>
            <div className='text-xs'>
              <p className='fw-medium'>{item?.score} points by {item?.by} {getRelativeTime(item?.time)} | {item?.descendants} comments</p>
            </div>
          </div>
        )}

      </div>
      <div className='col-7 desktop'>
        {!!selectedURL && <SelectedItemView selectedURL={selectedURL} setSelectedURL={setSelectedURL} setSelectedIndex={setSelectedIndex}/>}
      </div>
    </div>
  )
}

export default best;
