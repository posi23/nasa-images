import Images from './components/Images'
import "./App.css"
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const api = {
  key: "MXSyWvGBkfsvMYRnHQHWgPjYe9EnGD2RE4vyqVBd"
}

function App() {

  const [images, setImages] = useState(); // array of JSON data returned from the API
  const [checkDate, setCheckDate] = useState(new Date(new Date().getTime() - 2160000000).toLocaleDateString("en-CA")) // the start_date parameter to be passed into the API
  const [isLoading, setIsLoading] = useState(true) // loading state

  // fetch data from API at the start of the website and anytime 'checkDate' changes
  useEffect(() => {
    async function getImgs() {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?start_date=${checkDate}&thumbs=true&api_key=${api.key}`)
        if (!response.ok) {
          throw new Error("Server error; failed to get images. Please try again")
        }
        else {
          const data = await response.json()
          setImages(data)
        }

      }
      catch (err) {
        console.log(err.message)
      }
      finally {
        setIsLoading(false)
      }
    }
    getImgs()

    return () => {
      setIsLoading(true)
    }
  }, [checkDate])


  return (
    <div>
      <div className="App">
        <Router>
          <Link to="#">
            <h1>Spacestagram</h1>
          </Link>
        </Router>

        <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>
      </div>

      {!isLoading && images
        ? <><div className="dateinfo">
          <h3>
            Showing images from <br />
            <i>{checkDate} <strong>to</strong> {new Date().toLocaleDateString("en-CA")}</i>
          </h3>
        </div>
          {images.map(image => (
            <Images images={image} key={image.date} />
          ))}</> :
        (!isLoading && !images ?
          <div className='dateinfo'>
            <h3>An error has occured. Please try again</h3>
          </div> : // INTERNAL SERVER ERROR HANDLING
          <div className='loading-state'></div>
        )}
    </div>


  );
}

export default App;
