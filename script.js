
function imageCache(base, firstNum, lastNum) {
    this.cache = [];
    for (let i = firstNum; i <= lastNum; i++) {
        const frames = new Image();
        if (i <= 9) {
            frames.src = base + "000" + i + ".png";
        } else if (i <= 99) {
            frames.src = base + "00" + i + ".png";
        } else {
            frames.src = base + "0" + i + ".png";
        }
        this.cache.push(frames);
    }
}

const myCache = new imageCache('./Web-And-Mobile-PNGs/', 1, 440);
let currentImageIndex = 0;

// Sensitivity factor for the scrolling behaviour (lower value means higher sensitivity)
let sensitivityFactor = 5;

// Calculate the height of the document based on the number of images
document.body.style.height = `${(myCache.cache.length - 1) * window.innerHeight / sensitivityFactor}px`;
let bodyHeight = document.body.style.height;

// Variable for the goal scrollbar position at the start of the backwards image cycle
let scrollbarInitCyclePos;

// main function
function updateImage() {
    if (currentImageIndex >= 0 && currentImageIndex < myCache.cache.length) {
        const currentImage = myCache.cache[currentImageIndex];
        const mainImg = document.getElementById('mainImg');
        mainImg.src = currentImage.src;
        mainImg.style.zIndex = 0;

        // show welcome table content at specific image index
        if (currentImageIndex >= 129 && currentImageIndex <= 131) {
            showTableContent('welcome');
        } else {
            hideTableContent('welcome');
        }

        if (currentImageIndex >= 145 && currentImageIndex <= 156) {
            showTableContent('icon-container-1');
        } else {
            hideTableContent('icon-container-1');
        }

        if (currentImageIndex >= 158 && currentImageIndex <= 164) {
            showTableContent('icon-container-2');
        } else {
            hideTableContent('icon-container-2');
        }

        if (currentImageIndex >= 166 && currentImageIndex <= 172) {
            scrollbarInitCyclePos = window.scrollY;
            showTableContent('icon-container-3');
        } else {
            hideTableContent('icon-container-3');
        }

        if (currentImageIndex === 175 && currentImageIndex < myCache.cache.length) {
            cycleImagesForwards();
        }

        if (currentImageIndex === 435) {
            cycleImagesBackwards();
        }
    }

}

function cycleImagesBackwards() {
    if (currentImageIndex < 436 && currentImageIndex >= 175) {
        disableScrollEventListener();

        function cyclePreviousImage() {
            if (currentImageIndex < 436 && currentImageIndex >= 175) {
                // window.scrollBy(scrollPosition, scrollbarInitCyclePos);
                window.scrollTo({ top: scrollbarInitCyclePos, behavior: 'smooth' });

                const currentImage = myCache.cache[currentImageIndex];
                const mainImg = document.getElementById('mainImg');
                mainImg.src = currentImage.src;
                mainImg.style.zIndex = 0;
                currentImageIndex--;
                console.log("currentImageIndex was set to: ", currentImageIndex);

                // Schedule the next image cycle
                setTimeout(cyclePreviousImage, 24);
            } else {
                // Wait until the smooth scrolling is complete before re-enabling the scroll event listener
                setTimeout(() => {
                    enableScrollEventListener();
                }, 1000);
                console.log("scrolleventlistener enabled");
                // break out of the function to stop the cycling process
                return;
            }
        }

        cyclePreviousImage();
    }
}


function cycleImagesForwards() {
    if (currentImageIndex > 170 && currentImageIndex < myCache.cache.length) {
        // get the current position of the scroll bar
        let scrollPosition = window.scrollY;
        // get the scroll height of the document
        let scrollHeight = document.body.scrollHeight;

        // Disable the scroll event listener
        disableScrollEventListener();

        // Define a function to handle the image cycling with setTimeout
        function cycleNextImage() {
            if (currentImageIndex > 170 && currentImageIndex < myCache.cache.length) {
                window.scrollBy(scrollPosition, scrollHeight);

                const currentImage = myCache.cache[currentImageIndex];
                const mainImg = document.getElementById('mainImg');
                mainImg.src = currentImage.src;
                mainImg.style.zIndex = 0;
                currentImageIndex++; // Increment currentImageIndex for the next image
                console.log("currentImageIndex was set to: ", currentImageIndex);


                // Schedule the next image cycle
                setTimeout(cycleNextImage, 42);


            } else {
                console.log("End of the Images");
                // Scroll the page to the bottom smoothly before re-enabling the scroll event listener
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });

                // Wait until the smooth scrolling is complete before re-enabling the scroll event listener
                setTimeout(() => {
                    enableScrollEventListener();
                    // print the current image index
                    console.log("currentImageIndex: ", currentImageIndex);
                }, 1000); // Adjust the delay if needed

                // break out of the function to stop the cycling process
                return;

            }
        }
    }

    // Start the image cycling process
    cycleNextImage();
}

// Define your scroll event listener function
function scrollEventListener() {
    // Calculate the new index based on the scroll position
    const newIndex = Math.floor((window.scrollY / window.innerHeight) * sensitivityFactor);
    if (newIndex !== currentImageIndex) {
        currentImageIndex = newIndex;
        console.log(currentImageIndex);
        updateImage();
    }
}

// Add the scroll event listener
window.addEventListener('scroll', scrollEventListener);


// Function to disable the scroll event listener
function disableScrollEventListener() {
    window.removeEventListener('scroll', scrollEventListener);
}

// Function to enable the scroll event listener
function enableScrollEventListener() {
    window.addEventListener('scroll', scrollEventListener);
}

// Fade in of the table content at a specific image index
function showTableContent(content) {
    let classElement = document.querySelector(`.${content}`);
    if (classElement) {
        classElement.style.visibility = 'visible';
        classElement.classList.remove('fade-out-down'); // Remove fade-out-down if it's there
        classElement.classList.add('fade-in-up');
    }
}

function hideTableContent(content) {
    let classElement = document.querySelector(`.${content}`);
    if (classElement) {
        classElement.classList.remove('fade-in-up'); // Remove fade-in-up if it's there
        classElement.classList.add('fade-out-down');
        // Use a timeout to hide the element after the animation completes
        setTimeout(() => {
            classElement.style.visibility = 'hidden';
            classElement.classList.remove('fade-out-down');
        }, 500); // 500ms matches the duration of the animation
    }
}

// Prepare the icons to be moved and resized correctly depending on the screen size
let smallDevices = window.matchMedia("(max-width: 600px)");
let mediumDevices = window.matchMedia("(min-width: 601px) and (max-width: 991px)");
let largeDevices = window.matchMedia("(min-width: 992px) and (max-width: 1999px)");
let extraLargeDevices = window.matchMedia("(min-width: 2000px)");

let isIconMoved = false;
function moveIcons(iconCont, iconID) {
    let iconContainer = document.querySelector(`.${iconCont}`);
    let iconIMG = document.querySelector(iconID);
    console.log(iconIMG.id);
    let leftValue;
    let widthValue;

    if (smallDevices.matches) {
        if (iconIMG.id === 'feketesereg') {
            leftValue = '-1vw';
            widthValue = '25vw';
        }
        if (iconIMG.id === 'monastary') {
            leftValue = '28vw';
            widthValue = '20vw';
        }
        if (iconIMG.id === 'community') {
            leftValue = '9vw';
            widthValue = '20vw';
        }
        if (iconIMG.id === 'bogracs') {
            leftValue = '30vw';
            widthValue = '40vw';
        }
        if (iconIMG.id === 'hungarian') {
            leftValue = '7vw';
            widthValue = '24vw';
        }
        if (iconIMG.id === 'niceBench') {
            leftValue = '45vw';
            widthValue = '25vw';
        }

    } else if (mediumDevices.matches) {
        if (iconIMG.id === 'feketesereg') {
            leftValue = '9vw';
            widthValue = '25vw';
        }
        if (iconIMG.id === 'monastary') {
            leftValue = '28vw';
            widthValue = '20vw';
        }
        if (iconIMG.id === 'community') {
            leftValue = '11vw';
            widthValue = '20vw';
        }
        if (iconIMG.id === 'bogracs') {
            leftValue = '20vw';
            widthValue = '40vw';
        }
        if (iconIMG.id === 'hungarian') {
            leftValue = '10vw';
            widthValue = '22vw';
        }
        if (iconIMG.id === 'niceBench') {
            leftValue = '29vw';
            widthValue = '22vw';
        }
    } 
    
    else if (largeDevices.matches) {
        if (iconIMG.id === 'feketesereg') {
            leftValue = '9vw';
            widthValue = '25vw';
        }
        if (iconIMG.id === 'monastary') {
            leftValue = '4vw';
            widthValue = '18vw';
        }
        if (iconIMG.id === 'community') {
            leftValue = '8vw';
            widthValue = '20vw';
        }
        if (iconIMG.id === 'bogracs') {
            leftValue = '-5vw';
        }
        if (iconIMG.id === 'hungarian') {
            leftValue = '8vw';
            widthValue = '20vw';
        }
        if (iconIMG.id === 'niceBench') {
            leftValue = '4vw';
            widthValue = '22vw';
        }
    } 
    
    else if (extraLargeDevices.matches) {
        if (iconIMG.id === 'feketesereg') {
            leftValue = '9vw';
            widthValue = '25vw';
        }
        if (iconIMG.id === 'monastary') {
            leftValue = '3vw';
            widthValue = '20vw';
        }
        if (iconIMG.id === 'community') {
            leftValue = '8vw';
            widthValue = '20vw';
        }
        if (iconIMG.id === 'bogracs') {
            leftValue = '-5vw';
            // widthValue = '40vw';
        }
        if (iconIMG.id === 'hungarian') {
            leftValue = '8vw';
        }
        if (iconIMG.id === 'niceBench') {
            leftValue = '4vw';
            widthValue = '21vw';
        }
    }



    if (iconIMG.id === 'feketesereg') {
        let iconLabel = document.querySelector('#label-feketesereg');
        if (!isIconMoved) {
            // change the position of the icon container
            iconContainer.style.left = '68vw';
            // change the width and left position of the icon image
            iconIMG.style.width = widthValue;
            iconIMG.style.left = leftValue;
            // hide the icon label
            iconLabel.style.display = 'none';
            // move the sidebar in from the left
            moveSidebar('sidebar-left', 'contentFeketeSereg');
        } else {
            iconContainer.style.left = '0';
            iconIMG.style.width = '';
            iconIMG.style.left = '';
            iconLabel.style.display = 'block';
            moveSidebar('sidebar-left', 'contentFeketeSereg');
        }
    }

    else if (iconIMG.id === 'monastary') {
        let iconLabel = document.querySelector('#label-monastary');
        if (!isIconMoved) {
            iconContainer.style.left = '-68vw';
            iconIMG.style.width = widthValue;
            iconIMG.style.left = leftValue;
            iconLabel.style.display = 'none';
            moveSidebar('sidebar-right', 'contentMonastary');
        } else {
            iconContainer.style.left = '0';
            iconIMG.style.width = '';
            iconIMG.style.left = '';
            iconLabel.style.display = 'block';
            moveSidebar('sidebar-right', 'contentMonastary');
        }

    }

    else if (iconIMG.id === 'community') {
        let iconLabel = document.querySelector('#label-community');
        if (!isIconMoved) {
            iconContainer.style.left = '68vw';
            // change the width and left position of the icon image
            iconIMG.style.width = widthValue;
            iconIMG.style.left = leftValue;
            // hide the icon label
            iconLabel.style.display = 'none';
            // move the sidebar in from the left
            moveSidebar('sidebar-left', 'contentCommunity');
        } else {
            iconContainer.style.left = '0';
            iconIMG.style.width = '';
            iconIMG.style.left = '';
            iconLabel.style.display = 'block';
            moveSidebar('sidebar-left', 'contentCommunity');
        }

    }

    else if (iconIMG.id === 'bogracs') {
        let iconLabel = document.querySelector('#label-bogracs');
        if (!isIconMoved) {
            iconContainer.style.left = '-70vw';
            // change the width and left position of the icon image
            iconIMG.style.width = widthValue;
            iconIMG.style.left = leftValue;
            // hide the icon label
            iconLabel.style.display = 'none';
            // move the sidebar in from the right
            moveSidebar('sidebar-right', 'contentBogracs');
        } else {
            iconContainer.style.left = '0';
            iconIMG.style.width = '';
            iconIMG.style.left = '';
            iconLabel.style.display = 'block';
            moveSidebar('sidebar-right', 'contentBogracs');
        }

    }

    else if (iconIMG.id === 'hungarian') {
        let iconLabel = document.querySelector('#label-hungarian');
        let niceBench = document.querySelector('#niceBench');
        if (!isIconMoved) {
            iconContainer.style.left = '68vw';
            // change the width and left position of the icon image
            iconIMG.style.width = widthValue;
            iconIMG.style.left = leftValue;
            // hide the icon label
            iconLabel.style.display = 'none';

            // not a clean solution, but it works for now
            niceBench.style.left = '6vw';
            // move the sidebar in from the left
            moveSidebar('sidebar-left', 'contentHungarian');
        } else {
            iconContainer.style.left = '0';
            iconIMG.style.width = '';
            iconIMG.style.left = '';
            iconLabel.style.display = 'block';
            niceBench.style.left = '';
            moveSidebar('sidebar-left', 'contentHungarian');
        }

    }

    else if (iconIMG.id === 'niceBench') {
        let iconLabel = document.querySelector('#label-niceBench');
        if (!isIconMoved) {
            iconContainer.style.left = '-70vw';
            // change the width and left position of the icon image
            iconIMG.style.width = widthValue;
            iconIMG.style.left = leftValue;
            // hide the icon label
            iconLabel.style.display = 'none';
            // move the sidebar in from the right
            moveSidebar('sidebar-right', 'contentNiceBench');
        } else {
            iconContainer.style.left = '0';
            iconIMG.style.width = '';
            iconIMG.style.left = '';
            iconLabel.style.display = 'block';
            moveSidebar('sidebar-right', 'contentNiceBench');
        }

    }

    isIconMoved = !isIconMoved;
}


let isSidebarVisible = false;
function moveSidebar(sidebar, textID) {

    let sidebars = document.getElementsByClassName(sidebar);

    // loop through each element with the class name left-sidebar or right-sidebar
    for (let i = 0; i < sidebars.length; i++) {
        let sidebarContainer = sidebars[i];

        // access child elements of sidebarContainer
        let childElements = sidebarContainer.children;

        // loop through each child element of sidebarContainer
        for (let j = 0; j < childElements.length; j++) {
            // get the id of the child element
            let contentID = childElements[j].id;

            // check if the contentID matches the textID to show the right content
            if (contentID === textID) {

                if (textID === 'contentFeketeSereg') {
                    console.log("contentFeketeSereg");
                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '-69%'; 
                    } else {
                        sidebarContainer.style.left = '-100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentMonastary') {
                    console.log("contentMonastary");

                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '20%'; 
                    } else {
                        sidebarContainer.style.left = '100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentCommunity') {
                    console.log("contentCommunity");
                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '-69%'; 
                    } else {
                        sidebarContainer.style.left = '-100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentBogracs') {
                    console.log("contentBogracs");

                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '20%'; 
                    } else {
                        sidebarContainer.style.left = '100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentHungarian') {
                    console.log("contentHungarian");
                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '-69%'; 
                    } else {
                        sidebarContainer.style.left = '-100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentNiceBench') {
                    console.log("contentNiceBench");

                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '20%'; 
                    } else {
                        sidebarContainer.style.left = '100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }
            }

        }
    }


}


// text carousel
function initCarousel(carousel) {
    let slideIndex = 1;
    const slides = carousel.getElementsByClassName("textSlides");
    const dots = carousel.getElementsByClassName("dot");
    const previousButton = carousel.getElementsByClassName('previous')[0];
    const nextButton = carousel.getElementsByClassName('next')[0];

    showSlides(slideIndex);

    previousButton.onclick = function (event) {
        event.preventDefault();
        plusSlides(-1);
    };
    nextButton.onclick = function (event) {
        event.preventDefault();
        plusSlides(1);
    };

    for (let i = 0; i < dots.length; i++) {
        dots[i].onclick = function () {
            currentSlide(i + 1);
        };
    }

    function plusSlides(n) {
        if ((n > 0 && slideIndex < slides.length) || (n < 0 && slideIndex > 1)) {
            showSlides(slideIndex += n);
        }
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {

        if (n > slides.length) { slideIndex = slides.length; }
        if (n < 1) { slideIndex = 1; }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";

        changeButtonStyle();
    }

    function changeButtonStyle() {
        previousButton.classList.remove('arrow-disabled');
        previousButton.classList.add('arrow-default');
        nextButton.classList.remove('arrow-disabled');
        nextButton.classList.add('arrow-default');

        if (slideIndex === 1) {
            previousButton.classList.remove('arrow-default');
            previousButton.classList.add('arrow-disabled');
            previousButton.style.pointerEvents = 'none';
        } else {
            previousButton.style.pointerEvents = 'auto';
        }

        if (slideIndex === slides.length) {
            nextButton.classList.remove('arrow-default');
            nextButton.classList.add('arrow-disabled');
            nextButton.style.pointerEvents = 'none';
        } else {
            nextButton.style.pointerEvents = 'auto';
        }
    }
}

document.querySelectorAll('.sidebar-content').forEach(initCarousel);


// automatic slideshow
let autoSlideIndex = [0, 0, 0, 0, 0, 0];
let slideId = ["imgSlides1", "imgSlides2", "imgSlides3", "imgSlides4", "imgSlides5", "imgSlides6"];
autoSlides(0, 0);
autoSlides(0, 1);
autoSlides(0, 2);
autoSlides(0, 3);
autoSlides(0, 4);
autoSlides(0, 5);

function autoSlides(n, no) {
    let i;
    let slides = document.getElementsByClassName(slideId[no]);

    for (i = 0; i < slides.length; i++) {
        slides[i].getElementsByTagName('img')[0].classList.remove('visible'); // Hide all images
    }
    autoSlideIndex[no]++;
    if (autoSlideIndex[no] > slides.length) {
        autoSlideIndex[no] = 1;
    }
    slides[autoSlideIndex[no] - 1].getElementsByTagName('img')[0].classList.add('visible'); // Show the current image
    setTimeout(() => autoSlides(n, no), 4000); // Change image every 2 seconds
}

