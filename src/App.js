// import '@shopify/polaris/build/esm/styles.css';
// import enTranslations from '@shopify/polaris/locales/en.json';
// import { AppProvider } from '@shopify/polaris';
import Images from './components/Images'
import "./App.css"
import { useEffect, useState } from 'react';

const api = {
  key: "MXSyWvGBkfsvMYRnHQHWgPjYe9EnGD2RE4vyqVBd"
}

function App() {

  const [images, setImages] = useState();



  useEffect(() => {
    async function getImgs() {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api.key}`)
        const data = await response.json()
        setImages(data)
        console.log(data)
      }
      catch (err) {
        console.log(err)
      }
      finally {
        console.log(images)
      }
    }

    getImgs()
  }, [])


  return (
    <div>
      <div className="App">
        <h1>Spacestagram</h1>
        <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>
      </div>

      {/* <AppProvider i18n={enTranslations}> */}
      {images && <Images images={images} />}

      {/* </AppProvider> */}
    </div>
  );
}

export default App;
