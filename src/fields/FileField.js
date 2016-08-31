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
    const { files, onReorder, onItemClick, selected, disableReorder=false } = this.props
    // console.log("files", files)
        // lock='horizontal'
    return (
      <Reorder
        itemKey='id'
        holdTime={0}
        list={files}
        template={FilePreview}
        callback={onReorder}
        listClass='c-file-grid'
        itemClass='c-file-grid__item'
        itemClicked={onItemClick}
        selected={selected}
        selectedKey='id'
        disableReorder={disableReorder}/>
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

    this.state = {
      files: props.value || []
    }

    this.onDrop = this.onDrop.bind(this)  
    this.onProgress = this.onProgress.bind(this)
  }

  onProgress(file, res){
    // console.log("onProgress", file)
    if (res){
      console.log("res", res)
      const localId = file.id
      const newFile = {
        ...file,
        ...res
      }
      // Finished !!!
      this.setState({
        files: this.state.files.map(f => (
          localId == f.id ? newFile : f 
        ))
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
    console.log('onDrop', files);
    console.log("UploadManager.instance()", UploadManager.instance())
    const fileUploads = UploadManager.instance().addFiles(files, this.onProgress)
    this.setState({
      files: [...this.state.files, ...fileUploads]
    })

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
    const { id, name, label, hint, placeholder, onPaste, value=[] } = this.props

    const text = "Drop file here"
    const files = this.state.files
    return (
      <FieldContainer {...this.props}>
        <div style={{minHeight: 100, width: '100%'}}>
          <Dropzone onDrop={this.onDrop} 
                    multiple={true}
                    inputProps={{
                      id
                    }} 
                    accept="image/*"
                    style={dropzoneStyle}
                    activeStyle={activeStyle}
                    rejectStyle={rejectStyle}
                    >
            {files.length > 0 
                ? <FileList files={files} />
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