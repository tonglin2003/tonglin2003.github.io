console.log("Part A");

const peter = {
    firstName: "Peter",
    lastName: "Smith",
    birthYear: 1990,
    jobTitle: "student",
    score: [100, 99, 90, 96],

    calAvgScore: function () {
        let sum = 0;
        for (let i = 0; i < this.score.length; i++) {
            sum += this.score[i]
        }
        this.avgScore = sum/this.score.length;
        return this.avgScore;
    },

    highestScore: function() {
        let highest = 0;
        for (let i = 0; i < this.score.length; i++) {
            if (this.score[i] > highest) {
                highest = this.score[i];
            }
        }
        return highest;
    },

    showSummary: function () {
        return `${this.firstName} ${this.lastName} has completed ${this.score.length} tasks, and ${this.firstName}'s average score is ${this.calAvgScore()}, ${this.firstName}'s highest score is ${this.highestScore()}.`;
    },
};

console.log(peter.showSummary());

console.log("Part B");

function  convertCelsiusToFahrenheit() {
    const userInput = Number(prompt("Please enter a number to be convert into Fahrenheit (-88°C to 55°C)"));
    if (userInput > 58 || userInput < -88) {
        alert("You have entered a number in a wrong range! Please enter 'convertCelsiusToFahrenheit()' to retry");
    }
    else if (isNaN(userInput)) {
        alert("You have entered wrong input! Please enter 'convertCelsiusToFahrenheit()' to retry");
    }
    else {
        const result = (userInput * (9/5)) +32;
        const resultReport = `${userInput}°C is ${result}°F. `;
        console.log(resultReport);
        return result;
    }
}

convertCelsiusToFahrenheit();
console.log("Please ener ' convertCelsiusToFahrenheit() ' if retry.");

console.log("Part C");
console.log("Please press the buttons on the page.")

const btn1 = document.querySelector("#myBtn1");
const span1 = document.querySelector("#close1");
const modal1 = document.querySelector("#modal1");
btn1.addEventListener('click', function() {
    modal1.style.display = "block";
});
span1.addEventListener('click', function() {
    modal1.style.display = "none";
});


const btn2 = document.querySelector("#myBtn2");
const span2 = document.querySelector("#close2");
const modal2 = document.querySelector("#modal2");
btn2.addEventListener('click', function() {
    modal2.style.display = "block";
});
span2.addEventListener('click', function() {
    modal2.style.display = "none";
});



const btn3 = document.querySelector("#myBtn3");
const span3 = document.querySelector("#close3");
const modal3 = document.querySelector("#modal3");
btn3.addEventListener('click', function() {
    modal3.style.display = "block";
});
span3.addEventListener('click', function() {
    modal3.style.display = "none";
});


