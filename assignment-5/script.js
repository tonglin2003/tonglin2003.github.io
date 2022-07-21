console.log("Hello World");

// ------------ Part A -------------- //
console.log("Part A");
const lucas_height = 1.69;
const lucas_mass = 78;
const lucas_bmi = lucas_mass/(lucas_height * lucas_height);

const peter_height = 1.95;
const peter_mass = 92;
const peter_bmi = peter_mass/(peter_height * peter_height);

console.log("The BMI of Peter is " + peter_bmi, ", The BMI of Lucas is " + lucas_bmi, " , Peter's BMI is higher than Lucas's BMI that is False.");

// ------------ Part B -------------- //

console.log("Part B");
const celsius_temp1 = 30;
const fahrenheit_temp1 = `${celsius_temp1}°C is ${(celsius_temp1 * 1.8) + 32}°F`;
console.log(fahrenheit_temp1);

const fahrenheit_temp2 = 90;
const celsius_temp2 = `${fahrenheit_temp2}°F is ${(fahrenheit_temp2 - 32) * 5/9}°C`;
console.log(celsius_temp2);


// ------------ Part C -------------- //

console.log("Part C");

if (lucas_bmi > peter_bmi) {
    console.log("Lucas's BMI(" + (lucas_bmi) + ") is higher than Peter's BMI(" + (peter_bmi) + ")!");
}
else {
    console.log("Peter's BMI(" + (peter_bmi) + ") is higher than Lucas's BMI(" + (lucas_bmi) + ")!");
}

// ------------ Part D -------------- //

console.log("Part D");

const CovertCelsiusToFahrenheit = (celsius) => `${celsius}°C is ${((celsius * 1.8) + 32)}°F`;
const CovertFahrenheitToCelsius = (fahrenheit) =>  `${fahrenheit}°F is ${(fahrenheit -32) * 5/9}°C`

const testing_fah = 100
const testing_cel = 100


console.log(CovertCelsiusToFahrenheit(testing_cel));
console.log(CovertFahrenheitToCelsius(testing_fah));







