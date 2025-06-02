import { useState } from 'react';

import { useBestItems, useItems } from '../queries/main';
import { getRelativeTime } from '../utils';
import { SelectedItemView } from './SelectedItemView';

function best() {
  const [selectedURL, setSelectedURL] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [startIndex, setStartIndex] = useState<number>(0)

  const { data: bestItems } = useBestItems();

  const bestItemDetails = useItems(bestItems?.slice(startIndex, startIndex + 30));
  const isLoading = bestItemDetails.some(query => query.isLoading);
  const bestItemsData = bestItemDetails.map(query => query.data);

  if (isLoading) {
    return <div className='row'><h6>Loading...</h6></div>;
  }

  return (
    <div className='row'>
      <div className='col-12 col-lg-5'>

        {bestItemsData.map((item) => 
          <div className='mb-2 position-relative text-dark'>
            <h6 className={`mb-0 cursor-pointer desktop item ${selectedItem === item?.id ? 'fw-bold' : ''}`} onClick={() => {
              if (!selectedItem && !item?.url) {
                setSelectedURL(null)
                setSelectedItem(item?.id)
              } else if ((selectedItem === item?.id) && (!!item?.url)) {
                setSelectedURL(null)
                setSelectedItem(null)
              } else {
                setSelectedURL(item?.url)
                setSelectedItem(item?.id)
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

        <div className='mt-4 d-flex flex-row justify-content-start gap-1'>
          <span onClick={() => setStartIndex(startIndex - 30)}>
            <h5 className={`text-dark bi bi-arrow-left-short cursor-pointer ${startIndex === 0 && 'd-none'}`} /> 
          </span>
          <span onClick={() => setStartIndex(startIndex + 30)}>
            <h5 className={`text-dark bi bi-arrow-right-short cursor-pointer ${startIndex > 300 && 'd-none'}`} />
          </span>
        </div>

      </div>
      <div className='col-7 desktop'>
        {!!selectedItem && <SelectedItemView selectedURL={selectedURL} selectedItem={selectedItem} setSelectedURL={setSelectedURL} setSelectedItem={setSelectedItem}/>}
      </div>
    </div>
  )
}

export default best;
