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
    const footer = document.getElementById('container-footer');

    const link = getLink.value.trim();
    const isShortsLink = link.includes("youtube.com/shorts");

    if (link === ""){
        errorMessage.textContent = "Escreva um link válido no campo abaixo!";
        errorMessage.style.display = "block";
        return;
    }

    if (isShortsLink){
        errorMessage.textContent = "Desculpe, links do YouTube Shorts não são suportados.";
        errorMessage.style.display = "block";
        return;
    }

    if(errorMessage.style.display !== "none"){
        errorMessage.style.display = "none";
    }

    if(footer.style.position !== "fixed"){
        footer.style.position = "fixed";
    }

    videoTitle.textContent = ""; // Limpar o título anterior, se houver
    thumbnailLink.href = ""; // Defina a URL correta para o link de download
    thumbnailImage.src = `https://img.youtube.com/vi/${extractVideoId(getLink.value)}/maxresdefault.jpg`;

    const apiKey = 'AIzaSyBuVmeIjXAdKMb71cdL4ZHGIa43EhyijtI';
    const videoId = extractVideoId(getLink.value);
    getVideoDetails(videoId, apiKey).then(snippet => {
        videoTitle.textContent = snippet.title;
        thumbnailImage.src = snippet.thumbnails.maxres.url;
        thumbnailLink.href = thumbnailImage.src;
        divResult.style.display = "block";
        errorMessage.textContent = "Sua thumbanil está disponível, role para baixo e clique na imagem!";
        errorMessage.style.color = "green";
        errorMessage.style.display = "block";
        footer.style.position = "static";
    }).catch(error => {
        errorMessage.textContent = "Erro ao obter detalhes do vídeo.";
        errorMessage.style.display = "block";
    });
}
