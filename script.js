document.getElementById('addRace').addEventListener('click', addRaceInput);

function addRaceInput() {
  const raceInputsDiv = document.getElementById('raceInputs');
  const newRaceDiv = document.createElement('div');
  newRaceDiv.classList.add("race-input");
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
  const raceInputs = document.querySelectorAll('.race-input');

  for (let i = 0; i < raceInputs.length; i++) {
    const distanceSelect = raceInputs[i].querySelector('.distance');
    const timeInput = raceInputs[i].querySelector('.time');
    const distance = parseFloat(distanceSelect.value);
    const timeString = timeInput.value;

    // Validate time format
    if (!timeString.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/)) {
      alert("Invalid time format. Use hh:mm:ss");
      return;
    }

    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // Calculate velocity in meters per second
    const velocity = distance / timeInSeconds; 

    races.push({ distance, timeInSeconds, velocity }); 
  }

  const jackDanielsResults = races.map(race => calculateJackDaniels(race.velocity)); // Fixed variable name
  const riegelResults = races.map(race => calculateRiegel(race.velocity)); // Fixed variable name

  const avgJackDaniels = average(jackDanielsResults);
  const avgRiegel = average(riegelResults);

  document.getElementById('jackDanielsResult').textContent = avgJackDaniels.toFixed(2);
  document.getElementById('riegelResult').textContent = avgRiegel.toFixed(2);
}

function calculateJackDaniels(velocity) { 
  const VDOT = -4.6 + 0.182258 * velocity + 0.000104 * velocity**2;
  return (VDOT + 1.4) / 0.8;
}

function calculateRiegel(velocity) { 
  return (-4.60 + 0.1825 * velocity + 0.000104 * velocity**2) * 0.8 + 6;
}

function average(arr) {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

// Initial race input on page load
addRaceInput();
