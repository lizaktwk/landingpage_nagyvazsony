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
        } else {
            hideTableContent('welcome');
        }

        // show welcome table content at specific image index --> Icons: Fekete Sereg + 
        if (currentImageIndex >= 151 && currentImageIndex <= 154) {
            showTableContent('icon-container-1');
            // showTableContent('sidebar-left');
        } else {
            hideTableContent('icon-container-1');
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

function showTableContent(content) {
    // let element = document.getElementById(content);
    let classElement = document.querySelector(`.${content}`);
    classElement.style.visibility = 'visible';

}

function hideTableContent(content) {
    let classElement = document.querySelector(`.${content}`);
    if (classElement) {
        classElement.style.visibility = 'hidden';
    }
}

let isIconMoved = false;
function moveIcons(iconCont, iconID) {
    const iconContainer = document.querySelector(`.${iconCont}`);
    const icon = document.querySelector(iconID);

    

    if (icon.id === 'feketesereg') {
        if (!isIconMoved) {
            // icon.style.width = '20vw'; // Adjust as needed   
            iconContainer.style.left = '65vw'; // Adjust as needed
            moveSidebar('sidebar-left', 'contentFeketeSereg');
  

        } else {
            // icon.style.width = "400px";
            iconContainer.style.left = '0';
            moveSidebar('sidebar-left', 'contentFeketeSereg');


        }

    }

    else if (icon.id === 'monastary') {
        if (!isIconMoved) {
            // sidebarLeft.forEach(el => el.parentNode.removeChild(el));
            iconContainer.style.left = '-70vw'; // Adjust as needed
            moveSidebar('sidebar-right', 'contentMonastary');
            // icon.style.width = '20vw'; // Adjust as needed   
        } else {
            iconContainer.style.left = '0';
            // icon.style.width = "400px";
            moveSidebar('sidebar-right', 'contentMonastary');
        }

    }

    isIconMoved = !isIconMoved;
}


let isSidebarVisible = false;
function moveSidebar(sidebar, textID) {
    let sidebars = document.getElementsByClassName(sidebar);

    let sidebarLeft = document.querySelectorAll(".sidebar-left");
    let sidebarRight = document.querySelectorAll(".sidebar-right");

    // loop through each element with the class name left-sidebar or right-sidebar
    for (let i = 0; i < sidebars.length; i++) {
        let sidebarContainer = sidebars[i];

        // access child elements of sidebarContainer
        let childElements = sidebarContainer.children;

        // loop through each child element of sidebarContainer
        for (let j = 0; j < childElements.length; j++) {
            // get the id of the child element
            let contentID = childElements[j].id;
            console.log("contentID: " + contentID);

            // check if the contentID matches the textID to show the right content
            if (contentID === textID) {

                if (textID === 'contentFeketeSereg') {
                    console.log("contentFeketeSereg");
                    if (!isSidebarVisible) {
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '0'; // Adjust as needed
                    } else {
                        sidebarContainer.style.left = '-100%';
                        // sidebarContainer.style.visibility = 'hidden';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }

                if (textID === 'contentMonastary') {
                    console.log("contentMonastary");

                    if (!isSidebarVisible) {
                        // sidebarLeft.forEach(el => el.parentNode.removeChild(el));
                        // void document.body.offsetHeight;
                        sidebarContainer.style.visibility = 'visible';
                        sidebarContainer.style.left = '20%'; // Adjust as needed
                        // sidebarContainer.style.left = '0'; // Adjust as needed
                        console.log("sidebar moved to 0");
                    } else {
                        sidebarContainer.style.left = '100%';
                        console.log("sidebar moved to 100");
                        //sidebarContainer.style.visibility = 'hidden';
                    }
                    isSidebarVisible = !isSidebarVisible;
                }
            }

        }
    }

}


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


// let isSidebarVisible = false;
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