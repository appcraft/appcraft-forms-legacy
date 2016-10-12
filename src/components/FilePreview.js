import React from 'react'
import { humanFileSize } from '../utils'
import { Icon } from './Icon'


// const baseUrl = "http://images.cyrillejoubert-talents.com/api/files"
const host = REST_API + "/api/files"


const RatioImage = ({src, onClick, imageStyle={}, children, ratio=1}) => {
  return (
    <div style={{position: 'relative'}} onClick={onClick}>
        <div style={{
          paddingBottom: `${100/ratio}%`,
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

const RatioThumbnail = ({fileId, width=250, ratio=1}) => {
  const height = Math.floor(width / ratio)
  return <RatioImage src={`${host}/${fileId}/thumbnail/?w=${width}&h=${height}&auto`} ratio={ratio} />
}

export const FilePreview = ({item, showInfo, square=true, ratio, onRemove}) => {
  const spanStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
  if (!item.file){
    return (
      <div style={{position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        {square 
          ? <RatioImage src={`${host}/${item.id}`} />
          : (ratio
            ? <RatioThumbnail fileId={item.id} ratio={ratio} />
            : <img src={`${host}/${item.id}/thumbnail/?w=250`} style={{width: '100%'}} />)}   
         <span type="button" 
               className="c-button c-button--close"
               style={{position: 'absolute', top: 0, right: 0, color: 'white', padding: '4px 8px 8px 8px'}}
               onMouseDown={(e) => e.stopPropagation()} 
               onClick={(e) => {
                 e.preventDefault()
                 e.stopPropagation()
                 onRemove(item)
                } }>×</span>
      </div>
    )
  } else {
    const progress = Math.floor(item.progress * 10) / 10
    return (
      <div style={{position: 'relative'}}>
        <RatioImage src={item.file.preview} imageStyle={{opacity: 0.5}}>
          <div style={{padding: 4, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white'}}>
            {showInfo && <span style={spanStyle}>{item.file.name}, {humanFileSize(item.file.size)}</span>}
            {showInfo && <br />}
            <Icon name="upload" /> {progress}%
            <div style={{position: 'absolute', left: 0, bottom: 0, height: 3, backgroundColor: '#6ebaf7', width: `${progress}%`}} />
          </div>
        </RatioImage>
      </div>
    )
  }
}