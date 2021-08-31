mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

const nav = new mapboxgl.NavigationControl({
    visualizePitch: true,
});
map.addControl(nav, 'bottom-right');

const marker1 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`)
    )
    .addTo(map);