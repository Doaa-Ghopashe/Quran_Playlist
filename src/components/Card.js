import React from 'react'

export default function Card(props) {

  return (
    <div className='card'>
      <div className='card-img'>
        <div className='titleoverlay'>
          <h1>سورة {props.data.surahAR}</h1>
        </div>
        <img src={props.data.imgsrc} alt=""/>
      </div>
      <div className='card-body'>
        <div className='card-title'>
          <h3>{props.data.surahEN}</h3>
        </div>
      </div>
    </div>
  )
}
