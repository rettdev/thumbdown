function extractVideoId(url) {
    const regex = /[?&]v=([^&#]+)/;
    const match = regex.exec(url);
    return match ? match[1] : "";
}

function getVideoDetails(videoId, apiKey) {
    return fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => data.items[0].snippet);
}

function OnclickBtnSearch() {
    const getLink = document.getElementById('input-link');
    const errorMessage = document.getElementById('message-error');
    const videoTitle = document.getElementById('video-title');
    const thumbnailLink = document.getElementById('thumbnail-link');
    const thumbnailImage = document.getElementById('thumbnail-image');
    const divResult = document.getElementById('result');

    if (getLink.value.trim() === "") {
        errorMessage.textContent = "Escreva um link válido no campo abaixo!";
        errorMessage.style.display = "block";
        return;
    }
    else {
        errorMessage.style.display = "none";
    }

    videoTitle.textContent = ""; // Limpar o título anterior, se houver
    thumbnailLink.href = ""; // Defina a URL correta para o link de download
    thumbnailImage.src = `https://img.youtube.com/vi/${extractVideoId(getLink.value)}/maxresdefault.jpg`;

    const apiKey = 'AIzaSyAQzLR53MRdrAHsbrLe7IL5jvVYm8TAR1A';
    const videoId = extractVideoId(getLink.value);
    getVideoDetails(videoId, apiKey).then(snippet => {
        videoTitle.textContent = snippet.title;
        thumbnailImage.src = snippet.thumbnails.maxres.url;
        getElementById.style.display = "block";
    }).catch(error => {
        errorMessage.textContent = "Erro ao obter detalhes do vídeo.";
        errorMessage.style.display = "block";
    });
}
