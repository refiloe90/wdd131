document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = 'Last Modified: ' + new Date(document.lastModified).toLocaleString();



/**
@param {number} temp
 * @param {number} windSpeed
 * @returns {string}
 */
const calculateWindChill = (temp, windSpeed) => 
    (13.12 + (0.6215 * temp) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temp * Math.pow(windSpeed, 0.16))).toFixed(1);

function displayWindChill() {
    const tempElement = document.querySelector('.info-box.weather p:nth-of-type(2)');
    const windElement = document.querySelector('.info-box.weather p:nth-of-type(4)');
    const targetElement = document.getElementById('windchillValue');

    if (!tempElement || !windElement || !targetElement) {
        console.error("Could not find necessary elements for wind chill calculation.");
        return;
    }

    try {
        const tempTextMatch = tempElement.textContent.match(/(-?\d+\.?\d*)/); 
        const windSpeedTextMatch = windElement.textContent.match(/(\d+\.?\d*)/); 

        const temp = parseFloat(tempTextMatch ? tempTextMatch[0] : 12); 
        const windSpeed = parseFloat(windSpeedTextMatch ? windSpeedTextMatch[0] : 3);
        
        const isViable = temp <= 10 && windSpeed > 4.8;

        let displayValue = 'N/A';
        
        if (isViable) {
            const windChillFactor = calculateWindChill(temp, windSpeed);
            displayValue = `${windChillFactor}&degC`;
        } else {
            displayValue = 'N/A';
        }
        
        targetElement.innerHTML = `Wind Chill: ${displayValue}`;

    } catch (e) {
        console.error("Error during wind chill processing:", e);
        targetElement.innerHTML = `Wind Chill: N/A`;
    }
}

window.addEventListener('load', displayWindChill);