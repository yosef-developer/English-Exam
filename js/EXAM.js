let startBtn = document.querySelector(".start-btn");
let exitBtn = document.querySelector(".exit-btn");
let continueButton = document.querySelector(".continue-btn");
let firstStage = document.querySelector(".firststage");
let secondStage = document.querySelector(".secondstage");
let thirdStage = document.querySelector(".thirdstage");
let timerGraphic = document.querySelector(".timer-graphic");
let numberLogical = document.querySelector(".number-logical");
let questionNumberOf = document.querySelector(".question-number-of");
let finalQuestion = document.querySelector(".final-question");
let forthStage = document.querySelector(".forthstage");
let nextQue = document.querySelector(".nextque");
let question = document.querySelector(".question");
let textScore = document.querySelector(".text-score");
let finalScoreFrom = document.querySelector(".final-score-from");
let scoreSticker = document.querySelector(".score-sticker");
let replyQuiz = document.querySelector(".reply-quiz");
let quitQuiz = document.querySelector(".quit-quiz");
let option1 = document.querySelector(".option1");
let option2 = document.querySelector(".option2");
let option3 = document.querySelector(".option3");
let option4 = document.querySelector(".option4");
let rightAnswers = [];
let typicalNumbers = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];




startBtn.addEventListener("click", () => {
    firstStage.style.display = "none";
    secondStage.style.display = "block";
})

exitBtn.addEventListener("click", () => {
    firstStage.style.display = "block";
    secondStage.style.display = "none";
})

continueButton.addEventListener("click", () => {
    secondStage.style.display = "none";
    thirdStage.style.display = "block"
    i = 0;
    createQuestion(i);
})



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

    const effect = new KeyframeEffect(timerGraphic, [
        { width: "0%" },
        { width: "100%" }
    ], { duration: 15000, direction: "alternate", easing: "linear" });

    let animation = new Animation(effect, document.timeline);
    animation.play();

    question.innerHTML = `${i + 1}.` + " " + AllQuestions[i].Question;
    option1.innerHTML = AllQuestions[i].option1;
    option2.innerHTML = AllQuestions[i].option2;
    option3.innerHTML = AllQuestions[i].option3;
    option4.innerHTML = AllQuestions[i].option4;
    questionNumberOf.innerHTML = i + 1;

    timer = setInterval(() => {
        if (Number(numberLogical.innerHTML) >= 1) {
        
            let y = numberLogical.innerHTML;
            let x = y - 1;
            if (x <= 9) {
                numberLogical.innerHTML = typicalNumbers[x];
            }
            else {
                numberLogical.innerHTML = x;
            }

        }

        if (Number(numberLogical.innerHTML) == 0) {
            nextQue.classList.add("block");
            options.forEach((value) => {
                if (value.innerHTML == AllQuestions[i].corrctoption) {
                    value.style.backgroundColor = "#addec5";
                    value.nextElementSibling.setAttribute("src", "./icon/check_mark (4).png");
                    value.nextElementSibling.setAttribute("class", "block");
                    removeEvent();
                }
            })
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
            showNextQue();
            e.target.nextElementSibling.setAttribute("src", "./icon/check_mark (4).png");
            e.target.nextElementSibling.setAttribute("class", "block");
            rightAnswers.push(i);
        }
        else {
            e.target.style.backgroundColor = "#e6a1a1";
            removeEvent()
            stopGraphicAnimation();
            clearInterval(timer);
            showNextQue();
            e.target.nextElementSibling.setAttribute("src", "./icon/close.png");
            e.target.nextElementSibling.setAttribute("class", "block");
            options.forEach((value) => {
                if (value.innerHTML == AllQuestions[i].corrctoption) {
                    value.style.backgroundColor = "#addec5";
                    value.nextElementSibling.setAttribute("src", "./icon/check_mark (4).png");
                    value.nextElementSibling.setAttribute("class", "block");
                }
            })
        }
    }


    // functions
    function removeEvent() {
        options.forEach((value) => {
            value.removeEventListener("click", optionhandler)
        })
    }

    function stopGraphicAnimation() {
        animation.pause();
    }

    function showNextQue() {
        nextQue.classList.add("block");
    }
}

nextQue.addEventListener("click", nextQuestion);
function nextQuestion(e) {
    if (questionNumberOf.innerHTML == finalQuestion.innerHTML) {
        thirdStage.style.display = "none";
        forthStage.style.display = "flex";
        finalScoreFrom.innerHTML = rightAnswers.length;
        finalScore();
        return;
    }
    i++;
    removeDeafault();
    createQuestion(i);
}

function removeDeafault() {
    options.forEach((value) => {
        value.style.backgroundColor = "#dff1e8";
        value.nextElementSibling.setAttribute("class", "");
        value.nextElementSibling.setAttribute("src", "");
    })
    numberLogical.innerHTML = "15";
    nextQue.classList.remove("block");
    clearTimeout(timer);

}


function finalScore() {
    let calculateFinalScore = (rightAnswers.length / finalQuestion.innerHTML) * 100;
    if (calculateFinalScore >= 50) {
        textScore.innerHTML = "nice";
        scoreSticker.setAttribute("src", "./icon/happy.png");
    }
    if (calculateFinalScore < 50) {
        textScore.innerHTML = "good";
        scoreSticker.setAttribute("src", "./icon/unhappy.png");
    }
    if (calculateFinalScore <= 20) {
        textScore.innerHTML = "bad";
        scoreSticker.setAttribute("src", "./icon/neutral.png");
    }
}

replyQuiz.addEventListener("click", () => {
    forthStage.style.display = "none";
    thirdStage.style.display = "block";
    i = 0;
    rightAnswers = [];
    textScore.innerHTML = "";
    scoreSticker.setAttribute("src", "");
    removeDeafault();
    createQuestion(i);
})

quitQuiz.addEventListener("click", () => {
    forthStage.style.display = "none";
    firstStage.style.display = "block";
    rightAnswers = [];
    removeDeafault();
})

