import React, { useState , useEffect, useRef} from 'react'
import $ from 'jquery'
const Audio = (props) => {
    const root = document.documentElement; 
    const audioplayer = useRef(); 
    const progressbar = useRef(); 
    const progressvolume = useRef();
    const animationRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const[ismute , setIsMute] = useState(false);
    const [duration , setDuration] = useState(0); 
    const [currenttime , setCurrentTime] = useState(0) 
    const [bufferedAmount , setBufferedAmount] = useState(0);

    useEffect(()=>{ 
        if(props.audiosrc.readyState > 0)
        {
            const seconds = Math.floor(audioplayer.current.duration) 
            setDuration(seconds) 
            progressbar.current.max = seconds;
            const bufferes = Math.floor(audioplayer.current.buffered.end(audioplayer.current.buffered.length - 1));
            setBufferedAmount(bufferes)
        }
        else{
            const audio = document.querySelector("audio");
            audio.addEventListener("loadedmetadata",()=>{
                const seconds = Math.floor(audioplayer.current.duration) 
                setDuration(seconds)            
                progressbar.current.max = seconds;
                const bufferes = Math.floor(audio.buffered.end(audio.   buffered.length - 1));
                setBufferedAmount(bufferes)
            })
        }
    },[audioplayer?.current?.loadedmetadata, audioplayer?.current?.readyState])
    const counttime = (secs)=>{
        const minutes = Math.floor(secs/60);
        const seconds = Math.floor(secs%60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`
    }
    const handleClick = (e) => {
        const prevState = isPlaying;
        setIsPlaying(!prevState);
        const playbtn = document.getElementById("play-icon");
        if(!prevState) {
          audioplayer.current.play();
          playbtn.classList.replace("play" , "pause");
          playbtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
          animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
          audioplayer.current.pause();
          playbtn.innerHTML = `<i class="fa-solid fa-play"></i>`
          cancelAnimationFrame(animationRef.current);
        }
    }
    const displayBufferedAmount = () => {
        if (bufferedAmount > 0)
       {
        const bufferedAmount = Math.floor(audioplayer.current.buffered.end(audioplayer.current.buffered.length - 1));
        root.style.setProperty('--buffered-width', `${(bufferedAmount / duration) * 100}%`);
       }
    }
    const whilePlaying = () => {
        progressbar.current.value = audioplayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
        displayBufferedAmount()
    }
    
    const handleChange = (e) => {
        audioplayer.current.currentTime = progressbar.current.value;
        root.style.setProperty("--seek-before-width" ,`${progressbar.current.value / duration * 100}%`);
        setCurrentTime(progressbar.current.value);
    }

    const changePlayerCurrentTime = () => {
        root.style.setProperty('--seek-before-width', `${progressbar.current.value / duration * 100}%`);
        setCurrentTime(progressbar.current.value);
    }

    const handlemouseover = () => {
        $("#volume-slider").fadeIn()
    }

    const handlemouseleave = () => {
        $("#volume-slider").fadeOut()
    }
    const handlevolume = (e) =>{
        audioplayer.current.volume = e.target.value/100;
        const mutebtn = document.getElementById("mutebtn");
        if(audioplayer.current.volume == 0){
            mutebtn.classList.replace("unmute" , "mute");
            mutebtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        }
        else{
            mutebtn.classList.replace("mute" , "unmute")
            mutebtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`
        }
        root.style.setProperty('--volume-before-width', `${progressvolume.current.value}%`);
    }
    const handlemute = (e) => {
        const prevState = ismute;
        const mutebtn = document.getElementById("mutebtn");
        setIsMute(!prevState);
        if(!prevState) {
            audioplayer.current.volume = 0;
            mutebtn.classList.replace("unmute" , "mute");
            mutebtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
            progressvolume.current.value = 0;
            root.style.setProperty('--volume-before-width', `0%`);
          } else {
            audioplayer.current.volume = 1;
            mutebtn.classList.replace("mute" , "unmute")
            mutebtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`
            progressvolume.current.value = 100;
            root.style.setProperty('--volume-before-width', `100%`);
          }
    }
    return (
        <>
            <div className='audiocontroller'>
                <audio ref={audioplayer} src={props.audiosrc} onProgress={displayBufferedAmount} preload="metdata"></audio>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-xl-1 col-md-1 col-sm-12 col-xs-12  text-center'>
                        <button id='play-icon' className="play btn"onClick={handleClick}><i className="fa-solid fa-play"></i></button>
                    </div>
                    <div className='col-2'>
                        <span  className='time' >{counttime(currenttime)}</span>
                    </div>
                    <div className='col-6'>
                        <input type="range"  onChange={handleChange}  ref={progressbar} defaultValue="0" />
                    </div>
                    <div className='col-2'>
                        <span id="current-time" className='time' >{counttime(duration)}</span>
                    </div>
                    <div className='col-1'onMouseOver={handlemouseover} onMouseLeave={handlemouseleave}>
                        <input type="range" className='soundcontrolleroverlay' ref={progressvolume} onInput={handlevolume}  id="volume-slider" max="100" defaultValue="100"/>
                        <button className='unmute btn' id="mutebtn" onClick={handlemute}><i className="fa-solid fa-volume-high"></i></button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Audio;