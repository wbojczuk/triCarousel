"use strict";


const triCarousel = {

    shadows: true,
    shuffle: true,

    // If no images are being used
    bgColor: "black",

    //hover effects: none, slide-up, slide-down, peek
    hoverEffect: "slide-down",

    // LEAVE NULL FOR RANDOM INDEX -- must have shuffle off for this option to be effective
    cardStartIndex: null,

    // CONTAINER SIZE, takes any valid units
    containerSize: "40vw",

    carouselSpeed: "0.9s",

    // CARD SIZE IN PERCENTAGES
    cardWidth: 45,
    cardHeight: 70,


/* 
        ----- CARD TEMPLATE -----
        {
            title: "JSDevTools",
            subtitle: "subtitle",
            link: "https://github.com/wbojczuk/JSDevTools",
            image: `image/url`,
        }
        --> All ATTRIBUTES SHOULD BE PRESENT, SET TO AN EMPTY STRING IF UNUSED.
        --> EMPTY IMAGE ATTRIBUTES WILL DEFAULT TO THE BACKGROUND COLOR SPECIFIED IN bgColor
*/

    cards: [
        {
            title: "JSDevTools",
            subtitle: "subtitle",
            link: "https://github.com/wbojczuk/JSDevTools",
            image: `images/bg${randInt(1,3)}.jpg`,
        },
        {
            title: "Github",
            subtitle: "subtitle",
            link: "https://github.com/wbojczuk",
            image: `images/bg${randInt(1,3)}.jpg`,
        },
        {
            title: "My Portfolio",
            subtitle: "subtitle",
            image: `images/bg${randInt(1,3)}.jpg`,
            link: "https://williambojczuk.dev"
        },
        {
            title: "My Website",
            subtitle: "subtitle",
            image: `images/bg${randInt(1,3)}.jpg`,
            link: "https://williambojczuk.com/"
        },
        {
            title: "Animation Storm",
            subtitle: "subtitle",
            image: `images/bg${randInt(1,3)}.jpg`,
            link: "https://wbojczuk.github.io/animationstorm"
        },
        {
            title: "Realm Shooter",
            subtitle: "subtitle",
            image: `images/bg${randInt(1,3)}.jpg`,
            link: "http://realmshooter.com"
        },
        
    ],


    init: ()=>{

        // Inject Styles

        const mainStyles = document.createElement("style");
        mainStyles.id = "triCarStyles";

        /*
                     -------------   START MAIN STYLES ------------
        */

        mainStyles.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
        
        .tri-carousel-container{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: ${triCarousel.containerSize};
            aspect-ratio: 1/1;
            position: relative;
        }
        
        .tri-carousel-center{
            display: inline-block;
            position: relative;
            height: ${triCarousel.cardHeight}%;
            width: ${triCarousel.cardWidth}%;
            /* aspect-ratio: 1/1.5; */
            /* border: 1px solid black; */
        }
        
        .tri-carousel-card{
            display: inline-block;
            text-decoration: none;
            position: absolute;
            height: 100%;
            width: 100%;
            top:0;
            bottom:0;
            background-color: none;
            transition: transform ${triCarousel.carouselSpeed}, 0.2s top ease-in-out;
            border: 0px solid transparent;
            border-radius: 10px;
            color:rgb(30, 86, 170);
            cursor: pointer;
        }
        
        
        .tri-carousel-card-shadow{
            width: 100%;
            position: absolute;
            bottom: -10%;
            height: 3%;
            left: 0;
            background-color: rgba(0,0,0,0.3);
            border: 0px solid transparent;
            border-radius: 50%;
            filter: blur(6px); 
            transition: 0.2s bottom ease-in-out, 0.2s width ease-in-out, 0.2s left ease-in-out, 0.2s height ease-in-out, 0.2s background-color ease-in-out;
            pointer-events: none;
        }
        .tri-carousel-card-bg{
                display: inline-block;
                position: absolute;
                min-width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                
                border: 0px solid transparent;
                border-radius: 10px;
                z-index: -13;
        }
        .tri-carousel-card-styling{
            display: none;
        }
        
        /* CARD ANIMATIONS */
        
        .tri-carousel-center .temp-card{
            transform: translateX(0) scale(0);
        }
        .tri-carousel-center .left-card{
            transform: translateX(-110%) scale(0.5);
        }
        .tri-carousel-center .main-card{
            transform: translateX(0) scale(1);
        }
        .tri-carousel-center .right-card{
            transform: translateX(110%) scale(0.5);
        }
        
        
        .tri-carousel-card-title{
            display: flex;
            width: 100%;
            
            margin-top: 60%;
            padding: 2% 0;
            font-size: 2vw;
            font-weight: 400;
            align-items: center;
            justify-content: center;
            color: white;
            background-color: rgba(0,0,0,0.3);
            font-family: "Fredericka the Great", cursive;
        }
        
        
        
        .tri-carousel-rarrow{
            position: absolute;
            right: -30%;
            top: 45%;
            height: 10%;
            aspect-ratio: 1/1;
            background-image: url("./images/chevron-right.svg");
            background-size: 100%;
        }
        .tri-carousel-larrow{
            position: absolute;
            left: -30%;
            top: 45%;
            height: 10%;
            aspect-ratio: 1/1;
            background-image: url("./images/chevron-left.svg");
            background-size: 100%;
        }
        
        
        
        /* GENERAL CLASSES */
        .carousel-arrow{
            cursor: pointer;
            transform: scale(1);
            transition: transform 0.3s ease-in-out;
            z-index: 15;
        }
        .carousel-arrow:hover{
            transform: scale(1.2);
        }
        `;


        /*
                     -------------   END MAIN STYLES ------------
        */
       document.getElementsByTagName("head")[0].append(mainStyles);

        const hoverStyles = document.createElement("style");
        hoverStyles.id = "triCarHoverStyles";
        switch((triCarousel.hoverEffect).toLowerCase()){

            /*
                     -------------   START HOVER STYLES ------------
        */

            case "slide-up":
                hoverStyles.textContent = `
                .tri-carousel-card:hover{
                    top: -5%;
                    cursor: pointer;
                }

                .tri-carousel-card:hover .tri-carousel-card-shadow{
                    bottom: -15%;
                    width: 90%;
                    left: 5%;
                    height: 2%;
                }
                `;
                document.getElementsByTagName("head")[0].append(hoverStyles);
            break;

            case "peek":
                hoverStyles.textContent = `
                .tri-carousel-card-styling{
                    display: inline-block;
                    position: absolute;
                    min-width: 20%;
                    height: 90%;
                    top: 4%;
                    right: 1%;
                    border: 0px solid transparent;
                    border-radius: 10px;
                    z-index: -15;
                    background-color: #9170b4;
                    transform: rotate(0);
                    transition: transform 0.2s ease-in-out;
                }
                
                .tri-carousel-card-styling:after{
                    content: ">";
                    font-family: monospace;
                    display: inline-block;
                    position: absolute;
                    right:2px;
                    top:2px;
                    font-size: 3vw;
                    color: #7db3e1;
                }
                
                .tri-carousel-card:hover .tri-carousel-card-styling{
                    transform: rotate(10deg);
                }
                `;
                document.getElementsByTagName("head")[0].append(hoverStyles);
            break;

            case "slide-down":
                hoverStyles.textContent = `
                .tri-carousel-card{
                    transition: transform ${triCarousel.carouselSpeed}, 0.2s top ease-in-out;
                }
                .tri-carousel-card-styling{
                    display: inline-block;
                    position: absolute;
                    min-width: 92%;
                    height: 20%;
                    top: 1%;
                    left: 4%;
                    border: 0px solid transparent;
                    border-radius: 10px;
                    z-index: -15;
                    background-color: #9170b4;
                    transform: rotate(0);
                    transition: 0.3s top ease-in-out;
                }
                
                .tri-carousel-card:hover .tri-carousel-card-styling{
                 top: -10%; 
                }
                
                .tri-carousel-card-styling:after{
                    content: ">";
                    font-family: monospace;
                    display: inline-block;
                    position: absolute;
                    right:2%;
                    top:-10%;
                    font-size: 3vw;
                    color: #7db3e1;
                    transform: rotate(-200deg);
                    transition: 0.4s transform ease-in-out;
                }
                .tri-carousel-card:hover .tri-carousel-card-styling:after{
                    transform: rotate(0);
                }
                
                .tri-carousel-card:hover{
                    top: 10%;
                }
                
                .tri-carousel-card:hover .tri-carousel-card-shadow{
                    bottom: -3%;
                    width: 105%;
                    left: -2.5%;
                    height: 2%;
                    background-color: rgba(0,0,0,0.6);
                }
                `;

                
            /*
                     -------------   END HOVER STYLES ------------
        */
                document.getElementsByTagName("head")[0].append(hoverStyles);
            break;

        }

        // SET UP CARD TEMPLATE
        if(triCarousel.shuffle){triCarousel.cards = triCarousel.cards.sortRandom();}
        const cardTemplate = document.createElement("a");
        cardTemplate.className = "tri-carousel-card";
        cardTemplate.target = "_blank";
        const cardTitle = document.createElement("div");
        cardTitle.className = "tri-carousel-card-title";
        const cardSubtitle = document.createElement("div");
        cardSubtitle.className = "tri-carousel-card-subtitle";

        const cardStyling = document.createElement("div");
        cardStyling.className = "tri-carousel-card-styling";
        cardTemplate.append(cardStyling);

        const cardBg = document.createElement("div");
        cardBg.className = "tri-carousel-card-bg";
        cardTemplate.append(cardBg);

        cardTemplate.append(cardTitle);
        cardTemplate.append(cardSubtitle);
        const bgColor = triCarousel.bgColor;

        
        
        if(triCarousel.shadows){
            const cardShadow = document.createElement("div");
            cardShadow.className = "tri-carousel-card-shadow";
            cardTemplate.append(cardShadow);
        }
        const cards = triCarousel.cards;
        const cardsIndex = cards.length - 1;

        // REFERENCES
        const cardContainer = document.querySelector(".tri-carousel-center");
        let mIndex = (triCarousel.cardStartIndex != null) ? triCarousel.cardStartIndex :  randInt(0, cardsIndex);
        let lIndex = (mIndex > 0) ? (mIndex - 1) : cardsIndex;
        let rIndex = (mIndex < cardsIndex) ? (mIndex + 1) : 0;
        let ready = true;


        // INITIAL SET UP
        const mainCard = cardTemplate.cloneNode(true);
        mainCard.querySelector(".tri-carousel-card-title").textContent = cards[mIndex].title;
        mainCard.classList.add("main-card");
        if(cards[mIndex].image != ""){
            mainCard.querySelector(".tri-carousel-card-bg").style.backgroundImage = `url('${cards[mIndex].image}')`;
            mainCard.querySelector(".tri-carousel-card-bg").style.backgroundSize = "cover";
            mainCard.querySelector(".tri-carousel-card-bg").style.backgroundPosition = "center";
        } else {
            mainCard.querySelector(".tri-carousel-card-bg").style.backgroundColor = bgColor;
            
        }
        mainCard.href = cards[mIndex].link;
        
        

        const leftCard = cardTemplate.cloneNode(true);
        leftCard.querySelector(".tri-carousel-card-title").textContent = cards[lIndex].title;
        leftCard.classList.add("left-card");
        if(cards[lIndex].image != ""){
            leftCard.querySelector(".tri-carousel-card-bg").style.backgroundImage = `url('${cards[lIndex].image}')`;
            leftCard.querySelector(".tri-carousel-card-bg").style.backgroundSize = "cover";
            leftCard.querySelector(".tri-carousel-card-bg").style.backgroundPosition = "center";
        } else {
            leftCard.querySelector(".tri-carousel-card-bg").style.backgroundColor = bgColor;
            
        }
        leftCard.href = cards[lIndex].link;
        

        const rightCard = cardTemplate.cloneNode(true);
        rightCard.querySelector(".tri-carousel-card-title").textContent = cards[rIndex].title;
        rightCard.classList.add("right-card");
        if(cards[rIndex].image != ""){
            rightCard.querySelector(".tri-carousel-card-bg").style.backgroundImage = `url('${cards[rIndex].image}')`;
            rightCard.querySelector(".tri-carousel-card-bg").style.backgroundSize = "cover";
            rightCard.querySelector(".tri-carousel-card-bg").style.backgroundPosition = "center";
        } else {
            rightCard.querySelector(".tri-carousel-card-bg").style.backgroundColor = bgColor;
            
        }
        rightCard.href = cards[rIndex].link;
        
        

        const tempCard = cardTemplate.cloneNode(true);
        tempCard.classList.add("temp-card");
        
        

        cardContainer.append(leftCard);
        cardContainer.append(mainCard);
        cardContainer.append(rightCard);
        cardContainer.append(tempCard);


        // RIGHT ARROW LISTENER
        document.querySelector(".tri-carousel-rarrow").addEventListener("click", ()=>{
            if(ready){
                let right = cardContainer.querySelector(".right-card");
                let left = cardContainer.querySelector(".left-card");
                let main = cardContainer.querySelector(".main-card");
                let temp = cardContainer.querySelector(".temp-card");

                // SHIFT INDEXES
                rIndex = mIndex;
                mIndex = lIndex;
                lIndex = (lIndex > 0)? (lIndex - 1) : cardsIndex;
                

                // WHAT WILL TEMP BE??
                temp.querySelector(".tri-carousel-card-title").textContent = cards[lIndex].title;
                if(cards[lIndex].image != ""){
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundImage = `url('${cards[lIndex].image}')`;
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundSize = "cover";
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundPosition = "center";
                } else {
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundImage = "none";
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundColor = bgColor;
                }

                temp.classList.remove("temp-card");
                temp.classList.add("left-card");
                left.classList.remove("left-card");
                left.classList.add("main-card");
                main.classList.remove("main-card");
                main.classList.add("right-card");
                right.classList.remove("right-card");
                right.classList.add("temp-card");

                right = cardContainer.querySelector(".right-card");
                left = cardContainer.querySelector(".left-card");
                main = cardContainer.querySelector(".main-card");
                temp = cardContainer.querySelector(".temp-card");

                right.href = cards[rIndex].link;
                left.href = cards[lIndex].link;
                main.href = cards[mIndex].link;

                main.style.zIndex = "8";
                right.style.zIndex = "6";
                left.style.zIndex = "3";
                temp.style.zIndex = "-10";

                ready = false;
                setTimeout(()=>{ready = true;},400);
            }
        });

        // LEFT ARROW LISTENER
        document.querySelector(".tri-carousel-larrow").addEventListener("click", ()=>{
            if(ready){
                let right = cardContainer.querySelector(".right-card");
                let left = cardContainer.querySelector(".left-card");
                let main = cardContainer.querySelector(".main-card");
                let temp = cardContainer.querySelector(".temp-card");

                // SHIFT INDEXES
                lIndex = mIndex;
                mIndex = rIndex;
                rIndex =  (rIndex < cardsIndex)? (rIndex + 1) : 0;
                

                // WHAT WILL TEMP BE??
                temp.querySelector(".tri-carousel-card-title").textContent = cards[rIndex].title;
                if(cards[rIndex].image != ""){
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundImage = `url('${cards[rIndex].image}')`;
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundSize = "cover";
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundPosition = "center";
                } else {
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundImage = "none";
                    temp.querySelector(".tri-carousel-card-bg").style.backgroundColor = bgColor;
                }
                temp.classList.remove("temp-card");
                temp.classList.add("right-card");
                left.classList.remove("left-card");
                left.classList.add("temp-card");
                main.classList.remove("main-card");
                main.classList.add("left-card");
                right.classList.remove("right-card");
                right.classList.add("main-card");

                // REFRESH REFERENCES
                right = cardContainer.querySelector(".right-card");
                left = cardContainer.querySelector(".left-card");
                main = cardContainer.querySelector(".main-card");
                temp = cardContainer.querySelector(".temp-card");

                right.href = cards[rIndex].link;
                left.href = cards[lIndex].link;
                main.href = cards[mIndex].link;
                main.style.zIndex = "8";
                right.style.zIndex = "3";
                left.style.zIndex = "6";
                temp.style.zIndex = "-10";
                

                ready = false;
                setTimeout(()=>{ready = true;},400);
            }
        });
         
        //FUNCTIONS


        
    },
    
};

// JSDevTools Helper Functions
function randInt(min, max){
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

Array.prototype.sortRandom = function(){
    const targetArray = this;
    const arrayLength = targetArray.length;
    const arrayRefs = [];
    const outputArray = [];

    for(let i = 0; i < arrayLength; i++){
        arrayRefs.push(i);
    }
    for(let i = 0; i < arrayLength; i++){
        const currentNum = Math.floor(Math.random() * (arrayRefs.length - 0) + 0);
        outputArray.push(targetArray[arrayRefs[currentNum]]);
        arrayRefs.splice(currentNum, 1);
    }
    return outputArray;
};

// Initialize Carousel
triCarousel.init();

