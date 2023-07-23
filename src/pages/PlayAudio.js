import React ,{useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Audio from '../components/Audio';
import Slider from '../components/Slider';
import db from "../API/db.json"
export default function PlayAudio() {
  let {readername,surahname} = useParams();
  let [data, setData] = useState([]);
  useEffect(()=>getData(),[])

  let getData = ()=>{
    let SETVar = new Set(db.playlist.map(p=>(p.readernameEN==readername && p.surahEN == surahname)&& p));
      SETVar.delete(false);
      setData(Array.from(SETVar));
  } 
  
  return (
    <>
    {data.map((item)=>{
      return(
        <div className='container' key={item.id}>
          <div className='Audioplay'>
            <div className='col-xl-6'>
              <div className='audiobox text-center'>
                <div className='titleoverlay'>{item.surahAR}</div>
              </div>
            </div>
            <div className='col-xl-6'>
              <Slider readername={item.readernameAR} surahname={item.surahAR}/>
            </div>
            <div className='col-xl-6'>
              <Audio audiosrc={item.surahaudio}/>
            </div>
          </div>
        </div>
      )
    })}
    </>
  )
}