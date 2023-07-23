import React, { useState } from "react";

function NotFoundPage (props){
    return (
     <>
      <div className="notfound">
        <p>
          Sorry, there is no surah name called "<span className="searchword">{props.surahname}</span>"
          <br/>
           please, try again with other surah name
          <br/>
           thanks <i className="fa-regular fa-face-smile text-dark"></i>
        </p>
      </div>
     </>
    )
}
export default NotFoundPage