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
    const timeParts = raceInputs[i + 1].value.split(':');
    const timeInSeconds = (+timeParts[0]) * 60 * 60 + (+timeParts[1]) * 60 + (+timeParts[2]); 
    races.push({ distance, timeInSeconds });
  }

  const jackDanielsResults = races.map(race => calculateJackDaniels(race.distance, race.timeInSeconds));
  const riegelResults = races.map(race => calculateRiegel(race.distance, race.timeInSeconds));

  const avgJackDaniels = average(jackDanielsResults);
  const avgRiegel = average(riegelResults);

  document.getElementById('jackDanielsResult').textContent = avgJackDaniels.toFixed(2);
  document.getElementById('riegelResult').textContent = avgRiegel.toFixed(2);
}

function calculateJackDaniels(distance, timeInSeconds) {
  const velocity = distance / timeInSeconds;
  const VDOT = -4.6 + 0.182258 * velocity + 0.000104 * velocity**2;
  return (VDOT + 1.4) / 0.8;
}

function calculateRiegel(distance, timeInSeconds) {
  const velocity = distance / timeInSeconds;
  return (-4.60 + 0.1825 * velocity + 0.000104 * velocity**2) * 0.8 + 6;
}

function average(arr) {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

for (let i = 0; i < raceInputs.length; i += 2) {
  const distance = parseFloat(raceInputs[i].value);
  const timeString = raceInputs[i + 1].value;

  // Validate time format
  if (!timeString.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/)) {
    alert("Invalid time format. Use hh:mm:ss");
    return;
  }

  const timeParts = timeString.split(':');
  const timeInSeconds = (+timeParts[0]) * 3600 + (+timeParts[1]) * 60 + (+timeParts[2]); 
  races.push({ distance, timeInSeconds });
}
// Initial race input on page load
addRaceInput();
