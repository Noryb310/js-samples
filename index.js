let map;


async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 34.2371, lng: -118.5293 },
    zoom: 18,
    gestureHandling: 'none',
    disableDefaultUI: true,
    styles: [
      { elementType: "labels", stylers: [{ visibility: "off" }] },
      // { featureType: "road", stylers: [{ visibility: "off" }] }
    ],

  });

   // Add a click listener to the map using the advanced handling function.
   map.addListener('click', handleMapClick);

   createRectangles();

}
initMap();



const buildings = {
  "Santa Susana Hall": {
      bounds: {
          north: 34.2379,
          south: 34.2373,
          east: -118.5288 - 0.0004, // Decrease to shift left
          west: -118.5290 - 0.0004  
      },
      rectangle: null
  },
  "Campus Store": {
    bounds: {
        north: 34.2379 - 0.0001, // Decrease to shift down
        south: 34.2371 - 0.0001,
        east: -118.5281 + 0.0004, // Increase to shift right
        west: -118.5291 + 0.0004  
    },
    rectangle: null
  },
  "Live Oak Hall": {
    bounds: {
        north: 34.2379 + 0.0005, // Increase to shift up
        south: 34.23766 + 0.0005,
        east: -118.5280 + 0.0004, 
        west: -118.52917 + 0.0004  // Increase to shift right
    },
    rectangle: null
  },
  "Sierra Hall": {
    bounds: {
        north: 34.23795 + 0.0005,
        south: 34.23760 + 0.0005,
        east: -118.52805 - 0.0020, // Decrease to shift left
        west: -118.5294 - 0.0020  
    },
    rectangle: null
  },
  "Nordhoff Hall": {
    bounds: {
        north: 34.23791 - 0.0012,
        south: 34.23720 - 0.0012,
        east: -118.5282 - 0.0020, // Decrease to shift left
        west: -118.52891 - 0.0020  
    },
    rectangle: null
  },

};

// Function to create rectangles for each building
function createRectangles() {
  Object.keys(buildings).forEach(key => {
      const building = buildings[key];
      const rectangle = new google.maps.Rectangle({
          strokeOpacity: 0,
          fillOpacity: 0,
          map: map,
          bounds: building.bounds,
          clickable: false // Initially not clickable
      });
      building.rectangle = rectangle;
  });
}


let score = 0; // Variable to keep track of the score

// Advanced handling function for map clicks
function handleMapClick(mapsMouseEvent) {
  const lat = mapsMouseEvent.latLng.lat();
  const lng = mapsMouseEvent.latLng.lng();
  const currentBuilding = buildingNames[currentBuildingIndex]; // Get the current building from the quiz

  let found = false;  // Flag to check if the clicked building was found and is correct

  // Reset all rectangles to be hidden before checking the click
  resetQuiz();

  // Check only the current quiz building
  const building = buildings[currentBuilding];
  if (lat >= building.bounds.south && lat <= building.bounds.north &&
      lng >= building.bounds.west && lng <= building.bounds.east) {
    // Click was within the bounds of the current quiz building
    building.rectangle.setOptions({
      fillColor: '#00FF00',  // Correct guess - green
      strokeColor: "#00FF00",
      strokeWeight: 2,
      strokeOpacity: 0.8,
      fillOpacity: 0.25  // Make visible
    });
    found = true;
    score++;  // Increment score
    document.getElementById('score-display').textContent = `Score: ${score}`; // Update score display

  } else {
    // If click is outside the current building bounds, mark the building as incorrect
    building.rectangle.setOptions({
      fillColor: '#FF0000',  // Incorrect guess - red
      strokeColor: "#FF0000",
      strokeWeight: 2,
      strokeOpacity: 0.8,
      fillOpacity: 0.25  // Show slightly to indicate wrong location
    });
  }

  showNotification(found);
}


let currentBuildingIndex = 0;
let buildingNames = Object.keys(buildings);

function startQuiz() {
    currentBuildingIndex = 0;
    score = 0; // Reset score to 0 at the start of the quiz
    displayQuestion();
    document.getElementById('next-question-btn').style.display = 'block';
}

function displayQuestion() {
  if (currentBuildingIndex < buildingNames.length) {
      const buildingName = buildingNames[currentBuildingIndex];
      document.getElementById('building-name').textContent = buildingName;
      resetQuiz();  // Ensure all rectangles are hidden before showing a new question
  } else {
      alert("Quiz completed!");
      document.getElementById('next-question-btn').style.display = 'none';  // Hide next question button
      document.getElementById('building-name').textContent = "Quiz over, well done!";
  }
}


function nextQuestion() {
    if (currentBuildingIndex < buildingNames.length) {
        currentBuildingIndex++;
        displayQuestion();
    }
}

document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
document.getElementById('next-question-btn').addEventListener('click', nextQuestion);

function resetQuiz() {
    Object.keys(buildings).forEach(key => {
        const building = buildings[key];
        building.rectangle.setOptions({
          // Make invisible again
            strokeOpacity: 0,
            fillOpacity: 0  
        });
    });
}

function showNotification(isCorrect) {
  const messageElement = document.getElementById('notification-message');
  const box = document.getElementById('notification-box');

  if (isCorrect) {
      messageElement.textContent = "Correct!";
      box.style.backgroundColor = "#d4edda";  // Light green background for correct
  } else {
      messageElement.textContent = "Wrong!";
      box.style.backgroundColor = "#f8d7da";  // Light red background for incorrect
  }

  messageElement.style.fontSize = "34px";
  box.style.display = "block";  // Make the notification box visible

  // Optionally hide the notification after some time
  setTimeout(() => {
      box.style.display = "none";
  }, 5000);  // Hide after 5 seconds
}






