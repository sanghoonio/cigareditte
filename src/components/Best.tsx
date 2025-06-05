import { useState } from 'react';

import { useBestItems, useItems } from '../queries/main';
import { getRelativeTime } from '../utils';
import { SelectedItemView } from './SelectedItemView';

function Best() {
  const [selectedURL, setSelectedURL] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [startIndex, setStartIndex] = useState<number>(0)

  const { data: bestItems } = useBestItems();

  const bestItemDetails = useItems(bestItems?.slice(startIndex, startIndex + 30));
  const isLoading = bestItemDetails.some(query => query.isFetching || query.isLoading);
  const bestItemsData = bestItemDetails.map(query => query.data);

  return (
    <div className='row'>
      <div className='col-12 col-lg-5'>
        {!!selectedItem && <SelectedItemView selectedURL={selectedURL} selectedItem={selectedItem} setSelectedURL={setSelectedURL} setSelectedItem={setSelectedItem}/>}
        {isLoading ? (
          <h6>Loading...</h6>
        ) : (
          <>
            {bestItemsData.map((item) => 
              <div className='mb-2 position-relative text-dark' key={item?.id}>
                <h6 className={`mb-0 cursor-pointer d-inline-block ${selectedItem === item?.id ? 'fw-bold' : ''}`} onClick={() => {
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
                <div className='text-xs'>
                  <p className='fw-medium'>{item?.score} points by {item?.by} {getRelativeTime(item?.time)} | {item?.descendants} comments</p>
                </div>
              </div>
            )}

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
  )
}

export default Best;
