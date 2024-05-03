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
    node.dataset.symbol = isEnabled ? '♥' : '♡';
}

function getLiked() {
    return fetch('/api/liked').then((r) => r.json());
}

function toggleLiked(entry) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch('/api/liked', { method: 'POST', body: JSON.stringify({ entry }), headers }).then((r) => r.json());
}

function enableSaving(likedList) {
    const nodes = document.querySelectorAll('.saveable-img');

    // initially set all as unliked and attach event listener for clicking
    nodes.forEach((n) => {
        setSaveableImgSymbol(n, false);

        const src = n.children[0].src;
        n.addEventListener('click', async () => {
            const isLiked = await toggleLiked(src);
            setSaveableImgSymbol(n, isLiked);
        });
    });

    nodes.forEach((n) => {
        const src = n.children[0].src;
        setSaveableImgSymbol(n, likedList.includes(src));
    });
}

function renderLiked(likedList) {
    const container = document.getElementById('liked-gallery');
    if (container) {
        likedList.forEach((entry) => {
            container.innerHTML += `<div class="liked-img"><img src="${entry}"></div>`;
        });
    }
}

async function onLoad() {
    highlightSearchResult();
    hideMenuOnSearch();

    const likedList = await getLiked();
    enableSaving(likedList);
    renderLiked(likedList);
}

window.addEventListener('load', onLoad);
