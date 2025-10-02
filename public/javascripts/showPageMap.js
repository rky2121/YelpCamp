mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'show-map', 
    style: 'mapbox://styles/mapbox/standard', 
    config: {
        basemap: {
            theme: 'monochrome',
            lightPreset: 'light'
        }
    },
    center: campground.geometry.coordinates, 
    zoom: 9 
});

map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h5>${campground.title}</h5><p>${campground.location}</p>`))
    .addTo(map);
