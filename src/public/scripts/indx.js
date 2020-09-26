///////////////////////////////// HTML ELEMENTS /////////////////////////////////
const div = document.getElementById('map-template')
const btn = document.querySelectorAll('.marker')
const deleteBtn = document.getElementById('btn-delete')
const absInput = document.getElementById('abs-input')
const absCtn = document.getElementById('absolute-ctn')
const crossBtn = document.getElementById('cross-btn')
const findPlaceInput = document.getElementById('place-search-input')
const placesContainer = document.getElementById('places-container')
const resetBtn = document.getElementById('reset-search-btn')

//Local test
const exBtns = document.querySelectorAll('#exBtn')
for (item of exBtns) {
    item.addEventListener('click', (e) => {
        if (e.path[1].nextSibling.classList[1] == undefined) {
            e.path[1].nextSibling.classList.add("openDropdown-menu")

        } else {
            e.path[1].nextSibling.classList.add("closeDropdown-menu")
            setTimeout(() => {
                e.path[1].nextSibling.classList.remove("closeDropdown-menu")
            }, 1000);
            e.path[1].nextSibling.classList.remove('openDropdown-menu')
        }
    })
}

//////////////////////////////// GLOBAL VARIABLES ///////////////////////////////
//Marker Type
let mtype = undefined

// div.classList()
//Marker Group
let markers = new L.FeatureGroup();

//Temporal variables
let tempLat = undefined
let tempLng = undefined

// Delete Marker boolean
let deleteBooly = false
//Cancel print Marker
let cancelPin = true

//Zoom controls
let zoom = 18

//////////////////////////////////// MARKERS ////////////////////////////////////

//Markers Icons data
const markerTemplate = (color) => {
    const template = {
        iconUrl: `../img/pin-${color}-x.png`,
        iconSize: [40, 45],
        iconAnchor: [20, 36],
        popupAnchor: [0, -36],
    }
    return template
}
//Set markers icons variables
const blue = L.icon(markerTemplate('blue'));
const red = L.icon(markerTemplate('red'));
const purple = L.icon(markerTemplate('purple'));
const yellow = L.icon(markerTemplate('yellow'));
const green = L.icon(markerTemplate('green'));

//Marker functions
for (each of btn) {
    each.addEventListener('click', (e) => {
        div.classList.add('cursor-inherit')
        mtype = e.target.getAttribute("data_id")
        cancelPin = false
        deleteBtn.textContent = "Cancel"
    })
}

//Markers Type Return
const markTypeIf = (item) => {
    if (item == "Mini Market") return blue
    if (item == "Super Market") return red
    if (item == "purple") return purple
    if (item == "Bakery") return yellow
    if (item == "Market Stall") return green
}

//Delete Marker If
const deleteMarkerIF = (e) => {
    if (deleteBooly) {
        fetch(`deleteLoc/${e.latlng.lat}/${e.latlng.lng}`, {
            method: "POST"
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    e.target.removeFrom(markers)
                }
            })
            .catch(err => console.log(err))
        deleteBtn.textContent = "Delete Marker"
        deleteBooly = false
    }
}

/////////////////////////////// MAP INITIALIZATION //////////////////////////////

// Map tiles variables
var normal = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' })
places = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', { attribution: '<a href="https://www.google.es/maps/preview">Google Maps</a>' });

//Tiles box
var baseLayers = {
    "Normal": normal,
    "Places": places
};

//Initialize map
const map = L.map('map-template', {
    center: [10.399346, -71.471307],
    zoom: zoom,
    layers: [normal]
})
//Add tiles to map
L.control.layers(baseLayers).addTo(map);


/////////////////////////////////// FUNCTIONS ///////////////////////////////////
//Put data in Place Container
const putDataContainer = (data) => {
    let fragment = document.createDocumentFragment()
    for (item of data) {
        //Item preview
        let gDiv = document.createElement('div')
        gDiv.classList.add('place')
        let div = document.createElement('div')
        div.classList.add("item-preview")
        let pTag = document.createElement("p")
        pTag.textContent = item.place
        let btnTag = document.createElement('button')
        btnTag.classList.add("fa", "fa-chevron-down")

        div.append(pTag, btnTag)

        //Item Data
        let div2 = document.createElement('div')
        div2.classList.add('item-data',)
        let pTag2 = document.createElement('p')
        pTag2.textContent = 'Something here long enough  to be a good description for the place, just in case'
        pTag2.classList.add('description')
        let pTag3 = document.createElement('p')
        pTag3.textContent = item.mtype
        pTag3.classList.add('item-type')
        let aTag = document.createElement('a')
        aTag.textContent = "More details ->"
        aTag.setAttribute('href', `/stallPage/${item.id}`)
        aTag.classList.add('more-details')

        div2.append(pTag2, aTag, pTag3,)
        gDiv.append(div, div2)

        btnTag.addEventListener('click', (e) => {
            if (div2.classList[1] == undefined) {
                div2.classList.add("openDropdown-menu")
                console.log('undef');
            } else {
                div2.classList.add("closeDropdown-menu")
                console.log(div2.classList);
                setTimeout(() => {
                    div2.classList.remove("closeDropdown-menu")
                }, 1000);
                div2.classList.remove('openDropdown-menu')
            }
        })

        fragment.append(gDiv)

    }
    placesContainer.append(fragment)
}
//Fetch to search place
const searchPlaceFetch = (value) => {
    fetch(`/findPlace/${value}`, {
        method: 'POST',
    }).then(res => res.json())
        .then(data => {
            putDataContainer(data)
        })
        .catch((err) => {
            console.log(err);
        });
}

//Fetch after input absolute
const fetchMarker = (place) => {
    fetch(`/newLoc/${tempLat}/${tempLng}/${mtype}/${place}`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data) {
                let marker = L.marker([data.status.lat, data.status.lng], { icon: markTypeIf(data.status.mtype) })
                marker.bindPopup(data.status.place)
                marker.on('click', deleteMarkerIF)
                marker.on('mouseover', (e) => {
                    e.target.openPopup()
                })
                marker.on('mouseout', (e) => {
                    setTimeout(() => {
                        e.target.closePopup()
                    }, 15000)
                })
                markers.addLayer(marker)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    map.addLayer(markers)
    div.classList.remove('cursor-inherit')
    mtype = undefined
    tempLat = undefined
    tempLng = undefined
    cancelPin = true
    deleteBtn.textContent = "Delete Marker"
    absCtn.style.display = "none"
}


//Show input -> allow print marker
map.on('click', (e) => {
    if (mtype != undefined) {
        if (!cancelPin) {
            tempLat = e.latlng.lat
            tempLng = e.latlng.lng
            absCtn.style.display = "flex"

        }
    }
})

///ZoomIn Function
const zoomIn = document.querySelector(".leaflet-control-zoom-in")
zoomIn.addEventListener('click', () => {
    zoom++
    if (zoom > 18) zoom = 18
    if (zoom >= 15) {
        if (!map.hasLayer(markers)) {
            map.addLayer(markers)
        }
    }
})

//ZoomOut Function
const zoomOut = document.querySelector('.leaflet-control-zoom-out')
zoomOut.addEventListener('click', () => {
    zoom--
    if (zoom < 0) zoom = 0
    if (zoom < 15) {
        if (map.hasLayer(markers)) {
            map.removeLayer(markers)
        }
    }
})

// DeleteFunction
deleteBtn.addEventListener('click', () => {
    if (!deleteBooly) {
        deleteBooly = true
        deleteBtn.textContent = "Cancel"
    } else if (deleteBooly) {
        deleteBooly = false
        deleteBtn.textContent = "Delete Marker"
    }
    if (!cancelPin) {
        cancelPin = true
        deleteBtn.textContent = "Delete Marker"
    }
})

//Input to fetch marker
absInput.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        if (mtype != undefined) {
            fetchMarker(absInput.value)
            // console.log(absInput.value);
        } else {
            console.log('error');
        }
    }
})

//Cross Btn to close absolute Container
crossBtn.addEventListener('click', () => {
    div.classList.remove('cursor-inherit')
    mtype = undefined
    tempLat = undefined
    tempLng = undefined
    absCtn.style.display = "none"
})


//Load Markers From Database
fetch(`/knowMarks`, {
    method: 'POST',
}).then(res => res.json())
    .then(data => {
        for (each of data) {
            let marker = L.marker([each.lat, each.lng],
                { icon: markTypeIf(each.mtype) }
            )
                .addTo(map)
                .bindPopup(each.place)
            marker.on('click', deleteMarkerIF)
            marker.on('mouseover', (e) => {
                e.target.openPopup()
            })
            marker.on('mouseout', (e) => {
                setTimeout(() => {
                    e.target.closePopup()
                }, 15000)
            })
            markers.addLayer(marker);
        };

    })
    .then(res => {
        map.addLayer(markers);
    })
    .catch((err) => {
        console.log(err);
    });

//Search Places with Input
findPlaceInput.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        while (placesContainer.firstChild) {
            placesContainer.removeChild(placesContainer.lastChild);
        }
        searchPlaceFetch(findPlaceInput.value)
    }
})


//Reset Btn
resetBtn.addEventListener('click', () => {
    while (placesContainer.firstChild) {
        placesContainer.removeChild(placesContainer.lastChild);
    }
    findPlaceInput.value = ""
})