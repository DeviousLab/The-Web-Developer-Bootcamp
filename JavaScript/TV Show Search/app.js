const form = document.querySelector('#searchForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = form.elements.query.value;
    const config = { params: {q: searchInput} };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    showImages(res.data);
    form.elements.query.value = '';
})

const showImages = (shows) => {
    for(let result of shows){
        if (result.show.image) {
            const showCover = document.createElement('img');
            showCover.src = result.show.image.medium;
            document.body.append(showCover);
        }
    }
}