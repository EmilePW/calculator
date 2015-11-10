'use strict';

angular.module('calculator', []);

angular.module('calculator').directive('calculatorDropin', function() {
	return {
		restrict: 'E',
		templateUrl: 'calculator-dropin.html',
		controller: function ($scope) {
			$scope.console = window.console;

			// Initialise variables for tracking numbers
			$scope.currentSum = 0;
			$scope.currentNumber = 0;

			// List of numbers and operations to be performed
			$scope.trolley = {
				brackets: null,
				indices: null,
				divisions: null,
				multiplications: null,
				additions: null,
				subtractions: null
			}

			$scope.computations = [''];

			$scope.appendOperator = function(array, operator) {
				if (operator === '(') {
					array[ array.length -1 ] = operator
					array.push('');
				}
				else if (operator === ')') {
					array.push(operator);
				}
				else {
					array.push(operator);
					array.push('');
				}
			}

			$scope.appendDigit = function (array, digit) {
				array[ array.length - 1 ] += digit;
			}

			$scope.compute = function(array) {
				var bidmasObj = {
					b: null,
					i: null,
					d: null,
					m: null,
					a: null,
					s: null
				};

				var bracketsOpen = 0;

				var computeObj = bidmasObj;

				for(var i = 0; i < array.length; i++) {
					if(array[i].name === 'left-bracket') {
						bracketsOpen++;
						computeObj.b = bidmasObj;
					}

					if(array[i].name === 'right-bracket') {
						bracketsOpen--;
					}
				}
			}

			$scope.setCurrentNumber = function (number) {
				$scope.currentNumber = number;
			}

			$scope.numbers = [1,2,3,4,5,6,7,8,9,0];
			$scope.operators = [
				{
					name: 'plus', 
					icon: '+',
					operate: function (number) {
						return $scope.currentSum += number;
					}
				},
				{
					name: 'subtract', 
					icon: '-',
					operate: function (number) {
						return $scope.currentSum -= number;
					}
				},
				{
					name: 'multiply', 
					icon: 'x',
					operate: function (number) {
						return $scope.currentSum *= number;
					}
				},
				{
					name: 'divide', 
					icon: '/',
					operate: function (number) {
						return $scope.currentSum /= number;
					}
				},
				{
					name: 'power', 
					icon: '^',
					operate: function (number) {
						return Math.pow($scope.currentSum, number);
					}
				},
				{
					name: 'left-bracket',
					icon: '('
				},
				{
					name: 'right-bracket',
					icon: ')'
				},
				{
					name: 'reset', 
					icon: 'Reset',
					operate: function (number) {
						return $scope.currentSum = 0;
					}
				},
				{
					name: 'equals',
					icon: '=',
					operate: function (number) {
						return $scope.currentSum;
					}
				}
			];
		}
	};
});