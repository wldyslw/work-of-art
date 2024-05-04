function getLiked() {
    return fetch('/api/liked').then((r) => r.json());
}

function getFeedback() {
    return fetch('/api/feedback').then((r) => r.json());
}

function addFeedback(details) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ details }), headers }).then((r) => r.json());
}

async function renderLikedGallery() {
    const likedList = await getLiked();
    const container = document.getElementById('liked-gallery');
    if (container) {
        if (likedList.length) {
            container.innerHTML = '';
        }
        likedList.forEach((entry) => {
            container.innerHTML += `<div class="liked-img"><img src="${entry}"></div>`;
        });
    }
}

function attackAddFeedbackListener() {
    document.getElementById('feedback-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const elements = e.target.elements;
        const name = elements.name.value;
        const body = elements.body.value;
        const updatedFeedback = await addFeedback({ name, body });
        await renderFeedback(updatedFeedback);
    });
}

async function renderFeedback(feedbackList) {
    if (!feedbackList) {
        feedbackList = await getFeedback();
    }
    const container = document.getElementById('feedback-list');
    if (container) {
        if (feedbackList.length) {
            container.innerHTML = '';
        }
        feedbackList.forEach((feedback) => {
            container.innerHTML += `<blockquote><p>${feedback.body}</p><footer>—${feedback.name}</footer></blockquote>`;
        });
    }
}

async function onLoad() {
    renderLikedGallery();
    attackAddFeedbackListener();
    renderFeedback();
}

window.addEventListener('load', onLoad);
