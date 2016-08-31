import React from 'react'

export class FillImg extends React.Component {

  render(){
    const { src, onClick, style={}, fillHeight, imageStyle } = this.props;
    var fillStyle = {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0};
    var imgStyle = {
      // paddingBottom: '100%',
      backgroundImage: `url(${src})`,
      backgroundSize: 'contain', //fillHeight ? 'auto 100%' : 'auto', // fill height
      // backgroundSize: 'auto 100%', // fill height
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      ...imageStyle
    };
    var containerStyle = {...fillStyle, ...style};
    return (
      <div style={fillStyle} onClick={onClick} >
        <div style={{...fillStyle, ...imgStyle}} />
        {this.props.children}
      </div>
    )
  }
}