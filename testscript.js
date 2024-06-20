// function imageCache(base, firstNum, lastNum) {
//     this.cache = [];
//     for (let i = firstNum; i <= lastNum; i++) {
//         const frames = new Image();
//         if (i <= 9) {
//             frames.src = base + "00" + i + ".png";
//         } else if (i <= 99) {
//             frames.src = base + "0" + i + ".png";
//         } else {
//             frames.src = base + i + ".png";
//         }
//         this.cache.push(frames);
//     }
// }

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


// const myCache = new imageCache('./WEB-PNG/Web', 0, 478);
// const myCache = new imageCache('./Final-PNGs/', 1, 440);
const myCache = new imageCache('./Final-PNGs1/', 1, 440);
// const myCache = new imageCache('./Final_TableOneShot_PNGs', 1, 440);
// src="./Final-PNGs/0001.png
let currentImageIndex = 0;

// Sensitivity factor for the scrolling behaviour (lower value means higher sensitivity)
let sensitivityFactor = 3;

// Calculate the height of the document based on the number of images
document.body.style.height = `${(myCache.cache.length - 1) * window.innerHeight / sensitivityFactor}px`;
let bodyHeight = document.body.style.height;


let scrollbarInitCyclePos;

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

        // show welcome table content at specific image index --> Icons: Fekete Sereg + 
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
            // cycleImages();
            cycleImagesForwards();
        }

        if (currentImageIndex === 435) {
            cycleImagesBackwards();
        }
    }

}

function cycleImagesBackwards() {
    if (currentImageIndex < 436 && currentImageIndex >= 175) {
        // console.log("scrollBarInitCyclePos: ", scrollHeight);
        console.log("scrollbarInitCyclePos: ", scrollbarInitCyclePos);
        disableScrollEventListener();

        function cyclePreviousImage() {
            if (currentImageIndex < 436 && currentImageIndex >= 175) {
                // window.scrollBy(scrollPosition, scrollbarInitCyclePos);
                window.scrollTo({ top: scrollbarInitCyclePos, behavior: 'smooth' });

                const currentImage = myCache.cache[currentImageIndex];
                const mainImg = document.getElementById('mainImg');
                mainImg.src = currentImage.src;
                mainImg.style.zIndex = 0;
                currentImageIndex--; // Decrement currentImageIndex for the previous image
                console.log("currentImageIndex was set to: ", currentImageIndex);

                // Schedule the next image cycle
                setTimeout(cyclePreviousImage, 42);
            } else {
                console.log("Reached start of the cycle");

                // Scroll the page to the top smoothly before re-enabling the scroll event listener
                // window.scrollTo({top: scrollbarInitCyclePos, behavior: 'smooth'});
                // window.scrollTo({
                //     top: 0,
                //     behavior: 'smooth'
                // });

                // Wait until the smooth scrolling is complete before re-enabling the scroll event listener
                setTimeout(() => {
                    enableScrollEventListener();
                }, 1000); // Adjust the delay if needed
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
                // Scroll the page to the bottom incrementally
                // const scrollStep = document.body.scrollHeight / remainingImgs;
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
                    // updateImage();
                }, 1000); // Adjust the delay if needed

                // break out of the function to stop the cycling process
                return;

            }
        }
    }

    // Start the image cycling process
    cycleNextImage();
}



// Working CYCLE IMAGES FUNCTION:
// function cycleImages() {
//     if (currentImageIndex > 170 && currentImageIndex < myCache.cache.length) {
//         // get the current position of the scroll bar
//         let scrollPosition = window.scrollY;
//         // get the scroll height of the document
//         let scrollHeight = document.body.scrollHeight;
//         console.log("scrollHeight: ", scrollHeight);

//         // Disable the scroll event listener
//         disableScrollEventListener();

//         // Define a function to handle the image cycling with setTimeout
//         function cycleNextImage() {
//             if (currentImageIndex > 170 && currentImageIndex < myCache.cache.length) {
//                 // Scroll the page to the bottom incrementally
//                 // const scrollStep = document.body.scrollHeight / remainingImgs;
//                 window.scrollBy(scrollPosition, scrollHeight);

//                 const currentImage = myCache.cache[currentImageIndex];
//                 const mainImg = document.getElementById('mainImg');
//                 mainImg.src = currentImage.src;
//                 mainImg.style.zIndex = 0;
//                 currentImageIndex++; // Increment currentImageIndex for the next image
//                 console.log("currentImageIndex was set to: ", currentImageIndex);


//                 // Schedule the next image cycle
//                 setTimeout(cycleNextImage, 42);


//             } else {
//                 console.log("End of the Images");
//                 // Scroll the page to the bottom smoothly before re-enabling the scroll event listener
//                 window.scrollTo({
//                     top: document.body.scrollHeight,
//                     behavior: 'smooth'
//                 });

//                 // Wait until the smooth scrolling is complete before re-enabling the scroll event listener
//                 setTimeout(() => {
//                     enableScrollEventListener();
//                     // print the current image index
//                     console.log("currentImageIndex: ", currentImageIndex);
//                     // updateImage();
//                 }, 1000); // Adjust the delay if needed

//                 // break out of the function to stop the cycling process
//                 return;

//             }



//         }
//     }

//     // Start the image cycling process
//     cycleNextImage();
// }

// Define your scroll event listener function
function scrollEventListener() {
    // Calculate the new index based on the scroll position
    const newIndex = Math.floor((window.scrollY / window.innerHeight) * sensitivityFactor);
    console.log("newIndex: ", newIndex);

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

// window.addEventListener('scroll', function () {

//     // Calculate the new index based on the scroll position
//     const newIndex = Math.floor((window.scrollY / window.innerHeight) * sensitivityFactor);

//     if (newIndex !== currentImageIndex) {
//         currentImageIndex = newIndex;
//         console.log(currentImageIndex);
//         updateImage();
//     }
// });



window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

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

let isIconMoved = false;
function moveIcons(iconCont, iconID) {
    let iconContainer = document.querySelector(`.${iconCont}`);
    let iconIMG = document.querySelector(iconID);
    let iconParent = iconIMG.parentNode;

    if (iconIMG.id === 'feketesereg') {
        if (!isIconMoved) {
            iconContainer.style.left = '68vw';
            moveSidebar('sidebar-left', 'contentFeketeSereg');
        } else {
            iconContainer.style.left = '0';
            moveSidebar('sidebar-left', 'contentFeketeSereg');
        }
    }

    else if (iconIMG.id === 'monastary') {
        if (!isIconMoved) {
            iconContainer.style.left = '-70vw';
            moveSidebar('sidebar-right', 'contentMonastary');
        } else {
            iconContainer.style.left = '0';
            moveSidebar('sidebar-right', 'contentMonastary');
        }

    }

    else if (iconIMG.id === 'community') {
        if (!isIconMoved) {
            iconContainer.style.left = '68vw';
            moveSidebar('sidebar-left', 'contentCommunity');
        } else {
            iconContainer.style.left = '0';
            moveSidebar('sidebar-left', 'contentCommunity');
        }

    }

    else if (iconIMG.id === 'bogracs') {
        if (!isIconMoved) {
            iconContainer.style.left = '-70vw';
            moveSidebar('sidebar-right', 'contentBogracs');
        } else {
            iconContainer.style.left = '0';
            moveSidebar('sidebar-right', 'contentBogracs');
        }

    }

    else if (iconIMG.id === 'hungarian') {
        if (!isIconMoved) {
            iconContainer.style.left = '68vw';
            moveSidebar('sidebar-left', 'contentHungarian');
        } else {
            iconContainer.style.left = '0';
            moveSidebar('sidebar-left', 'contentHungarian');
        }

    }

    else if (iconIMG.id === 'niceBench') {
        if (!isIconMoved) {
            iconContainer.style.left = '-70vw';
            moveSidebar('sidebar-right', 'contentNiceBench');
        } else {
            iconContainer.style.left = '0';
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
                        sidebarContainer.style.left = '-69%'; // Adjust as needed (was set to 0 before fade-in-up was added...)
                    } else {
                        sidebarContainer.style.left = '-100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentMonastary') {
                    console.log("contentMonastary");

                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '20%'; // Adjust as needed
                    } else {
                        sidebarContainer.style.left = '100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentCommunity') {
                    console.log("contentCommunity");
                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '-69%'; // Adjust as needed (was set to 0 before fade-in-up was added...)
                    } else {
                        sidebarContainer.style.left = '-100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentBogracs') {
                    console.log("contentBogracs");

                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '20%'; // Adjust as needed
                    } else {
                        sidebarContainer.style.left = '100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentHungarian') {
                    console.log("contentHungarian");
                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '-69%'; // Adjust as needed (was set to 0 before fade-in-up was added...)
                    } else {
                        sidebarContainer.style.left = '-100%';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentNiceBench') {
                    console.log("contentNiceBench");

                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '20%'; // Adjust as needed
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

