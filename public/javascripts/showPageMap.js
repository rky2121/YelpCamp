mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/navigation-night-v1', 
    center: campground.geometry.coordinates, 
    zoom: 9 
});

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h5>${campground.title}</h5><p>${campground.location}</p>`))
    .addTo(map);
