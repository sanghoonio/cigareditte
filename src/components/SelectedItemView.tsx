type Props = {
  selectedURL: string | null; 
  selectedItem: string | null;
  setSelectedURL: (url: string | null) => void;
  setSelectedItem: (item: string | null) => void;
}

export function SelectedItemView(props: Props) {
  const { selectedURL, selectedItem, setSelectedURL, setSelectedItem } = props;

  return (
    <div className='border rounded shadow selected-item-view'>
      <div
        className='bg-body-tertiary rounded-top d-flex align-items-center justify-content-between px-2'
        style={{
          height: '2rem'
        }}
      >
        <button className='btn btn-secondary btn-xs'>
          <a className='text-decoration-none text-white' href={'https://news.ycombinator.com/item?id=' + selectedItem} target='_blank' rel='noopener noreferrer'>
            View on HN
          </a>
        </button>
        <button className='btn btn-secondary btn-xs ms-auto'>
          <a className='text-decoration-none text-white' href={selectedURL ? selectedURL : 'https://news.ycombinator.com/item?id=' + selectedItem} target='_blank' rel='noopener noreferrer'>
            Open in New Tab
          </a>
        </button>
        <button className='btn btn-danger btn-xs ms-1' onClick={() => {
          setSelectedURL(null)
          setSelectedItem(null)
        }}>
          Close
        </button>
      </div>
      <iframe 
        className='rounded-bottom border-top bg-white' 
        src={selectedURL ? selectedURL : 'https://news.ycombinator.com/item?id=' + selectedItem} 
        style={{
          width: '100%',
          height: 'calc(100% - 2rem)'
        }}
        onError={() => console.log('fuck')}
      />
    </div>
  )
}
