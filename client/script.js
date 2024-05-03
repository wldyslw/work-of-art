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

function setSaveableImgSymbol(node, isEnabled) {
    node.dataset.symbol = isEnabled ? 'Закладки' : '♡';
}

function enableSaving() {
    document.querySelectorAll('.saveable-img').forEach((n) => {
        setSaveableImgSymbol(n, false); // TODO: add actual symbol here
        const img = n.children[0];
        n.addEventListener('click', () => {
            console.log(img.src);
        });
    });
}

function onLoad() {
    highlightSearchResult();
    hideMenuOnSearch();

    enableSaving();
}

window.addEventListener('load', onLoad);
