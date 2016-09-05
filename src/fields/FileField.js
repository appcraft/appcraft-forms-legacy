import React from 'react'
import { Field } from './Field'
import { FieldContainer } from '../components/FieldContainer'
import { FilePreview } from '../components/FilePreview'


import randomId from '../utils/randomId'
import Dropzone from 'react-dropzone';
import UploadManager from '../managers/UploadManager'
import Reorder from 'react-reorder'
export const Center = ({children, ...props}) => (
    <div {...props} className="u-center-block__content">{children}</div>
)

const dropzoneStyle = {
  width: '100%', minHeight: 100,
  border: '2px dashed rgb(102, 102, 102)',
  borderRadius: 4,
  transition: "all 0.5s"
}
const activeStyle = {
  border: '2px solid #4FC47F'
}
const rejectStyle = {
  border: '2px solid #DD3A0A'
}


class FileList extends Field {
  render(){
    const { files, onReorder, onItemClick, selected, disableReorder=false, multiple, showInfo, square, ratio, gridSize=3 } = this.props
    // console.log("files", files)
        // lock='horizontal'

    if (!multiple && files.length > 0){
      return (
        <div className="c-file-grid">
          <div className="c-file-grid__single">
            <FilePreview item={files[0]} square={square} ratio={ratio} />
          </div>
        </div>
      )
    }

    return (
      <Reorder
        itemKey='id'
        holdTime={0}
        list={files}
        template={(props) => <FilePreview square={square} ratio={ratio} {...props} />}
        callback={onReorder}
        sharedProps={{showInfo}}
        listClass='c-file-grid'
        itemClass={multiple ? ('c-file-grid__item c-file-grid__item--1-' + gridSize) : 'c-file-grid__single'}
        itemClicked={onItemClick}
        selected={selected}
        selectedKey='id'
        disableReorder={disableReorder || !multiple}/>
    )
    // return (
    //   <div>
    //     {files.map(file => (
    //       <div>{file.id}</div>
    //     ))}
    //   </div>
    // )
  }
}

export class FileField extends Field {

  constructor(props){
    super(props)

    const files = props.value || []

    this.state = {
      files: Array.isArray(files) ? files : [files]
    }

    this.onDrop = this.onDrop.bind(this)  
    this.onProgress = this.onProgress.bind(this)
  }

  onProgress(file, res){
    if (res){ // Request finished !!
      // console.log("res", res)
      const localId = file.id
      const newFile = {
        ...res
      }

      // Finished !!!
      const files = this.state.files.map(f => (
        localId == f.id ? newFile : f 
      ))
      this.setState({ files}, () => {
        const { name, onChange, multiple } = this.props
        // Report finished uploads
        const finishedFiles = files.filter(f => !f.file)
        console.log("finishedFiles", finishedFiles)
        if (multiple){
          onChange(name, finishedFiles)
        } else if(finishedFiles.length > 0) {
          onChange(name, finishedFiles[0])
        }
      })
    } else {
      this.setState({
        files: this.state.files.map(f => (
          file.id == f.id ? file : f 
        ))
      })
    }
  }

  onDrop(files) {
    const { multiple=false } = this.props
    // console.log('onDrop', files);
    // console.log("UploadManager.instance()", UploadManager.instance())
    if (multiple){ // Enqueue all new files and append to current ones
      const fileUploads = UploadManager.instance().addFiles(files, this.onProgress)
      this.setState({
        files: [...this.state.files, ...fileUploads]
      })
    } else { // Single file upload, just 1, sorry
      const fileUpload = UploadManager.instance().addFile(files[0], this.onProgress)
      this.setState({
        files: [fileUpload]
      })
    }

    // const progress = files.map(file => ({
    //   id: guid(),
    //   progress: 0,
    //   convertProgress: 0,
    //   file
    // }))
    // console.log('progress', progress)
    // this.setState({
    //   files: [...this.state.files, ...progress]
    // })
    // progress.forEach(file => {
    //   upload(file.id, file.file, function(err, res){
    //     console.log('upload finished', res);
    //     // if (onChange){
    //     //   onChange(name, res.url);
    //     // }
    //   }, (progress) => {
    //     const files = [...this.state.files]
    //     files.forEach((f, idx) => {
    //       if (f.id == file.id){
    //         files[idx] = {
    //           ...f,
    //           progress
    //         }
    //       }
    //     })
    //     this.setState({files})
    //   });
    // })
    // if (onChange){
    //   onChange(name, file);
    // }
  }


  render(){
    const { id, multiple, height=100, square, ratio, gridSize } = this.props

    const text = multiple ? "Drop files here" : "Drop file here"
    const files = this.state.files
    console.log("ratio", ratio)
                    // accept="image/*"
    return (
      <FieldContainer {...this.props}>
        <div style={{minHeight: height, width: '100%'}}>
          <Dropzone onDrop={this.onDrop} 
                    multiple={true}
                    inputProps={{
                      id
                    }} 
                    style={{...dropzoneStyle, minHeight: height}}
                    activeStyle={activeStyle}
                    rejectStyle={rejectStyle}
                    >
            {files.length > 0 
                ? <FileList files={files} multiple={multiple} square={square} ratio={ratio} gridSize={gridSize}/>
                : <div style={{textAlign: 'center'}}><Center>{text}</Center></div>
            }
          </Dropzone>
        </div>
{/*
        <input id={id} 
              className="c-field" 
              type="text"
              placeholder={placeholder} 
              onChange={this.onChange}
              onPaste={onPaste}
              value={value} />
        {hint && <div className="c-hint a-hint">{hint}</div>}*/}
      </FieldContainer>
    )
  }
}