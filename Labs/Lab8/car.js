//Step 1 create a class defining the type of object
class Car{
    constructor(brand, model, year, color, bodyStyle, isAutomatic, type, imageLink){
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.bodyStyle = bodyStyle;
        this.isAutomatic = isAutomatic;
        this.type = type;
        this.imageLink = imageLink;
    }

    getDescription(){
        return `${this.year} ${this.brand} ${this.model}, ${this.color} ${this.bodyStyle} (${this.type})`;
    }
}

var carsData = [];  //Array to hold objects
var currentIndex = 0; //Index of the currently displayed car

//Function to display car details
function displayCarDetails(index){
    var car = carsData[index];
    var carInfo = document.getElementById('car-info');
    var carImage = document.getElementById('car-image');
    carInfo.textContent = car.getDescription();
    carImage.src = car.imageLink;
}

//function to handle "Next button"
function nextCar(){
    currentIndex = (currentIndex + 1) % carsData.length;
    displayCarDetails(currentIndex);
}

//Function to handle "Previous" button
function previousCar(){
    currentIndex = (currentIndex - 1 + carsData.length) % carsData.length;
    displayCarDetails(currentIndex);
}

document.getElementById('display-button').addEventListener('click', function() {displayCarDetails(currentIndex);
    document.getElementById('display-button').style.display = 'none';
    document.getElementById('car-details').style.display = 'block';
    document.getElementById('prev-button').style.display = 'block';
    document.getElementById('next-button').style.display = 'block';
})
//Event listeners for "Next" and "Previous" buttons
document.getElementById('next-button').addEventListener('click', nextCar);
document.getElementById('prev-button').addEventListener('click', previousCar);

//Step 2 Create 5 instances of the class you created, then create an array containing these 5 objects,
//and transform this array into its JSON representation.

const cars = [
    new Car("Toyota", "Camry", 2022 , "Blue", "Sedan", true, "FWD", "car1.jpg"),
    new Car("Honda", "Civic", 2021, "Red", "Sedan", "true", "FWD", "car2.jpg"),
    new Car("Ford", "Mustang", 2020, "Yellow", "Coupe", false, "RWD", "car3.jpg"),
    new Car("Jeep", "Wrangler", 2021, "Green", "SUV", true, "4WD", "car4.jpg"),
    new Car("Chevrolet", "Silverado", 2022, "Black", "Truck", true, "4WD", "car5.jpg")
];

//Step 3 convert JavaScript value to JSON string and save the contend manually to the server
const myJSON = JSON.stringify(cars);


function convertJSON(){
    document.getElementById("demo").innerHTML = myJSON;
}

var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === XMLHttpRequest.DONE){
        if(httpRequest.status === 200){
            carsData = JSON.parse(httpRequest.responseText);
            displayCarDetails(currentIndex);
        }
        else{
            console.error('Error loading JSON: ' + httpRequest.status);
        }
    }
};

//Set the path to your JSON file on the server
var path = 'http://localhost/Lab8/mycollection.json'; 

httpRequest.open('GET', path, true);
httpRequest.send();


