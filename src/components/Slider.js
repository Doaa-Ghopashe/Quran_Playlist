import React, { useEffect, useState } from 'react'
export default function Slider(props) {
  let root = document.documentElement;
  useEffect(()=>{
    let slider = document.querySelector(".slider")
    setTimeout(()=>{
      root.style.setProperty("--slide-right" , slider.offsetWidth+100 + "px");
    } , 25000)
     root.style.setProperty("--slide-left" ,"-" + slider.offsetWidth-100 + "px");
  } , []);

  return (
    <>
    <div className="slider overflow-hidden">
      <p className='text-center '>سورة { props.surahname } بصوت القارئ { props.readername }</p> 
    </div>
    </>
  )
}
