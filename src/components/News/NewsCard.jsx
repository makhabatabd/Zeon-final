import React, { useEffect, useState } from 'react';

const NewsCard = ({item}) => {
  const [hideText, setHideText] = useState(false);
   const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize

    return () => window.removeEventListener("resize", resizeW);
  });

  useEffect(() => {
    if (deviceSize === 320) {
      setHideText( true )
    } else if (deviceSize > 320) {
      setHideText( false )
    }
  }, [])
  
    return (
          <div className="news-parts-outter" key={item.id} >
            <div className="news-parts">
              <div className="news-part-image">
                <img width="240px" height="226px" src={item.img} alt="news-pic" />
              </div>
              <div className="news-part-text-outter">
                  <h4>{item.title}</h4>
                {!hideText ? <p>{item.text}</p>: <p>{item.text.slice(0,150)+"..."}</p>}
                {hideText ? <button className="text-buttons" onClick={()=>setHideText(false)}>Читать полностью</button> : <button className="text-buttons" onClick={()=>setHideText(true)}>Скрыть</button>}
                <div className="news-little-rectangle"></div>
              </div>
            </div>
          </div>  
    );
};

export default NewsCard;