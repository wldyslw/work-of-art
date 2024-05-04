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

function enableLiking() {
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
}

async function updateLiked() {
    const likedList = await getLiked();
    const nodes = document.querySelectorAll('.saveable-img');
    nodes.forEach((n) => {
        const src = n.children[0].src;
        setSaveableImgSymbol(n, likedList.includes(src));
    });
}

async function onLoad() {
    enableLiking();
    updateLiked();
}

window.addEventListener('load', onLoad);
