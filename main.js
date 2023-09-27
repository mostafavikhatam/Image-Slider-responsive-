const initSlider = ()=>{
    const sliderButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = document.querySelector(".scrollbar-thumb")
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
//Handle scrollbar thumb drag
scrollbarThumb.addEventListener("mousedown" , (e)=>{
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    //Update thumb position on mouse move
    const handleMouseMove = (e)=>{
        const daltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + daltaX;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const boundedPosition = Math.max(0 , Math.min(maxThumbPosition , newThumbPosition));
        const scrollPosition = (boundedPosition /maxThumbPosition ) * maxScrollLeft;



        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft =  scrollPosition;
    }
    //remove event listener on mouse up
    const handleMouseUp =() =>{
        document.removeEventListener("mousemove" , handleMouseMove);
        document.removeEventListener("mouseup" , handleMouseUp);
    }
    //Add event listeners for drag interaction
    document.addEventListener("mousemove" , handleMouseMove);
    document.addEventListener("mouseup" , handleMouseUp);
});
    //Slide images according to the slide button clicks
    sliderButtons.forEach(button =>{
        button.addEventListener("click" , ()=>{
            // console.log(button)
            const direction = button.id ==="prev-slider" ? -1 : 1 ;
             const scrollAmount = imageList.clientWidth * direction;
             imageList.scrollBy({left: scrollAmount , behavior: "smooth"});

        })
    });


    const handleSlideButton = () => {
        sliderButtons[0].style.display = imageList.scrollLeft <=0 ? "none" : "block";
        sliderButtons[1].style.display = imageList.scrollLeft >=maxScrollLeft ? "none" : "block";
    };
    //update -scrollbar - thumb position based on image scroll
    const updateScrollThumbPosition = ()=>{
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition /maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`
    }
    imageList.addEventListener("scroll" , ()=>{
        handleSlideButton();
        updateScrollThumbPosition()
    });
};

window.addEventListener("load" , initSlider)