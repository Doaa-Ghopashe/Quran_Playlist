import React , { useEffect, useState } from 'react'
import $ from "jquery"
import NotFoundPage from './../pages/NotFound';
export default function Pagination(props) {
  const [limitPerPage] = useState(4);
  const paginationSize = 7;
  let [numofpages, setNumOfPages] = useState(0);
  let [currentpage , setCurrentPages] = useState(1);
  useEffect(()=>{
    setCurrentPages(1);
    $(".cardbox").hide().slice((currentpage - 1 ) * limitPerPage, currentpage * limitPerPage).show();
    setNumOfPages(Math.ceil(props.datalength/limitPerPage));
  } , [props.datalength])

  const handleClick = (e) =>{
    setCurrentPages(parseInt(e.target.textContent));
    $('.page-item').removeClass("active")
    $(`#page${e.target.textContent}`).addClass("active")
  }

  const moveNext = () => {
    if(!$("#next-page").hasClass("disable")) {
      let current = currentpage + 1;
      setCurrentPages(current);
      $('.page-item').removeClass("active")
      $(`#page${current}`).addClass("active")
    }
  }

  const movePrev = () => {
    if(!$("#previous-page").hasClass("disable")){
      setCurrentPages(currentpage - 1)
      $('.page-item').removeClass("active")
      $(`#page${currentpage-1}`).addClass("active")
    }
  }

  const returnpageitems = (prop) => {

    const numlist = []
    for(let i = 1 ; i <= prop ; i++) numlist.push(i);
    return(numlist.map((num) => {
      
      $(".cardbox").hide().slice((currentpage - 1 ) * limitPerPage, currentpage * limitPerPage).show();

      $("#previous-page").toggleClass("disable", currentpage == 1);
      $("#next-page").toggleClass("disable", currentpage == numofpages);
      return(
        <li className={`page-item ${num==1&&"active"}`} id={`page${num}`} key={num} onClick={handleClick}>
          <a className="page-link text-dark rounded-circle mx-1" href="#">{num}</a>
        </li>
        )
    })) 
  }
  return (
    <>
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" id="previous-page">
          <a className=" btn btn-light text-dark mr-2 rounded-circle" onClick={movePrev}><i className="fa-solid fa-angles-left"></i></a>
        </li>
        {numofpages>0?returnpageitems(numofpages):null}
        <li className="page-item" id="next-page">
          <a className="btn btn-light text-dark ml-2 rounded-circle" onClick={moveNext}><i className="fa-solid fa-angles-right"></i></a>
        </li>
      </ul>
    </nav>
    </>
  )
}
