function runCarGame(stake, carPred, drawCanvas) {

    var canvasX;
    var canvasY;
    var carX;
    var carY;
    var carOnePos;
    var carTwoPos;
    var carThreePos;
    var car, carOne, carTwo, carThree;
    var carOneColor, carTwoColor, carThreeColor;
    var carStartPoint;
    var carOneStartPoint, carTwoStartPoint, carThreeStartPoint;
    var carOneSpeed, carTwoSpeed, carThreeSpeed;
    var carOneSpeedTwo, carTwoSpeedTwo, carThreeSpeedTwo;
    var carOneSpeedThree, carTwoSpeedThree, carThreeSpeedThree;
    var carOneSpeedFour, carTwoSpeedFour, carThreeSpeedFour;
    var carOneSpeedFive, carTwoSpeedFive, carThreeSpeedFive;
    var carOneSpeedSix, carTwoSpeedSix, carThreeSpeedSix;
    var carOneMinSpeed, carOneMaxSpeed;
    var carOneMinSpeedTwo, carOneMinSpeedThree;
    var carTwoMinSpeedTwo, carTwoMinSpeedThree;
    var carThreeMinSpeedTwo, carThreeMinSpeedThree;
    var carTwoMinSpeed, carTwoMaxSpeed;
    var carThreeMinSpeed, carThreeMaxSpeed;
    var carOneLap, carTwoLap, carThreeLap;
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;

    drawCanvas.outerHTML = '<div style="text-align:center;"><canvas id="myCanvas" style="background: blanchedalmond; background-image: url(models/site-templates/assets/paper.gif);"></canvas></div>';
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    if (width > height) {
        //if width > height pc
        canvasX = canvas.width = innerWidth * 4 / 10;
        canvasY = canvas.height = innerHeight * 9 / 10;
        carX = canvasX * 0.07;
        carY = canvasY * 0.09;

    } else {
        //else width < height mobile
        canvasX = canvas.width = innerWidth * 9.5 / 10;
        canvasY = canvas.height = 9 / 10 * innerHeight;
        carX = canvasX * 0.09;
        carY = canvasY * 0.08;

    }

    carStartPoint = carOneStartPoint = carTwoStartPoint = carThreeStartPoint = canvasY - carY; //car strt point
    carOnePos = 0.205 * canvasX;
    carTwoPos = 0.48 * canvasX;
    carThreePos = 0.755 * canvasX;
    carOne = "ferrari";
    carTwo = "mustang";
    carThree = "lamborghini";
    carOneColor = '#8b0000';
    carTwoColor = '#00008B';
    carThreeColor = 'yellow';

    carOneMinSpeed = 2;
    carOneMinSpeedTwo = 5;
    carOneMinSpeedThree = 8;
    carOneMaxSpeed = 11;

    carTwoMinSpeed = 2;
    carTwoMinSpeedTwo = 5;
    carTwoMinSpeedThree = 8;    
    carTwoMaxSpeed = 11;

    carThreeMinSpeed = 11;
    carThreeMinSpeedTwo = 11;
    carThreeMinSpeedThree = 11;    
    carThreeMaxSpeed = 11;

    carOneSpeed = getRdmSpeed(carOneMinSpeed, carOneMaxSpeed);
    carOneSpeedTwo = getRdmSpeed(carOneMinSpeed, carOneMaxSpeed);
    carOneSpeedThree = getRdmSpeed(carOneMinSpeedTwo, carOneMaxSpeed);
    carOneSpeedFour = getRdmSpeed(carOneMinSpeedTwo, carOneMaxSpeed);
    carOneSpeedFive = getRdmSpeed(carOneMinSpeedThree, carOneMaxSpeed);
    carOneSpeedSix = getRdmSpeed(carOneMinSpeedThree, carOneMaxSpeed);

    carTwoSpeed = getRdmSpeed(carTwoMinSpeed, carTwoMaxSpeed);
    carTwoSpeedTwo = getRdmSpeed(carTwoMinSpeed, carTwoMaxSpeed);
    carTwoSpeedThree = getRdmSpeed(carTwoMinSpeedTwo, carTwoMaxSpeed);
    carTwoSpeedFour = getRdmSpeed(carTwoMinSpeedTwo, carTwoMaxSpeed);
    carTwoSpeedFive = getRdmSpeed(carTwoMinSpeedThree, carTwoMaxSpeed);
    carTwoSpeedSix = getRdmSpeed(carTwoMinSpeedThree, carTwoMaxSpeed);

    carThreeSpeed = getRdmSpeed(carThreeMinSpeed, carThreeMaxSpeed);
    carThreeSpeedTwo = getRdmSpeed(carThreeMinSpeed, carThreeMaxSpeed);
    carThreeSpeedThree = getRdmSpeed(carThreeMinSpeedTwo, carThreeMaxSpeed);
    carThreeSpeedFour = getRdmSpeed(carThreeMinSpeedTwo, carThreeMaxSpeed);
    carThreeSpeedFive = getRdmSpeed(carThreeMinSpeedThree, carThreeMaxSpeed);
    carThreeSpeedSix = getRdmSpeed(carThreeMinSpeedThree, carThreeMaxSpeed);

    carOneLap = carTwoLap = carThreeLap = 1;
    //we record start time so we can subtract to get car finish time

    //function draw vehicle and pos
    function draw(car, carPos, carStartPoint, carX, carY) {
        var img = new Image();
        img.src = "models/site-templates/assets/" + car + ".png";
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, carPos, carStartPoint, carX, carY);
    }


    //this draws the return vehicle
    function drawReturn(car, carPos, carStartPoint, carX, carY) {
        var img = new Image();
        img.src = "models/site-templates/assets/" + car + "Return.png";
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, carPos, carStartPoint, carX, carY);
    }


    function drawWin(carColor, car) {
        ctx.rect(canvasX / 4, canvasY / 4, canvasX / 2, canvasY / 2);
        ctx.fillStyle = carColor;
        ctx.fill();
        ctx.stroke();
        var winOdd = 3;
        var winAmount = stake * winOdd;

        clearInterval(run);

        var showResult = document.getElementById("showResult");

        if (car === carPred) {
            showResult.outerHTML = '<div id = "result">Selection: ' + carPred + '<br>Result: ' + car + '<br>You Won<br>Stake: ' + stake + '<br>Win Amount: ' + winAmount + '<br><p onclick="reloadPage()">Play Again</p></div>';

            var reason = 'win';
            sendData(winAmount, reason);
        } else {
            showResult.outerHTML = '<div id = "result">Selection: ' + carPred + '<br>Result: ' + car + '<br>You Lose<br>Stake: ' + stake + '<br><p onclick="reloadPage()">Play Again</p></div>';
        }
    }


    //get random number for speed
    function getRdmSpeed(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    //function move vehicle and pos
    function move() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("LAP hah tusiidone", 10, 20);
        ctx.font = "italic 14px Arial";
        ctx.fillText(carOne + " " + carOneLap, 10, 40);
        ctx.fillText(carTwo + " " + carTwoLap, 10, 60);
        ctx.fillText(carThree + " " + carThreeLap, 10, 80);

        //car one lap runs
        if (carOneLap === 1) {
            if (carOneStartPoint > carY - carX) {
                carOneStartPoint = carOneStartPoint - carOneSpeed; //subtract cary pos automatically moves car
            } else {
                carOneLap++;
                carOneStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carOne, carOnePos, carOneStartPoint, carX, carY);
        } else if (carOneLap === 2) {
            if (canvasY > carOneStartPoint + carY) {
                carOneStartPoint = carOneStartPoint + carOneSpeedTwo; //subtract cary pos automatically moves car
            } else {
                carOneLap++;
            }

            drawReturn(carOne, carOnePos, carOneStartPoint, carX, carY);
        } else if (carOneLap === 3) {
            if (carOneStartPoint > carY - carX) {
                carOneStartPoint = carOneStartPoint - carOneSpeedThree; //subtract cary pos automatically moves car
            } else {
                carOneLap++;
                carOneStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carOne, carOnePos, carOneStartPoint, carX, carY);
        } else if (carOneLap === 4) {
            if (canvasY > carOneStartPoint + carY) {
                carOneStartPoint = carOneStartPoint + carOneSpeedFour; //subtract cary pos automatically moves car
            } else {
                carOneLap++;
            }

            drawReturn(carOne, carOnePos, carOneStartPoint, carX, carY);
        } else if (carOneLap === 5) {
            if (carOneStartPoint > carY - carX) {
                carOneStartPoint = carOneStartPoint - carOneSpeedFive; //subtract cary pos automatically moves car
            } else {
                carOneLap++;
                carOneStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carOne, carOnePos, carOneStartPoint, carX, carY);
        } else if (carOneLap === 6) {
            if (canvasY > carOneStartPoint + carY) {
                carOneStartPoint = carOneStartPoint + carOneSpeedSix; //subtract cary pos automatically moves car
            } else {
                //if lap is 6 finish race and record finish time
                drawWin(carOneColor, carOne);
            }

            drawReturn(carOne, carOnePos, carOneStartPoint, carX, carY);
        }




        //car two lap runs
        if (carTwoLap === 1) {
            if (carTwoStartPoint > carY - carX) {
                carTwoStartPoint = carTwoStartPoint - carTwoSpeed; //subtract cary pos automatically moves car
            } else {
                carTwoLap++;
                carTwoStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carTwo, carTwoPos, carTwoStartPoint, carX, carY);
        } else if (carTwoLap === 2) {
            if (canvasY > carTwoStartPoint + carY) {
                carTwoStartPoint = carTwoStartPoint + carTwoSpeedTwo; //subtract cary pos automatically moves car
            } else {
                carTwoLap++;
            }

            drawReturn(carTwo, carTwoPos, carTwoStartPoint, carX, carY);
        } else if (carTwoLap === 3) {
            if (carTwoStartPoint > carY - carX) {
                carTwoStartPoint = carTwoStartPoint - carTwoSpeedThree; //subtract cary pos automatically moves car
            } else {
                carTwoLap++;
                carTwoStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carTwo, carTwoPos, carTwoStartPoint, carX, carY);
        } else if (carTwoLap === 4) {
            if (canvasY > carTwoStartPoint + carY) {
                carTwoStartPoint = carTwoStartPoint + carTwoSpeedFour; //subtract cary pos automatically moves car
            } else {
                carTwoLap++;
            }

            drawReturn(carTwo, carTwoPos, carTwoStartPoint, carX, carY);
        } else if (carTwoLap === 5) {
            if (carTwoStartPoint > carY - carX) {
                carTwoStartPoint = carTwoStartPoint - carTwoSpeedFive; //subtract cary pos automatically moves car
            } else {
                carTwoLap++;
                carTwoStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carTwo, carTwoPos, carTwoStartPoint, carX, carY);
        } else if (carTwoLap === 6) {
            if (canvasY > carTwoStartPoint + carY) {
                carTwoStartPoint = carTwoStartPoint + carTwoSpeedSix; //subtract cary pos automatically moves car
            } else {
                //if lap is 6 finish race and record finish time
                drawWin(carTwoColor, carTwo);
            }

            drawReturn(carTwo, carTwoPos, carTwoStartPoint, carX, carY);
        }





        //car three lap runs
        if (carThreeLap === 1) {
            if (carThreeStartPoint > carY - carX) {
                carThreeStartPoint = carThreeStartPoint - carThreeSpeed; //subtract cary pos automatically moves car
            } else {
                carThreeLap++;
                carThreeStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carThree, carThreePos, carThreeStartPoint, carX, carY);
        } else if (carThreeLap === 2) {
            if (canvasY > carThreeStartPoint + carY) {
                carThreeStartPoint = carThreeStartPoint + carThreeSpeedTwo; //subtract cary pos automatically moves car
            } else {
                carThreeLap++;
            }

            drawReturn(carThree, carThreePos, carThreeStartPoint, carX, carY);
        } else if (carThreeLap === 3) {
            if (carThreeStartPoint > carY - carX) {
                carThreeStartPoint = carThreeStartPoint - carThreeSpeedThree; //subtract cary pos automatically moves car
            } else {
                carThreeLap++;
                carThreeStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carThree, carThreePos, carThreeStartPoint, carX, carY);
        } else if (carThreeLap === 4) {
            if (canvasY > carThreeStartPoint + carY) {
                carThreeStartPoint = carThreeStartPoint + carThreeSpeedFour; //subtract cary pos automatically moves car
            } else {
                carThreeLap++;
            }

            drawReturn(carThree, carThreePos, carThreeStartPoint, carX, carY);
        } else if (carThreeLap === 5) {
            if (carThreeStartPoint > carY - carX) {
                carThreeStartPoint = carThreeStartPoint - carThreeSpeedFive; //subtract cary pos automatically moves car
            } else {
                carThreeLap++;
                carThreeStartPoint = carY - carX; //subtract cary pos automatically moves car
            }

            draw(carThree, carThreePos, carThreeStartPoint, carX, carY);
        } else if (carThreeLap === 6) {
            if (canvasY > carThreeStartPoint + carY) {
                carThreeStartPoint = carThreeStartPoint + carThreeSpeedSix; //subtract cary pos automatically moves car
            } else {
                //if lap is 6 finish race and record finish time
                drawWin(carThreeColor, carThree);
            }

            drawReturn(carThree, carThreePos, carThreeStartPoint, carX, carY);
        }


    }

    run = setInterval(move, 30);
}
