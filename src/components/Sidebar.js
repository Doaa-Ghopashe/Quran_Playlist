import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import db from "../API/db.json"
export default function Sidebar() {
    let [data , setData] = useState([]);
    
    let getData = () => {
        let SETVar = new Set(db.playlist.map(p=>p.readernameEN));
        setData(Array.from(SETVar));
    }
    useEffect(()=>{
        getData();
    } , [])
  

    return (
        <div className="Sidebar navbar-expand-lg display-flex">
            <Link to="/" className='homelink'>
                <div className='Title'>
                    <div className='row   justify-content-center align-items-center'>
                        <div className='col-xl-12 '>
                            <h2>Quran Kareem</h2>
                        </div>
                        <div className='col-xl-4 col-md-5'>
                            <div className='site-logo'>
                                <img src="https://www.freepnglogos.com/uploads/al-quran-png/al-quran-the-quran-and-itret-asre-zohur-cultural-institute-arak-19.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <button className='navbar-toggler text-white' type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="fa-solid fa-bars"></i></button>
            <div className="readerlist collapse navbar-collapse" id="navbarSupportedContent">
                <ul className='list-unstyled p-0'>
                    {data.map((Item)=>{
                        return(
                            <li className='reader' key={Item}>
                                <Link to={`playlist/${Item}`}>{Item}</Link>
                            </li>
                        );
                    })}
                    
                </ul>
            </div>
        </div>
    )
}
