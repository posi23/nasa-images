import Images from './components/Images'
import "./App.css"
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const api = {
  key: "MXSyWvGBkfsvMYRnHQHWgPjYe9EnGD2RE4vyqVBd"
}

function App() {

  const [images, setImages] = useState(); // array of JSON data returned from the API
  const [selectedDate, setSelectedDate] = useState("2022-01-01") // the default date to be used for the date picker
  const [checkDate, setCheckDate] = useState(selectedDate) // the start_date parameter to be passed into the API
  const [isLoading, setIsLoading] = useState(true) // loading state
  const dateRef = useRef() // reference to the date picker element

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


  function handleSubmit(e) {
    e.preventDefault()

    // condition to handle invalid date chosen on the mobile web
    if (dateRef.current.value > dateRef.current.max || dateRef.current.value < dateRef.current.min) {
      setSelectedDate(checkDate) // set date on Datepicker to most recent queried date
      return alert(`APOD API cannot provide any images for this day: ${dateRef.current.value} \n\nPlease choose a date between ${dateRef.current.min} and ${dateRef.current.max}`)
    }
    setCheckDate(selectedDate)
  }


  return (
    <div>
      <div className="App">
        <Router>
          <Link to="#">
            <h1>Spacestagram</h1>
          </Link>
        </Router>

        <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>

        <form>
          <div className='label'>
            <label htmlFor="datepicker">Choose starting date to display images from</label>
          </div>
          <div>
            <input
              ref={dateRef}
              type="date"
              id="datepicker"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              min="1995-06-16"
              max={new Date().toLocaleDateString("en-CA")}
            />
          </div>
          <div>
            <button onClick={e => handleSubmit(e)}>Change Date</button>
          </div>
        </form>

        <div className="dateinfo">
          {(!isLoading && images) && <h3>Showing images from <strong>{checkDate}</strong></h3>}
        </div>
      </div>

      {!isLoading && images
        ? images.map(image => (
          <Images images={image} key={image.date} />
        )) :
        (!isLoading && !images ?
          <div className='dateinfo'>
            <h3>An error has occured. Please try again</h3>
          </div> : // INTERNAL SERVER ERROR HANDLING
          <div className='dateinfo'>
            <h3>Loading...</h3>
          </div>
        )}
    </div>


  );
}

export default App;
