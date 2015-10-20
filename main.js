window.onload = function() {
	var outputBox = document.getElementById('outputBox');

	var computeArray = [''];

	function compute(computeSeries) {
		var currentSum = 0;

		function operate(operation, number) {
			switch (operation) {
				case 'plus':
					currentSum += parseInt(number);
					break;
				case 'subtract':
					currentSum -= parseInt(number);
					break;
				case 'multiply':
					currentSum *= parseInt(number);
					break;
				case 'divide': 
					currentSum /= parseInt(number);
					break;
				case 'power':
					currentSum = Math.pow(currentSum, parseInt(number));
					break;
				case 'reset':
					currentSum = 0;
					break;
				default:
					currentSum += parseInt(number);
			}

			return currentSum;
		}

		for(var i = 0; i < computeSeries.length; i++) {
			if( i % 2 === 0) {
				operate(computeSeries[i - 1], computeSeries[i]);
			}
		}

		return currentSum;
	}

	// Add event listeners to buttons
	var buttons = document.body.getElementsByTagName('button');
	for(var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function() {
			var sumFinished = false;

			// If a number was clicked, append the digit to the last value in the array
			if (this.className === 'number') {
				computeArray[computeArray.length - 1] += this.value;
			}
			else if (this.className === 'operator' && !(this.value === 'equals' || this.value === 'reset')) {
				// Check if type of previous value was a number to add operator
				if (computeArray[ computeArray.length - 1 ] === '0' || parseInt(computeArray[ computeArray.length - 1]) > 0) {

					// Push operator into series for array
					computeArray.push(this.value);

					// Push empty string ready for digits into next position
					computeArray.push('');
				}
			}
			else if (this.value === 'equals') {
				compute(computeArray);
				outputBox.innerHTML = compute(computeArray);
				sumFinished = true;
				computeArray = [''];

			}
			else if (this.value === 'reset') {
				computeArray = [''];
				sumFinished = false;
				outputBox.innerHTML = '';
			}

			// Print current operations in the output box
			if(!sumFinished) {
				outputBox.innerHTML += this.innerHTML;
			}
		});
	}
}