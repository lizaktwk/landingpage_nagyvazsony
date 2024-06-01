function imageCache(base, firstNum, lastNum) {
    this.cache = [];
    for (let i = firstNum; i <= lastNum; i++) {
        const frames = new Image();
        if (i <= 9) {
            frames.src = base + "00" + i + ".png";
        } else if (i <= 99) {
            frames.src = base + "0" + i + ".png";
        } else {
            frames.src = base + i + ".png";
        }
        this.cache.push(frames);
    }
}

const myCache = new imageCache('./Test-Video-Web-PNGs/Test-Video', 0, 479);
let currentImageIndex = 0;

// Calculate the height of the document based on the number of images
document.body.style.height = `${(myCache.cache.length - 1) * window.innerHeight}px`;

document.getElementById("table-content").style.visibility = "hidden";

function updateImage() {
    if (currentImageIndex >= 0 && currentImageIndex < myCache.cache.length) {
        const currentImage = myCache.cache[currentImageIndex];
        const mainImg = document.getElementById('mainImg');
        mainImg.src = currentImage.src;
        mainImg.style.zIndex = 0;

        console.log("current Index: " + currentImageIndex);

        // show welcome table content at specific image index
        if(currentImageIndex >= 129 && currentImageIndex <= 131) {
            showTableContent('welcome', 129, 130);
            console.log("welcome displayed");
        } else {
            hideTableContent('welcome');
        }
    }
}

window.addEventListener('scroll', function () {
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = window.scrollY / maxScrollTop;
    const newIndex = Math.min(myCache.cache.length - 1, Math.floor(scrollFraction * myCache.cache.length));

    if (newIndex !== currentImageIndex) {
        currentImageIndex = newIndex;
        console.log(currentImageIndex);
        updateImage();
        setZIndex();
    }
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

function setZIndex() {
    const allElements = document.getElementsByTagName('*');
    
    for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        if (element.id !== 'mainImg' && element.className !== 'icon') {
            element.style.zIndex = 1;
            console.log("element z-index: " + element.style.zIndex);
        }
    }
};

// display div with id when specific mainImg is displayed
function showTableContent(id, startImg, endImg) {
    if (currentImageIndex >= startImg && currentImageIndex <= endImg) {
        document.getElementById(id).style.visibility = "visible";

    }
}

function hideTableContent(id) {
    document.getElementById(id).style.visibility = 'hidden';
}