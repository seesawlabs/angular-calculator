(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name calculatorApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the calculatorApp
     */
    angular
        .module('calculatorApp')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl() {

        var vm = this;

        // Add variables to view model
        vm.on = false;
        vm.displayVal = '0';
        vm.pendingOp = '';
        vm.reset = true;
        vm.pendingVal = null;
        vm.newVal = null;
        vm.total = null;
        vm.stringTotal = '';
        vm.show = false;

        // Add public functions to view model
        vm.updateDisplayVal = updateDisplayVal;
        vm.performOp = performOp;
        vm.clear = clear;
        vm.powerToggle = powerToggle;
        vm.backspace = backspace;

        // Updates displayVal as new values are added
        function updateDisplayVal(userInput) {
            if (vm.displayVal === '0' || vm.reset) {
                vm.displayVal = userInput;
                vm.reset = false;
            } else if (userInput === '.' && vm.displayVal.indexOf(".") !== -1) {
                // Return if . already exists in displayVal
                return;
            } else {
                vm.displayVal += userInput;
            }
        }

        // Triggered when an operator key is pressed
        function performOp(operator) {
            // Check for no pending val, else perform operation
            if (!vm.pendingVal) {
                vm.pendingVal = toNumber(vm.displayVal);
                vm.pendingOp = operator;
                vm.reset = true;
            } else {
                // Store user input in newVal
                vm.newVal = toNumber(vm.displayVal);

                // Perform the pending operation
                switch (vm.pendingOp) {
                    case '/':
                        if (vm.newVal === 0 && vm.pendingVal !== 0) {
                            vm.displayVal = 'NAN';
                        } else {
                            vm.total = vm.pendingVal / vm.newVal;
                            vm.stringTotal = String(vm.total);
                            vm.displayVal = vm.stringTotal.slice(0,10);
                        }
                        break;
                    case 'x':
                        vm.total = vm.pendingVal * vm.newVal;
                        vm.stringTotal = String(vm.total);
                        vm.displayVal = vm.stringTotal.slice(0,10);
                        break;
                    case '+':
                        vm.total = vm.pendingVal + vm.newVal;
                        vm.stringTotal = String(vm.total);
                        vm.displayVal = vm.stringTotal.slice(0,10);
                        break;
                    case '-':
                        vm.total = vm.pendingVal - vm.newVal;
                        vm.stringTotal = String(vm.total);
                        vm.displayVal = vm.stringTotal.slice(0,10);
                        break;
                    default:
                        console.log('default');
                }

                // Check if user wants to calculate total and reset values
                if (operator === '=') {
                    vm.pendingOp = '';
                    vm.pendingVal = null;
                    vm.reset = true;
                } else {
                    // New becomes pending
                    vm.pendingOp = operator;
                    vm.pendingVal = vm.total;
                    vm.reset = true;
                }
            }
        }

        // Clears all computation data
        function clear() {
            vm.displayVal = '0';
            vm.total = null;
            vm.pendingOp = '';
            vm.pendingVal = null;
        }


        // Toggles the calculator on and off 
        function powerToggle() {
            clear();
            vm.show = !vm.show;
        }

        // Removes last value from displayVal
        function backspace() {
            if (!vm.reset) {
                vm.displayVal = vm.displayVal.substring(0, vm.displayVal.length - 1);
            }
        }

        // Private function for converting strings to numbers
        function toNumber(numberString) {
            var result = 0;
            if (numberString) {
                result = numberString * 1;
            }
            return result;
        }
    }
})();