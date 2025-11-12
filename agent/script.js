// script.js
// Core calculator logic and UI wiring

// Calculator class definition
class Calculator {
  /**
   * @param {HTMLElement} displayElement - The element where the current value is shown.
   */
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.clear();
  }

  /** Reset calculator state */
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
    this.updateDisplay();
  }

  /** Delete the last character of the current operand */
  delete() {
    if (this.currentOperand) {
      this.currentOperand = this.currentOperand.slice(0, -1);
      this.updateDisplay();
    }
  }

  /** Append a number or decimal point to the current operand */
  appendNumber(number) {
    // Prevent multiple leading zeros (except when after a decimal point)
    if (number === '0' && this.currentOperand === '0') return;
    // Prevent multiple decimals
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  /** Choose an operation (+, -, *, /) */
  chooseOperation(operation) {
    if (this.currentOperand === '') return; // nothing to operate on
    if (this.previousOperand !== '') {
      // If there is already a pending operation, compute it first
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  /** Compute the result of the selected operation */
  compute() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    let computation = 0;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        // Simple division, guard against division by zero
        computation = current === 0 ? 'Error' : prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation.toString();
    this.operation = null;
    this.previousOperand = '';
    this.updateDisplay();
  }

  /** Update the calculator display */
  updateDisplay() {
    const value = this.currentOperand || '0';
    if (this.displayElement.tagName === 'INPUT') {
      this.displayElement.value = value;
    } else {
      this.displayElement.textContent = value;
    }
  }
}

// Instantiate calculator with the display element from the DOM
const calculator = new Calculator(document.getElementById('display'));

// Helper to map action names to operation symbols
const actionToOperator = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/',
};

// Wire up UI buttons
document.querySelectorAll('.calc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    switch (action) {
      case 'clear':
        calculator.clear();
        break;
      case 'delete':
        calculator.delete();
        break;
      case 'equals':
        calculator.compute();
        break;
      case 'decimal':
        calculator.appendNumber('.');
        break;
      case 'number':
        const num = btn.dataset.number;
        if (num !== undefined) calculator.appendNumber(num);
        break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        calculator.chooseOperation(actionToOperator[action]);
        break;
      default:
        // No-op for unknown actions
        break;
    }
  });
});

// Keyboard input support
window.addEventListener('keydown', e => {
  const key = e.key;
  let handled = false;

  // Numbers and decimal point
  if (/^[0-9]$/.test(key)) {
    calculator.appendNumber(key);
    handled = true;
  } else if (key === '.') {
    calculator.appendNumber('.');
    handled = true;
  }
  // Operations
  else if (['+', '-', '*', '/'].includes(key)) {
    calculator.chooseOperation(key);
    handled = true;
  }
  // Compute (Enter or =)
  else if (key === 'Enter' || key === '=') {
    calculator.compute();
    handled = true;
  }
  // Delete (Backspace)
  else if (key === 'Backspace') {
    calculator.delete();
    handled = true;
  }
  // Clear (Escape or C/c)
  else if (key === 'Escape' || key.toLowerCase() === 'c') {
    calculator.clear();
    handled = true;
  }

  if (handled) {
    e.preventDefault();
  }
});

// Expose Calculator class for debugging (optional)
window.Calculator = Calculator;
