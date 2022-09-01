import axios from 'axios'

const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

// wrong key obviously. too lazy to install dotenv LOL
const GOOGLE_API_KEY = 'dasdasdas'

// declare let google: any

type GoogleGeoCodeResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[]
  status: 'OK' | 'ZERO_RESULTS'
}

function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value

  // send this to Google's API
  axios
    .get<GoogleGeoCodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location')
      }
      console.log(response)
      const coordinates = response.data.results[0].geometry.location
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 16,
      })
      new google.maps.Marker({ position: coordinates, map: map })
    })
    .catch((error) => {
      alert(error.message)
      console.log(error)
    })
}

form.addEventListener('submit', searchAddressHandler)
