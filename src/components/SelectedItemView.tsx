type Props = {
  selectedURL: string; 
  setSelectedURL: (url: string | null) => void;
  setSelectedIndex: (index: number | null) => void;
}

export function SelectedItemView(props: Props) {
  const { selectedURL, setSelectedURL, setSelectedIndex } = props;

  return (
    <div 
    className='border rounded shadow' 
    style={{
      position: 'fixed',
      top: '1.5rem',
      right: '2vw',
      width: '46vw',
      height: 'calc(100vh - 3rem)',
      zIndex: 1000
    }}
  >
    <div
      className='bg-body-tertiary rounded-top d-flex align-items-center justify-content-between px-2'
      style={{
        height: '2rem'
      }}
    >
      <button className='btn btn-light btn-xs'>
        <a className='text-decoration-none text-dark' href={selectedURL} target='_blank' rel='noopener noreferrer'>
          Open in New Tab
        </a>
      </button>
      <button className='btn btn-danger btn-xs ms-auto' onClick={() => {
        setSelectedURL(null)
        setSelectedIndex(null)
      }}>
        Close
      </button>
    </div>
    <iframe 
      className='rounded-bottom border-top' 
      src={selectedURL} 
      style={{
        width: '100%',
        height: 'calc(100% - 2rem)'
      }}
    />
  </div>
  )
}
