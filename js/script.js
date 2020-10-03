window.addEventListener("load", main);

function main() {
    const inputMinutes = document.querySelector("#minuteEntry");
    const inputSecond = document.querySelector("#secondEntry");
    const btnStart = document.querySelector("#startButton")
    const displayMinutes = document.querySelector(".minutesTimer");
    const displaySeconds = document.querySelector(".secondsTimer");
    const timeMax = 60;

    let isTimerOff = true;

    function addTimeOptions(element, startIndex) {
        for(let i = startIndex; i <= timeMax; i++) {
            element.innerHTML += `<option value="${i}">${i}</option>`
        }
    }
    
    addTimeOptions(inputMinutes, 0);
    addTimeOptions(inputSecond, 1);
    
    btnStart.addEventListener("click", startTimer);

    function startTimer() {
        if(isTimerOff) {
            let currentMinute = inputMinutes.value;
            let currentSecond = inputSecond.value;
            let interval;
            
            isTimerOff = false; 

            interval = setInterval(countTime, 1000);

            function updateDisplayTime() {
                function checkCount(currentTime, ref) {
                    if(currentTime >= 10) {
                        ref.innerText = currentTime;
                        console.log();   
                    } else {
                        ref.innerText = `0${currentTime}`;   
                    }
                }

                checkCount(currentMinute, displayMinutes);
                checkCount(currentSecond, displaySeconds);
            }

            updateDisplayTime();

            function countTime() {
                currentSecond--;

                if(currentSecond < 1) {
                    if(currentMinute > 0) {
                        currentMinute--;
                        currentSecond = 59;
                    } else {
                        const sound = document.querySelector("#sound");

                        sound.play();
                        clearInterval(interval);

                        setTimeout(() => {
                            alert("Time is Over!");
                        }, 1000);

                        isTimerOff = true;
                    }
                }

                updateDisplayTime();
            }
        }
    }
}