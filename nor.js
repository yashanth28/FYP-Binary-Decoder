const canvas = document.getElementById("myCanvas");
let ctx = null;

if (canvas) {
    ctx = canvas.getContext("2d");
} else {
    console.error("Canvas not found! Make sure <canvas id='myCanvas'> exists in HTML.");
}  

function storeReviewSnapshot() {
    const questionText = document.getElementById("text-question").innerText;
    const options = [
        document.getElementById("option1").innerText,
        document.getElementById("option2").innerText,
        document.getElementById("option3").innerText,
        document.getElementById("option4").innerText
    ];

    const canvas = document.getElementById("myCanvas");
    const imageData = canvas.toDataURL("image/png");

    if (!window.reviewData) window.reviewData = [];
    window.reviewData.push({
        questionText,
        options,
        correctAnswer,
        selectedAnswer: null,
        imageData
    });
}

function basic24Decoder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#66f2ff";
    ctx.fillStyle = "#66f2ff";
    ctx.lineWidth = 2;

    ctx.strokeRect(250, 115, 150, 160);

    let X = Math.random() < 0.5 ? 0 : 1;
    let Y = Math.random() < 0.5 ? 0 : 1;

    ctx.fillText("X", 150, 170);
    ctx.fillText("Y", 150, 210);
    ctx.fillText("A", 265, 170);
    ctx.fillText("B", 265, 210);

    ctx.beginPath();
    ctx.moveTo(160, 165); ctx.lineTo(250, 165);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(160, 205); ctx.lineTo(250, 205);
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
        let yPos = 150 + i * 30;
        ctx.beginPath();
        ctx.moveTo(400, yPos);
        ctx.lineTo(450, yPos);
        ctx.stroke();
        ctx.fillText(`Y${i}`, 380, yPos + 5);
    }

    let outputIndex = (X << 1) | Y;
    correctAnswer = `Y${outputIndex}`;

    document.getElementById("text-question").innerText = `If X=${X}, Y=${Y}, which output will be activated?`;

    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let randWrong = Math.floor(Math.random() * 4);
        if (randWrong !== outputIndex) {
            incorrectAnswers.add(`Y${randWrong}`);
        }
    }

    incorrectAnswers = Array.from(incorrectAnswers);
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    document.getElementById("option1").innerText = allAnswers[0];
    document.getElementById("option2").innerText = allAnswers[1];
    document.getElementById("option3").innerText = allAnswers[2];
    document.getElementById("option4").innerText = allAnswers[3];

    document.querySelectorAll(".option-text").forEach(btn => {
        btn.style.backgroundColor = "";
        btn.onclick = function () {
            checkAnswer(this);
        };
    });

    storeReviewSnapshot();

}

function basic38Decoder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#66f2ff";
    ctx.fillStyle = "#66f2ff";
    ctx.lineWidth = 2;

    ctx.strokeRect(250, 105, 150, 200);

    let X = Math.random() < 0.5 ? 0 : 1;
    let Y = Math.random() < 0.5 ? 0 : 1;
    let Z = Math.random() < 0.5 ? 0 : 1;

    ctx.fillText("X", 150, 170);
    ctx.fillText("Y", 150, 210);
    ctx.fillText("Z", 150, 250);
    ctx.fillText("A", 265, 170);
    ctx.fillText("B", 265, 210);
    ctx.fillText("C", 265, 250);

    ctx.beginPath();
    ctx.moveTo(160, 165); ctx.lineTo(250, 165);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(160, 205); ctx.lineTo(250, 205);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(160, 245); ctx.lineTo(250, 245);
    ctx.stroke();

    for (let i = 0; i < 8; i++) {
        let yPos = 120 + i * 25;
        ctx.beginPath();
        ctx.moveTo(400, yPos);
        ctx.lineTo(450, yPos);
        ctx.stroke();
        ctx.fillText(`Y${i}`, 380, yPos );
    }

    let outputIndex = (X << 2) | (Y << 1) | Z;
    correctAnswer = `Y${outputIndex}`;

    document.getElementById("text-question").innerText = `If X=${X}, Y=${Y}, Z=${Z}, which output will be activated?`;

    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let randWrong = Math.floor(Math.random() * 8);
        if (randWrong !== outputIndex) {
            incorrectAnswers.add(`Y${randWrong}`);
        }
    }

    incorrectAnswers = Array.from(incorrectAnswers);
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    document.getElementById("option1").innerText = allAnswers[0];
    document.getElementById("option2").innerText = allAnswers[1];
    document.getElementById("option3").innerText = allAnswers[2];
    document.getElementById("option4").innerText = allAnswers[3];

    document.querySelectorAll(".option-text").forEach(btn => {
        btn.style.backgroundColor = "";
        btn.onclick = function () {
            checkAnswer(this);
        };
    });

    storeReviewSnapshot();

}

function ordecoder24() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#66f2ff";
    ctx.fillStyle = "#66f2ff";
    ctx.lineWidth = 2;

    ctx.strokeRect(100, 50, 140, 160);
    ctx.fillText("2-to-4 Decoder", 170, 240);

    const inputA = Math.random() < 0.5 ? "A" : "A'";
    const inputB = Math.random() < 0.5 ? "B" : "B'";

    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(100, 90);
    ctx.stroke();
    ctx.fillText("X", 40, 95);
    ctx.fillText("A", 115, 95);

    ctx.beginPath();
    ctx.moveTo(50, 130);
    ctx.lineTo(100, 130);
    ctx.stroke();
    ctx.fillText("Y", 40, 135);
    ctx.fillText("B", 115, 135);

    const booleanExpressions = [
        "A'B'",
        "A'B",
        "AB'",
        "AB"
    ];

    let selectedOutputs = new Set();
    while (selectedOutputs.size < 2) {
        selectedOutputs.add(Math.floor(Math.random() * 4));
    }
    selectedOutputs = Array.from(selectedOutputs).sort((a, b) => a - b);
    correctAnswer = selectedOutputs.map(y => booleanExpressions[y]).join(" + ");

    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let tempSet = new Set();
        while (tempSet.size < 2) {
            tempSet.add(Math.floor(Math.random() * 4));
        }
        let incorrectExpr = Array.from(tempSet).map(y => booleanExpressions[y]).join(" + ");
        if (incorrectExpr !== correctAnswer) {
            incorrectAnswers.add(incorrectExpr);
        }
    }
    incorrectAnswers = Array.from(incorrectAnswers);
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    document.getElementById("option1").innerText = allAnswers[0];
    document.getElementById("option2").innerText = allAnswers[1];
    document.getElementById("option3").innerText = allAnswers[2];
    document.getElementById("option4").innerText = allAnswers[3];

    document.querySelectorAll(".option-text").forEach(btn => {
        btn.style.backgroundColor = "";
        btn.onclick = function () {
            checkAnswer(this);
        };
    });

    const outputPositions = [70, 110, 150, 190];
    for (let i = 0; i < 4; i++) {
        ctx.fillText(`Y${i}`, 220, outputPositions[i] + 5);

        if (selectedOutputs.includes(i)) {
            ctx.beginPath();
            ctx.moveTo(240, outputPositions[i]);
            ctx.lineTo(300, outputPositions[i]);
            ctx.stroke();
        }
    }

    const orGateLines = [90, 150];
    ctx.beginPath();
    ctx.moveTo(320, orGateLines[0]);
    ctx.lineTo(338, orGateLines[0]);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(320, orGateLines[1]);
    ctx.lineTo(338, orGateLines[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(330, 80);
    ctx.quadraticCurveTo(360, 120, 330, 160);
    ctx.lineTo(360, 160);
    ctx.quadraticCurveTo(390, 160, 420, 120);
    ctx.quadraticCurveTo(390, 80, 360, 80);
    ctx.closePath();
    ctx.stroke();

    for (let i = 0; i < 2; i++) {
        let yPos = outputPositions[selectedOutputs[i]];
        let orYPos = orGateLines[i];

        ctx.beginPath();
        ctx.moveTo(300, yPos);
        ctx.lineTo(320, orYPos);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(420, 120);
    ctx.lineTo(490, 120);
    ctx.stroke();

    ctx.fillText("F", 510, 125);

    document.getElementById("text-question").innerText = `What is the Boolean expression for f ?`;

    storeReviewSnapshot();

}

function ordecoder38() {
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#66f2ff";
    ctx.fillStyle = "#66f2ff";
    ctx.lineWidth = 2;

    // Draw Decoder Box
    ctx.strokeRect(100, 30, 140, 220);
    ctx.fillText("3-to-8 Decoder", 170, 275);

    // Generate Random Inputs (X, Y, Z)
    const inputA = Math.random() < 0.5 ? "X" : "X'";
    const inputB = Math.random() < 0.5 ? "Y" : "Y'";
    const inputC = Math.random() < 0.5 ? "Z" : "Z'";

    // Draw Input Lines
    ctx.beginPath();
    ctx.moveTo(50, 90);
    ctx.lineTo(100, 90);
    ctx.stroke();
    ctx.fillText("X", 40, 95);
    ctx.fillText("A", 115, 95);

    ctx.beginPath();
    ctx.moveTo(50, 130);
    ctx.lineTo(100, 130);
    ctx.stroke();
    ctx.fillText("Y", 40, 135);
    ctx.fillText("B", 115, 135);

    ctx.beginPath();
    ctx.moveTo(50, 170);
    ctx.lineTo(100, 170);
    ctx.stroke();
    ctx.fillText("Z", 40, 175);
    ctx.fillText("C", 115, 175);

    // Boolean Expressions for Y0 - Y7
    const booleanExpressions = [
        "X'Y'Z'", "X'Y'Z", "X'YZ'", "X'YZ",
        "XY'Z'", "XY'Z", "XYZ'", "XYZ"
    ];

    // Select 3 Random Outputs
    let selectedOutputs = new Set();
    while (selectedOutputs.size < 3) {
        selectedOutputs.add(Math.floor(Math.random() * 8));
    }
    selectedOutputs = Array.from(selectedOutputs).sort((a, b) => a - b); // Ensure order

    // Store Correct Answer
    correctAnswer = selectedOutputs.map(y => booleanExpressions[y]).join(" + ");

    // Generate 3 Incorrect Answers
    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let tempSet = new Set();
        while (tempSet.size < 3) {
            tempSet.add(Math.floor(Math.random() * 8));
        }
        let incorrectExpr = Array.from(tempSet).map(y => booleanExpressions[y]).join(" + ");
        if (incorrectExpr !== correctAnswer) {
            incorrectAnswers.add(incorrectExpr);
        }
    }
    incorrectAnswers = Array.from(incorrectAnswers);

    // Shuffle Answers
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    // Assign Answers to Buttons
    document.getElementById("option1").innerText = allAnswers[0];
    document.getElementById("option2").innerText = allAnswers[1];
    document.getElementById("option3").innerText = allAnswers[2];
    document.getElementById("option4").innerText = allAnswers[3];

    // Reset Button Colors
    document.querySelectorAll(".option-text").forEach(btn => {
        btn.style.backgroundColor = "";
        btn.onclick = function () {
            checkAnswer(this);
        };
        
    });

    // Draw small output Lines (Top, Middle, Bottom) for OR Gate
    const orGateLines = [90, 120, 150]; // Fixed Y positions for OR gate inputs
    ctx.beginPath();
    ctx.moveTo(320, orGateLines[0]);
    ctx.lineTo(338, orGateLines[0]);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(320, orGateLines[1]);
    ctx.lineTo(345, orGateLines[1]);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(320, orGateLines[2]);
    ctx.lineTo(338, orGateLines[2]);
    ctx.stroke();

    // Draw Decoder Outputs (Y0 - Y7)
    for (let i = 0; i < 8; i++) {
        let yPos = 50 + i * 25;
        ctx.fillText(`Y${i}`, 220, yPos + 5);

        if (selectedOutputs.includes(i)) {
            ctx.beginPath();
            ctx.moveTo(240, yPos);
            ctx.lineTo(300, yPos);
            ctx.stroke();
        }
    }

    // Draw OR gate body (custom symmetric shape)
    ctx.beginPath();
    ctx.moveTo(330, 80);                                   // Top left
    ctx.quadraticCurveTo(360, 120, 330, 160);              // Left side curve
    ctx.lineTo(360, 160);                                  // Flat bottom segment to match top
    ctx.quadraticCurveTo(390, 160, 420, 120);              // Bottom outer curve
    ctx.quadraticCurveTo(390, 80, 360, 80);                // Top outer curve
    ctx.closePath();
    ctx.stroke();


    // Map each selected output to the respective OR gate input line
    for (let i = 0; i < 3; i++) {
        let yPos = 50 + selectedOutputs[i] * 25; // Output position
        let orYPos = orGateLines[i]; // Corresponding OR gate input position

        ctx.beginPath();
        ctx.moveTo(300, yPos);
        ctx.lineTo(320, orYPos);
        ctx.stroke();
    }

    // OR Gate Output Line
    ctx.beginPath();
    ctx.moveTo(420, 120);
    ctx.lineTo(500, 120);
    ctx.stroke();

    // Display Correct F Expression
    ctx.fillText("F", 530, 125);

    // Set a larger font size
    ctx.font = "25px Arial";
    
    document.getElementById("text-question").innerText = `What is the Boolean expression for f ?`;

    storeReviewSnapshot();

}

function nanddecoder24() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#66f2ff";
    ctx.fillStyle = "#66f2ff";
    ctx.lineWidth = 2;

    ctx.strokeRect(100, 60, 140, 140);
    ctx.fillText("2-to-4 Decoder", 170, 225);

    const inputA = Math.random() < 0.5 ? "X" : "X'";
    const inputB = Math.random() < 0.5 ? "Y" : "Y'";

    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(100, 100);
    ctx.stroke();
    ctx.fillText("X", 40, 105);
    ctx.fillText("A", 115, 105);

    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(100, 140);
    ctx.stroke();
    ctx.fillText("Y", 40, 145);
    ctx.fillText("B", 115, 145);

    const booleanExpressions = ["X'Y'", "X'Y", "XY'", "XY"];

    let selectedOutputs = new Set();
    while (selectedOutputs.size < 2) {
        selectedOutputs.add(Math.floor(Math.random() * 4));
    }
    selectedOutputs = Array.from(selectedOutputs).sort((a, b) => a - b);

    const selectedExprs = selectedOutputs.map(y => booleanExpressions[y]);
    correctAnswer = selectedExprs.join(" + ");

    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let tempSet = new Set();
        while (tempSet.size < 2) {
            tempSet.add(Math.floor(Math.random() * 4));
        }
        let tempArray = Array.from(tempSet).sort((a, b) => a - b);
        let expr = tempArray.map(y => booleanExpressions[y]).join(" + ");
        if (expr !== correctAnswer) {
            incorrectAnswers.add(expr);
        }
    }
    incorrectAnswers = Array.from(incorrectAnswers);
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    document.getElementById("option1").innerText = allAnswers[0];
    document.getElementById("option2").innerText = allAnswers[1];
    document.getElementById("option3").innerText = allAnswers[2];
    document.getElementById("option4").innerText = allAnswers[3];

    document.querySelectorAll(".option-text").forEach(btn => {
        btn.style.backgroundColor = "";
        btn.onclick = function () {
            checkAnswer(this);
        };
    });

    const nandOffsetX = 200;
    const nandGateInputYPositions = [110, 150];

    for (let i = 0; i < 4; i++) {
        let yPos = 80 + i * 30;
        ctx.fillText(`Y${i}`, 220, yPos + 5);
        ctx.beginPath();
        ctx.arc(245, yPos, 5, 0, 2 * Math.PI);
        ctx.stroke();

        if (selectedOutputs.includes(i)) {
            const index = selectedOutputs.indexOf(i);
            const gateY = nandGateInputYPositions[index];
            ctx.beginPath();
            ctx.moveTo(249, yPos);
            ctx.lineTo(120 + nandOffsetX, gateY);
            ctx.stroke();
        }
    }

    ctx.beginPath();
    ctx.moveTo(120 + nandOffsetX, 90);
    ctx.lineTo(170 + nandOffsetX, 90);
    ctx.quadraticCurveTo(220 + nandOffsetX, 130, 170 + nandOffsetX, 170);
    ctx.lineTo(120 + nandOffsetX, 170);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(200 + nandOffsetX, 130, 5, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(205 + nandOffsetX, 130);
    ctx.lineTo(250 + nandOffsetX, 130);
    ctx.stroke();

    ctx.fillText("F", 290 + nandOffsetX, 135);

    document.getElementById("text-question").innerText = `What is the Boolean expression for F using a NAND gate?`;
    storeReviewSnapshot();

}

function nanddecoder38() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#66f2ff";
    ctx.fillStyle = "#66f2ff";
    ctx.lineWidth = 2;

    ctx.strokeRect(100, 30, 140, 220);
    ctx.fillText("3-to-8 Decoder", 170, 270);

    const inputA = Math.random() < 0.5 ? "X" : "X'";
    const inputB = Math.random() < 0.5 ? "Y" : "Y'";
    const inputC = Math.random() < 0.5 ? "Z" : "Z'";

    ctx.beginPath();
    ctx.moveTo(50, 90); ctx.lineTo(100, 90); ctx.stroke();
    ctx.fillText("X", 40, 95); ctx.fillText("A", 115, 95);

    ctx.beginPath();
    ctx.moveTo(50, 130); ctx.lineTo(100, 130); ctx.stroke();
    ctx.fillText("Y", 40, 135); ctx.fillText("B", 115, 135);

    ctx.beginPath();
    ctx.moveTo(50, 170); ctx.lineTo(100, 170); ctx.stroke();
    ctx.fillText("Z", 40, 175); ctx.fillText("C", 115, 175);

    const booleanExpressions = [
        "X'Y'Z'", "X'Y'Z", "X'YZ'", "X'YZ",
        "XY'Z'", "XY'Z", "XYZ'", "XYZ"
    ];

    let selectedOutputs = new Set();
    while (selectedOutputs.size < 3) {
        selectedOutputs.add(Math.floor(Math.random() * 8));
    }
    selectedOutputs = Array.from(selectedOutputs).sort((a, b) => a - b);

    const selectedExprs = selectedOutputs.map(y => booleanExpressions[y]);
    correctAnswer = selectedExprs.join(" + ");

    let incorrectAnswers = new Set();
    while (incorrectAnswers.size < 3) {
        let tempSet = new Set();
        while (tempSet.size < 3) {
            tempSet.add(Math.floor(Math.random() * 8));
        }
        let tempArray = Array.from(tempSet).sort((a, b) => a - b);
        let expr = tempArray.map(y => booleanExpressions[y]).join(" + ");
        if (expr !== correctAnswer) {
            incorrectAnswers.add(expr);
        }
    }
    incorrectAnswers = Array.from(incorrectAnswers);
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    document.getElementById("option1").innerText = allAnswers[0];
    document.getElementById("option2").innerText = allAnswers[1];
    document.getElementById("option3").innerText = allAnswers[2];
    document.getElementById("option4").innerText = allAnswers[3];

    document.querySelectorAll(".option-text").forEach(btn => {
        btn.style.backgroundColor = "";
        btn.onclick = function () {
            checkAnswer(this);
        };
    });

    const nandOffsetX = 200;
    const nandGateInputYPositions = [90, 120, 150];

    for (let i = 0; i < 8; i++) {
        let yPos = 50 + i * 25;
        ctx.fillText(`Y${i}`, 220, yPos + 5);

        ctx.beginPath();
        ctx.arc(245, yPos, 5, 0, 2 * Math.PI);
        ctx.stroke();

        if (selectedOutputs.includes(i)) {
            const index = selectedOutputs.indexOf(i);
            const gateY = nandGateInputYPositions[index];
            ctx.beginPath();
            ctx.moveTo(249, yPos);
            ctx.lineTo(120 + nandOffsetX, gateY);
            ctx.stroke();
        }
    }

    ctx.beginPath();
    ctx.moveTo(120 + nandOffsetX, 80);
    ctx.lineTo(170 + nandOffsetX, 80);
    ctx.quadraticCurveTo(220 + nandOffsetX, 120, 170 + nandOffsetX, 160);
    ctx.lineTo(120 + nandOffsetX, 160);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(200 + nandOffsetX, 120, 5, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(205 + nandOffsetX, 120);
    ctx.lineTo(250 + nandOffsetX, 120);
    ctx.stroke();

    ctx.fillText("F", 290 + nandOffsetX, 125);

    document.getElementById("text-question").innerText = `What is the Boolean expression for F using a NAND gate?`;

    storeReviewSnapshot();

}

let correctAnswer = "";


function checkAnswer(selectedButton) {
    const selectedAnswer = selectedButton.innerText;

    if (window.reviewData && window.reviewData.length > 0) {
        window.reviewData[window.reviewData.length - 1].selectedAnswer = selectedAnswer;
    }

    const correctButton = [...document.querySelectorAll(".option-text")]
        .find(btn => btn.innerText === correctAnswer);

    if (selectedAnswer === correctAnswer) {
        selectedButton.style.backgroundColor = "green";
        quizScore++;
        document.getElementById("score-counter").innerText = `Score: ${quizScore}`;
    } else {
        selectedButton.style.backgroundColor = "red";
        if (correctButton) {
            correctButton.style.backgroundColor = "green";
        }
    }

    document.querySelectorAll(".option-text").forEach(btn => {
        btn.onclick = null;
    });

    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.style.display = "block";
    }
}

function generateDecoderQuestion() {
    if (!window.reviewData) window.reviewData = [];

    const questions = [
        ordecoder24,
        ordecoder38,
        basic24Decoder,
        basic38Decoder,
        nanddecoder24,
        nanddecoder38
    ];

    const randomIndex = Math.floor(Math.random() * questions.length);
    const chosenQuestion = questions[randomIndex];
    chosenQuestion();
}

window.getRandomQuestions = getRandomQuestions;

function drawDecoderFromInput() {
    const rawInput = document.getElementById('draw-input').value;

    // Step 1: Normalize input
    const expression = rawInput
        .replace(/\s+/g, '')       // Remove all whitespace
        .replace(/^f=/i, '')       // Remove 'F=' or 'f='
        .toUpperCase();            // Uppercase everything

    if (!expression) return;

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    const booleanExpressions = [
        "X'Y'Z'", "X'Y'Z", "X'YZ'", "X'YZ",
        "XY'Z'", "XY'Z", "XYZ'", "XYZ"
    ];

    // Step 2: Parse input expression
    const terms = expression.split('+');
    const usedOutputs = [];

    terms.forEach(term => {
        const cleaned = term.trim();
        const index = booleanExpressions.indexOf(cleaned);
        if (index !== -1) usedOutputs.push(index);
    });

    // Step 3: Draw decoder box
    ctx.strokeRect(100, 30, 140, 220);
    ctx.fillText("3-to-8 Decoder", 170, 270);

    // Draw input lines
    const inputs = ["X", "Y", "Z"];
    inputs.forEach((input, i) => {
        const y = 90 + i * 40;
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(100, y);
        ctx.stroke();
        ctx.fillText(input, 40, y + 5);
        ctx.fillText(String.fromCharCode(65 + i), 115, y + 5);
    });

    // Step 4: Draw outputs
    const orInputYPositions = {
        1: [120],
        2: [90, 150],
        3: [90, 120, 150]
    };

    const connectionY = orInputYPositions[Math.min(usedOutputs.length, 3)] || [];
    let orInputIndex = 0;

    for (let i = 0; i < 8; i++) {
        const yPos = 50 + i * 25;
        ctx.fillText(`Y${i}`, 220, yPos + 5);

        if (usedOutputs.includes(i)) {
            ctx.beginPath();
            ctx.moveTo(240, yPos);
            ctx.lineTo(300, yPos);
            ctx.stroke();

            // Connect to OR input if one is available
            if (orInputIndex < connectionY.length) {
                const orY = connectionY[orInputIndex];
                ctx.beginPath();
                ctx.moveTo(300, yPos);
                ctx.lineTo(320, orY);
                ctx.stroke();
                orInputIndex++;
            }
        }
    }

    // Step 5: Draw OR gate shape
    ctx.beginPath();
    ctx.moveTo(330, 80);
    ctx.quadraticCurveTo(360, 120, 330, 160);
    ctx.lineTo(360, 160);
    ctx.quadraticCurveTo(390, 160, 420, 120);
    ctx.quadraticCurveTo(390, 80, 360, 80);
    ctx.closePath();
    ctx.stroke();

    // Step 6: Draw OR gate input stubs
    if (usedOutputs.length === 1) {
        ctx.beginPath();
        ctx.moveTo(320, 120);
        ctx.lineTo(345, 120);
        ctx.stroke();
    } else if (usedOutputs.length === 2) {
        ctx.beginPath();
        ctx.moveTo(320, 90);
        ctx.lineTo(338, 90);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(320, 150);
        ctx.lineTo(338, 150);
        ctx.stroke();
    } else if (usedOutputs.length >= 3) {
        ctx.beginPath();
        ctx.moveTo(320, 90);
        ctx.lineTo(338, 90);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(320, 120);
        ctx.lineTo(345, 120);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(320, 150);
        ctx.lineTo(338, 150);
        ctx.stroke();
    }

    // Step 7: Draw OR gate output
    if (usedOutputs.length > 0) {
        ctx.beginPath();
        ctx.moveTo(420, 120);
        ctx.lineTo(490, 120);
        ctx.stroke();
        ctx.fillText("F", 510, 125);
    }

    // Step 8: Display final label
    ctx.font = "24px Arial";
    ctx.fillText(`Decoder for: F = ${expression}`, 350, 420);
}