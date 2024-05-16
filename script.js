document.getElementById('addRace').addEventListener('click', addRaceInput);

function addRaceInput() {
  const raceInputsDiv = document.getElementById('raceInputs');
  const newRaceDiv = document.createElement('div');
  newRaceDiv.innerHTML = `
    <select class="distance">
      <option value="5000">5K</option>
      <option value="10000">10K</option>
      <option value="21097.5">Half Marathon</option>
      <option value="42195">Marathon</option>
    </select>
    <input type="text" class="time" placeholder="hh:mm:ss"> 
  `;
  raceInputsDiv.appendChild(newRaceDiv);
}

function calculateVO2Max() {
  const races = [];
  const raceInputs = document.querySelectorAll('.distance, .time');

  for (let i = 0; i < raceInputs.length; i += 2) {
    const distance = parseFloat(raceInputs[i].value);
    const timeString = raceInputs[i + 1].value;

    // Validate time format
    if (!timeString.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/)) {
      alert("Invalid time format. Use hh:mm:ss");
      return; // Stop calculation if invalid time
    }

    const timeParts = timeString.split(':');
    const timeInSeconds = (+timeParts[0]) * 3600 + (+timeParts[1]) * 60 + (+timeParts[2]);
    races.push({ distance, timeInSeconds });
  }

  // ... (rest of the calculation logic remains the same)
}

// Initial race input on page load
addRaceInput();
