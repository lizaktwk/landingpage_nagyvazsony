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

function updateImage() {
    if (currentImageIndex >= 0 && currentImageIndex < myCache.cache.length) {
        const currentImage = myCache.cache[currentImageIndex];
        const mainImg = document.getElementById('mainImg');
        mainImg.src = currentImage.src;
        mainImg.style.zIndex = 0;

        console.log("current Index: " + currentImageIndex);

        // show welcome table content at specific image index
        if (currentImageIndex >= 129 && currentImageIndex <= 131) {
            showTableContent('welcome');
            showTableContent('welcome-text');
        } else {
            hideTableContent('welcome');
            hideTableContent('welcome-text');
        }

        // show welcome table content at specific image index --> Icons: Fekete Sereg + 
        if (currentImageIndex >= 151 && currentImageIndex <= 154) {
            showTableContent('icon-container');
            console.log("show icon container");
        } else {
            hideTableContent('icon-container');
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
        // setZIndex();
    }
});

// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// };



// display div with id when specific mainImg is displayed
// function showTableContent(contentId) {
//     const tableContent = document.getElementById('table-content');
//     const children = tableContent.children;

//     for (let i = 0; i < children.length; i++) {
//         const child = children[i];
//         if (child.id === contentId) {
//             child.style.visibility = "visible";
//         } else {
//             child.style.visibility = "hidden";
//         }
//     }
// }
function showTableContent(contentId) {
    let element = document.getElementById(contentId);
    element.style.visibility = 'visible';
}

function hideTableContent(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.visibility = 'hidden';
    }
}

// print viewport width
console.log("viewport width: " + window.innerWidth);



// text carousel
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    // Prevent slide index from moving beyond the first or last slide
    if ((n > 0 && slideIndex < document.getElementsByClassName("textSlides").length) || 
        (n < 0 && slideIndex > 1)) {
        showSlides(slideIndex += n);
    }
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("textSlides");
    let dots = document.getElementsByClassName("dot");

    // Ensure slideIndex stays within bounds
    if (n > slides.length) { slideIndex = slides.length; }
    if (n < 1) { slideIndex = 1; }

    // Hide all slides and remove active class from all dots
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and set the active dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Update button styles
    changeButtonStyle();
}

function changeButtonStyle() {
    const previousButton = document.getElementsByClassName('previous')[0];
    const nextButton = document.getElementsByClassName('next')[0];
    const slides = document.getElementsByClassName("textSlides");

    // Reset to default
    previousButton.classList.remove('arrow-disabled');
    previousButton.classList.add('arrow-default');
    nextButton.classList.remove('arrow-disabled');
    nextButton.classList.add('arrow-default');

    // Disable buttons conditionally
    if (slideIndex === 1) {
        previousButton.classList.remove('arrow-default');
        previousButton.classList.add('arrow-disabled');
        previousButton.style.pointerEvents = 'none'; // Disable click
    } else {
        previousButton.style.pointerEvents = 'auto'; // Enable click
    }
    if (slideIndex === slides.length) {
        nextButton.classList.remove('arrow-default');
        nextButton.classList.add('arrow-disabled');
        nextButton.style.pointerEvents = 'none'; // Disable click
    } else {
        nextButton.style.pointerEvents = 'auto'; // Enable click
    }
}


// Slide in of the text content
// function showSidebar() {
//     const iconFeketeSereg = document.querySelector('#feketesereg');
//     const iconMonastery = document.querySelector('#monastery');
//     const sidebar = document.querySelector('.sidebar-container');
//     sidebar.style.left = '0';
//     iconFeketeSereg.style.left = '79vw';
//     iconMonastery.style.left = '100vw';
// }

let isSidebarVisible = false;
// function showSidebar(iconTag, otherIconTag) {
//     const icon = document.querySelector(iconTag);
//     const otherIcon = document.querySelector(otherIconTag);
//     const sidebarToRight = document.querySelector('.sidebar-container-toRight');
//     const sidebarToLeft = document.querySelector('.sidebar-container-toLeft');

//     if (iconTag === '#feketesereg') {
//         if (!isSidebarVisible) {
//             sidebarToRight.classList.add('sidebar-visible');
//             icon.style.left = '79vw'; // Adjust as needed
//             icon.style.width = '20vw'; // Adjust as needed   
//         } else {
//             sidebarToRight.classList.remove('sidebar-visible');
//             icon.style.left = '0';
//             icon.style.width = "400px";
//         }
//     }

//     if (iconTag === '#monastery') {
//         if (!isSidebarVisible) {
//             sidebarToLeft.classList.add('sidebar-visible');
//             icon.style.left = '0'; // Adjust as needed
//             icon.style.width = '20vw'; // Adjust as needed   
//         } else {
//             sidebarToLeft.classList.remove('sidebar-visible');
//             icon.style.left = '-200px';
//             icon.style.width = "400px";
//         }
//     }

//     isSidebarVisible = !isSidebarVisible;
// }

function showSidebar(iconTag, otherIconTag) {
    const icon = document.querySelector(iconTag);
    const otherIcon = document.querySelector(otherIconTag);
    const sidebar = document.querySelector('.sidebar-container');
    const sidebarToRight = document.querySelector('.sidebar-container-toRight');
    const sidebarToLeft = document.querySelector('.sidebar-container-toLeft');

    if(iconTag === '#feketesereg') {
        //if the sidebar is not visible/if isSidebarVisible = false
        if (!isSidebarVisible) {
            // Show the sidebar
            sidebarToRight.style.left = '0';
            icon.style.left = '79vw'; // Adjust as needed
            icon.style.width = '20vw'; // Adjust as needed   
            // otherIcon.style.left = '100vw'; // Adjust as needed
        }
        // if the sidebar is visible 
        else {
            // Hide the sidebar
            sidebarToRight.style.left = '-100%';
            icon.style.left = '0';
            icon.style.width = "400px";
        }
    }

    if(iconTag === '#monastery') {
        // if the sidebar is not visible/if isSidebarVisible = false
        if (!isSidebarVisible) {
            // Show the sidebar
            sidebarToLeft.style.left = '20%';
            icon.style.left = '0'; // Adjust as needed
            icon.style.width = '20vw'; // Adjust as needed   
            // otherIcon.style.left = '100vw'; // Adjust as needed
        }
        // if the sidebar is visible 
        else {
            // Hide the sidebar
            sidebarToLeft.style.left = '100%';
            icon.style.left = '-200px';
            icon.style.width = "400px";
            // otherIcon.style.left = '200px';
        }
    }
    

    // Toggle sidebar visibility flag
    isSidebarVisible = !isSidebarVisible;
}









// following resize event listener is for stopping transition when resizing the window, but does not work yet

// event listener for stoping transition when resizing the window
// let resizeTimeout;

// window.addEventListener('resize', () => {
//     const elements = document.querySelectorAll('*'); // Select all elements in the document

//     // Add the no-transition class to all elements
//     elements.forEach(element => {
//         element.classList.add('stop-transition');
//     });

//     // Clear the timeout if it was already set
//     clearTimeout(resizeTimeout);

//     // Set a timeout to remove the no-transition class after resizing is finished
//     resizeTimeout = setTimeout(() => {
//         elements.forEach(element => {
//             element.classList.remove('stop-transition');
//         });
//     }, 200); // Adjust the timeout duration as needed
// });