# TrackEasy

A declarative front-end monitoring buried-point plug-in (toy)

## How to use it

install:
npm install trackeasy(not yet released!)

```html

<button data-trackEasy="{'type':'click'}" >Click</button>

````

```js
import trackEasy from "trackeasy"

const configuration = {
    useHighlight: false,
    useErrorWatcher: false,
    cacheLen: 10,
}

let Track = new trackEasy(configuration)

let transformData = (data) => { data };

let transportData = (data) => {
    fetch("https://example.com/", {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
}

Track.use([transformData,transportData])

//transformData and transportData are  functions of your own definition

```
