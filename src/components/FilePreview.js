import React from 'react'
import { humanFileSize } from '../utils'
import { Icon } from './Icon'

const host = "http://localhost:8080/api/files"


const SquareImage = ({src, onClick, imageStyle={}, children}) => {
  return (
    <div style={{position: 'relative'}} onClick={onClick}>
        <div style={{
          paddingBottom: '100%',
          backgroundImage: `url("${src}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...imageStyle
        }} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          {children}
        </div>
    </div>
  )
}

export const FilePreview = ({item, showInfo}) => {
  const spanStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
  if (!item.file){
    return (
      <div style={{position: 'relative'}}>
        <SquareImage src={`${host}/${item.id}`} />
      </div>
    )
  } else {
    const progress = Math.floor(item.progress * 10) / 10
    return (
      <div style={{position: 'relative'}}>
        <SquareImage src={item.file.preview} imageStyle={{opacity: 0.5}}>
          <div style={{padding: 4, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white'}}>
            {showInfo && <span style={spanStyle}>{item.file.name}, {humanFileSize(item.file.size)}</span>}
            {showInfo && <br />}
            <Icon name="upload" /> {progress}%
            <div style={{position: 'absolute', left: 0, bottom: 0, height: 3, backgroundColor: '#6ebaf7', width: `${progress}%`}} />
          </div>
        </SquareImage>
      </div>
    )
  }
}