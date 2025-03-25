function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:.*(?:v|e(?:mbed)?)=|.*\/)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})(?=\?|\s|$)/;
    const match = regex.exec(url);
    return match ? match[1] : null;
}

function OnclickBtnSearch() {
    console.log("Botão de busca clicado");

    const getLink = document.getElementById('input-link');
    const errorMessage = document.getElementById('message-error');
    const videoTitle = document.getElementById('video-title');
    const thumbnailLink = document.getElementById('thumbnail-link');
    const thumbnailImage = document.getElementById('thumbnail-image');
    const divResult = document.getElementById('result');
    const footer = document.getElementById('container-footer');

    const link = getLink.value.trim();
    const isShortsLink = link.includes("youtube.com/shorts");

    if (link === "") {
        errorMessage.textContent = "Escreva um link válido!";
        errorMessage.classList.remove('d-none');
        return;
    }

    if (isShortsLink) {
        errorMessage.textContent = "Desculpe, links do YouTube Shorts não são suportados.";
        errorMessage.classList.remove('d-none');
        return;
    }

    const videoId = extractVideoId(link);
    if (!videoId) {
        errorMessage.textContent = "ID do vídeo não encontrado ou link inválido.";
        errorMessage.classList.remove('d-none');
        return;
    }

    errorMessage.classList.add('d-none');
    divResult.classList.remove('d-none'); 
    divResult.style.display = "block";

    videoTitle.textContent = `Thumbnail do vídeo:`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    thumbnailImage.src = thumbnailUrl;
    thumbnailLink.href = thumbnailUrl;
    thumbnailLink.setAttribute("download", "thumbnail.jpg");

    if (footer) {
        footer.style.position = "static";
    }

    console.log("Thumbnail exibida:", thumbnailUrl);
}
