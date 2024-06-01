// Creating the BG image sequence (array)
function imageCache(base, firstNum, lastNum) {
    this.cache = [];
    let frames;
    for (let i = firstNum; i <= lastNum; i++) {
        frames = new Image();
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

let myCache = new imageCache('./Test-Video-Web-PNGs/Test-Video', 0, 479);

// Set the height of the document based on the number of images
document.body.style.height = `${(myCache.cache.length - 1) * window.innerHeight}px`;

// Variable to keep track of the current image index
let currentImageIndex = 0;

// Function to update the displayed image
function updateImage() {
    // Check if the current index is within bounds
    if (currentImageIndex >= 0 && currentImageIndex < myCache.cache.length) {
        let currentImage = myCache.cache[currentImageIndex];
        let mainImg = document.getElementById('mainImg');
        // Display the image (replace 'imageContainer' with your image container's ID or class)
        mainImg.src = currentImage.src;
        // Set the z-index of the currently displayed image
        mainImg.style.zIndex = 0;
    }
}

// Implementing backwards/forwards animation based on scroll direction
window.addEventListener('scroll', function () {
    // Calculating the maximum vertical distance that can be scrolled
    let maxScrollTop = document.body.scrollHeight - window.innerHeight; // total document height - visible area height
    // Calculate the fraction of the scroll position
    let scrollFraction = window.scrollY / maxScrollTop; // represents how much of the scrollable distance has been scrolled (value between 0 and 1)
    
    // Calculate the new image index with finer granularity
    let newIndex = Math.min(
        myCache.cache.length - 1,
        Math.floor(scrollFraction * myCache.cache.length)
    );

    // Only update if the index has changed
    if (newIndex !== currentImageIndex) {
        currentImageIndex = newIndex;
        // print the current image index
        console.log(currentImageIndex);
        updateImage();
    }
});

// reset animation and scroll-position on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};



