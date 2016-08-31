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

export const FilePreview = ({item}) => {
  if (item.state === "uploaded"){
    return (
      <div style={{position: 'relative'}}>
        <SquareImage src={`${host}/${item.id}`}>
          <div style={{padding: 4, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white'}}>
            {item.filename}, {humanFileSize(item.filesize)}<br />
            <Icon name="check" /> Uploaded
          </div>
        </SquareImage>
      </div>
    )
  } else {
    return (
      <div style={{position: 'relative'}}>
        <SquareImage src={item.file.preview} imageStyle={{opacity: 0.5}}>
          <div style={{padding: 4, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white'}}>
            {item.file.name}, {humanFileSize(item.file.size)}<br />
            <Icon name="upload" /> {item.progress}%
          </div>
        </SquareImage>
      </div>
    )
  }
}