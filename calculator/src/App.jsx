import { useReducer } from 'react';
import Digit from './components/Digit';
import Operation from './components/Operation';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // After calculation if you click a digit, it should overWrite the value
      if (state.overwrite) {
        return {
          ...state,
          currentOutput: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOutput === '0') return state;
      if (payload.digit === '.' && state.currentOutput.includes('.'))
        return state;

      return {
        ...state,
        currentOutput: `${state.currentOutput || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // First scenario:
      if (state.currentOutput == null && state.previousOutput == null)
        return state;
      // Second scenario:
      if (state.previousOutput == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOutput: state.currentOutput,
          currentOutput: null,
        };
      }
      // Third scenario:
      if (state.currentOutput == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      return {
        ...state,
        previousOutput: evaluate(state),
        operation: payload.operation,
        currentOutput: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOutput: null,
        };

      if (state.currentOutput === null) return state;

      if (state.currentOutput.length === 1)
        return { ...state, currentOutput: null };

      return {
        ...state,
        currentOutput: state.currentOutput.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      return {
        ...state,
        currentOutput: evaluate(state),
        previousOutput: null,
        operation: null,
        overwrite: true,
      };
  }
}

function evaluate({ currentOutput, previousOutput, operation }) {
  const prev = parseInt(previousOutput);
  const curr = parseInt(currentOutput);
  if (isNaN(prev) || isNaN(curr)) return '';

  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '*':
      computation = prev * curr;
      break;
    case '/':
      computation = prev / curr;
      break;
  }
  return computation.toString();
}

// Format number:
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

function formatOperand(num) {
  if (num == null) return;
  const [integer, decimal] = num.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOutput, previousOutput, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-output">
          {formatOperand(previousOutput)} {operation}
        </div>
        <div className="current-output">{formatOperand(currentOutput)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <Operation operation="/" dispatch={dispatch} />
      <Digit digit="1" dispatch={dispatch} />
      <Digit digit="2" dispatch={dispatch} />
      <Digit digit="3" dispatch={dispatch} />
      <Operation operation="*" dispatch={dispatch} />
      <Digit digit="4" dispatch={dispatch} />
      <Digit digit="5" dispatch={dispatch} />
      <Digit digit="6" dispatch={dispatch} />
      <Operation operation="+" dispatch={dispatch} />
      <Digit digit="7" dispatch={dispatch} />
      <Digit digit="8" dispatch={dispatch} />
      <Digit digit="9" dispatch={dispatch} />
      <Operation operation="-" dispatch={dispatch} />
      <Digit digit="." dispatch={dispatch} />
      <Digit digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
