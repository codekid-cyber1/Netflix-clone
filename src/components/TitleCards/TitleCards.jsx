import { Link } from 'react-router-dom'
import './TitleCard.css'
// import cards_data from '../../assets/cards/Cards_data'
import React, { useEffect, useState, useRef } from 'react'






const TitleCards = ({title, category}) => {
  
  const [apiData, setApiData] = useState([])

  const cardsRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjhjOTE0NmU5NGMyM2QyMTg4MGU4ODUzYjYzMTVlZiIsIm5iZiI6MTc2Nzg3NDY1Ny40NzEsInN1YiI6IjY5NWZhMDYxZmU0NWMwNWViMDg2M2Q4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WMXqIrieevFPSGLKEJf_WKXdl9DXlP9HjdkCc68yBWg'
    }
  };


    const handleWheel = (event)=>{
      cardsRef.current.scrollLeft += event.deltaY;
      event.preventDefault();
    }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  },[])

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netfilx"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link  to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards