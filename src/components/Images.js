// import { Button, Layout, Card } from '@shopify/polaris'
import { useRef, useState } from "react";
import img1 from "../bg.jpg"
import "../styles/images.css"

const Images = ({ images }) => {

      const [isLiked, setIsLiked] = useState(false)
      const likeBtn = useRef()
      function toggleLike() {
            setIsLiked(isLiked => !isLiked)
            if (isLiked === true) likeBtn.current.className = "like-btn"
            else likeBtn.current.className = "unlike-btn"
      }

      return (

            <div className="main-post">


                  <img src={images.hdurl} alt="something" />


                  <div className='img-info'>
                        <div>
                              <h1>{images.title}</h1>
                              <h1 className='date'>Date: {images.date}</h1>
                        </div>

                        <p>{images.explanation}</p>

                        <button ref={likeBtn} className="like-btn" onClick={() => toggleLike()}>{isLiked === true ? "Unike" : "Like"}</button>
                  </div>

            </div>

      );
}

export default Images;