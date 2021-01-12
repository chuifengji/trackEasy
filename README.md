# TrackEasy

A declarative front-end monitoring buried-point plug-in (toy)

## How to use it

install:
npm install trackeasy(not yet released!)

```html

<button data-trackEasy="{'type':click}" >Click</button>

````

```js
import trackEasy from "trackeasy"

let Track = new trackEasy()

Track.configuration = {
    useHighlight: false,
    useErrorWatcher: false,
    cacheLen: 10,
}

Track.use([transformData,transportData])

//transformData and transportData are  functions of your own definition

```
