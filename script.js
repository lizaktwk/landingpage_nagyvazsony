
// Creating the BG image sequence (array)
function imageCache(base, firstNum, lastNum) {
    this.cache = [];
    let frames;
    for (let i = firstNum; i <= lastNum; i++) {
        frames = new Image();
        if(i<=9) {
            frames.src = base + "00" + i + ".png";
        }
        else if (i<=99) {
            frames.src = base + "0" + i + ".png";
        }
        else {
            frames.src = base + i + ".png";
        }
        this.cache.push(frames);
    }
}

let myCache = new imageCache('./Test-Video-Web-PNGs/Test-Video', 0, 479);

// Variable to keep track of the current image index
let currentImageIndex = 0;


// Function to update the displayed image
function updateImage() {
    // Check if the current index is within bounds
    if (currentImageIndex >= 0 && currentImageIndex < myCache.cache.length) {
        let currentImage = myCache.cache[currentImageIndex];
        // Display the image (replace 'imageContainer' with your image container's ID or class)
        document.getElementById('mainImg').src = currentImage.src;
    }
}

// Implementing backwards/forwards animation based on scroll direction (source: https://codepen.io/lehollandaisvolant/pen/ryrrGx)
// Initial state
let scrollPos = 0;
// adding scroll event
window.addEventListener('scroll', function(){
  // detects new state and compares it with the new one
  if ((document.body.getBoundingClientRect()).top > scrollPos) { // Scroll UP Movement
    if(currentImageIndex == 0) {
        return;
    }
    // Decrease current image index
    currentImageIndex--;
    // Update the displayed image
    updateImage();
    scrollPos = (document.body.getBoundingClientRect()).top;

  }
  else { // Scroll DOWN Movement --> reverse the animation
    // Increment current image index
    currentImageIndex++;
    // Update the displayed image
    updateImage();
	// saves the new position for iteration.
	scrollPos = (document.body.getBoundingClientRect()).top;
  }
});

// reset animation and scroll-position on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  