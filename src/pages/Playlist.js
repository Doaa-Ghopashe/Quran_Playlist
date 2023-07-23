import React, { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom';
import $ from "jquery"
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import NotFoundPage from './NotFound';
import db from "../API/db.json"
export default function Playlist() {
  let [data , setData] = useState([]);
  let {readername} = useParams();
  let [temp] = useState(new Set());
  let [searchword , setSearchWord] = useState('');
  let getData = ()=>{
      let SETVar = new Set(db.playlist.map(p=>(p.readernameEN==readername)&&p));
      SETVar.delete(false);
      setData(Array.from(SETVar));
  }
  useEffect(()=>{
    getData();
    document.getElementById("searchword").value = ""
    setSearchWord('')
  },[readername])

  if(data.length > 1){
    data.sort((a ,b) => a.surahnum- b.surahnum)
  }

  let handleChange = (e)=>{
    temp.clear()
    setSearchWord(e.target.value);
  }
  return (
    <>
    <div className='container'>
      <div className="searchbox">
        <input type="text" id="searchword" className="form-control"onChange={handleChange} placeholder="Enter surah name "/>
      </div>
      <div className='cards-container row'>
        {
        data.map((Item)=>{
          let surahname = Item.surahEN;
          if(surahname.toLowerCase().includes(searchword.trim())){
            temp.add(Item.surahEN);
            return(
              <div className='col-xl-3 col-md-6 pt-5 cardbox' key={Item.surahEN}>
                <Link to={`/playlist/${Item.readernameEN}/${Item.surahEN}`}>
                  <Card data={Item}/>
                </Link>
              </div>
            )
          }
        })
        }
      </div>
      
      {temp.size > 0 ? <div className='pagination py-0 justify-content-center'><Pagination datalength={temp.size}/></div>:<NotFoundPage surahname={searchword}/>}
      
    </div>
    </>
  )
}
