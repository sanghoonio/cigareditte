import { useState } from 'react';

import { useNewItems, useItems } from '../queries/main';
import { getRelativeTime } from '../utils';
import { SelectedItemView } from './SelectedItemView';

function New() {
  const [selectedURL, setSelectedURL] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  
  const { data: newItems } = useNewItems();

  const newItemDetails = useItems(newItems?.slice(0, 30));
  const newItemsData = newItemDetails.map(query => query.data);

  return (
    <div className='row'>
      <div className='col-5'>

        {newItemsData.map((item, index) => 
          <div className='mb-2 position-relative text-dark'>
            <h6 className={`mb-0 cursor-pointer desknew ${selectedIndex == index ? 'fw-bold' : ''}`} onClick={() => {
              if (selectedURL == item?.url) {
                setSelectedURL(null)
                setSelectedIndex(null)
              } else {
                setSelectedURL(item?.url)
                setSelectedIndex(index)
              }
            }}
            >{item?.title}</h6>
            <a className='text-decoration-none text-dark mobile' href={item?.url} target='_blank' rel='noopener noreferrer'>
              <h6 className='mb-0'>{item?.title}</h6>
            </a>
            <div className='text-xs'>
              <p className='fw-medium'>{item?.score} points by {item?.by} {getRelativeTime(item?.time)} | {item?.descendants} comments</p>
            </div>
          </div>
        )}

      </div>
      <div className='col-7'>
        {!!selectedURL && <SelectedItemView selectedURL={selectedURL} setSelectedURL={setSelectedURL} setSelectedIndex={setSelectedIndex}/>}
      </div>
    </div>
  )
}

export default New;
