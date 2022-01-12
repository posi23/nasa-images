// import { Button, Layout, Card } from '@shopify/polaris'
import { useRef, useState } from "react";
import "../styles/images.css"


const Images = ({ images }) => {

      const [isLiked, setIsLiked] = useState(false) // state to show if the liked button has been pressed

      const likeBtn = useRef() // reference to the like button
      const likeAnim = useRef() // reference to the animation to be used for the like action
      function toggleLike() {
            setIsLiked(isLiked => !isLiked)
            if (isLiked === true) {
                  likeBtn.current.className = "like-btn"
                  likeAnim.current.className = ""
            }

            else {
                  likeBtn.current.className = "unlike-btn"
                  likeAnim.current.className = "like-anim"

                  setTimeout(() => {
                        likeAnim.current.className = ""
                  }, 2000);
            }
      }

      return (
            <>

                  <div className="main-post">
                        <div ref={likeAnim} id="like-anim" className=""></div>
                        <div className="img-container">
                              <img src={images.hdurl} alt="main" />
                        </div>



                        <div className='img-info'>
                              <div>
                                    <h1>{images.title}</h1>
                                    <h1 className='date'>Date: {images.date}</h1>
                              </div>

                              <p>{images.explanation}</p>

                              <button ref={likeBtn} className="like-btn" onClick={() => toggleLike()}>{isLiked === true ? "Unike" : "Like"}</button>
                        </div>

                  </div>
            </>
      );
}

export default Images;