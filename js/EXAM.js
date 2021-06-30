let startBtn = document.querySelector(".start-btn");
let exitBtn = document.querySelector(".exit-btn");
let continueButton = document.querySelector(".continue-btn");
let firstStage = document.querySelector(".firststage");
let secondStage = document.querySelector(".secondstage");
let thirdStage = document.querySelector(".thirdstage");
let timerGraphic = document.querySelector(".timer-graphic");
let numberLogical = document.querySelector(".number-logical");


let question = document.querySelector(".question");
let option1 = document.querySelector(".option1");
let option2 = document.querySelector(".option2");
let option3 = document.querySelector(".option3");
let option4 = document.querySelector(".option4");
// 


startBtn.addEventListener("click", () => {
    firstStage.classList.add("none");
    secondStage.classList.add("block")
})

exitBtn.addEventListener("click", () => {
    firstStage.classList.replace("none", "block");
    secondStage.classList.replace("block", "none")
})

continueButton.addEventListener("click", () => {
    secondStage.classList.replace("block", "none");
    thirdStage.classList.add("block");
    i = 0;
    createQuestion(i);
})

// 

function Circle(Question, option1, option2, option3, option4, corrctoption) {
    this.Question = Question;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.corrctoption = corrctoption;
}

let Question1 = new Circle('English ...... in many countries.', "speaks", "is speaking", "is spoken", "has spoken", "is spoken");
let Question2 = new Circle("The tiger ...... in the forest last year.", "sees", "is seen", "saw", "was seen", "was seen");
let Question3 = new Circle("When ...... ?", "was the bridge biult", "the bridge was built", "the bridge biult", "did the bridge build", "was the bridge biult");
let Question4 = new Circle("He always tells the truth, ...... ?", "does he", "does not he", "is not he", "he is not", "does not he");
let Question5 = new Circle("You and I are present, ......", "are not I", "are not us", "are not we", "are not you", "are not we");
let AllQuestions = [Question1, Question2, Question3, Question4, Question5];

let options = document.querySelectorAll(".option");

function createQuestion(i) {
    question.innerHTML = AllQuestions[i].Question;
    option1.innerHTML = AllQuestions[i].option1;
    option2.innerHTML = AllQuestions[i].option2;
    option3.innerHTML = AllQuestions[i].option3;
    option4.innerHTML = AllQuestions[i].option4;

    timer = setInterval(() => {
        if (Number(numberLogical.innerHTML) >= 1) {
            let x = numberLogical.innerHTML;
            numberLogical.innerHTML = Number(x - 1);
        }
    }, 1000)
    options.forEach((value) => {
        value.addEventListener("click", optionhandler)
    })

    function optionhandler(e) {
        if (e.target.innerHTML == AllQuestions[i].corrctoption) {
            e.target.style.backgroundColor = "#addec5";
            removeEvent();
            stopGraphicAnimation();
            clearInterval(timer);
        }
        else {
            e.target.style.backgroundColor = "#e6a1a1";
            removeEvent()
            stopGraphicAnimation();
            clearInterval(timer);
        }
    }




    // functions
    function removeEvent() {
        options.forEach((value) => {
            value.removeEventListener("click", optionhandler)
        })
    }

    function stopGraphicAnimation() {
        timerGraphic.style.animationPlayState = "paused";
    }



}



