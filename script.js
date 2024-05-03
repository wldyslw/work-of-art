function highlightSearchResult() {
    const searchEncoded = new URLSearchParams(window.location.search).get('q');
    if (searchEncoded) {
        const result = decodeURI(searchEncoded).trim();
        const found = window.find(result);
        document.getElementById('globalsearch').value = result;
        if (!found) {
            alert('Совпадений не найдено!');
        }
    }
}

function hideMenuOnSearch() {
    const search = document.getElementById('globalsearch');
    const nav = document.getElementById('header-nav');
    search.addEventListener('focus', () => {
        nav.classList.add('hidden');
    });
    search.addEventListener('blur', () => {
        nav.classList.remove('hidden');
    });
}

function onLoad() {
    highlightSearchResult();
    hideMenuOnSearch();
}

window.addEventListener('load', onLoad);
