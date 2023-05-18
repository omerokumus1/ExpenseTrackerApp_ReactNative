import { createContext, useReducer } from 'react';

/*
const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Shoes',
    amount: 59.99,
    date: new Date('2021-01-19'),
  },

  {
    id: 'e2',
    description: 'Trousers',
    amount: 89.29,
    date: new Date('2021-01-05'),
  },
  {
    id: 'e3',
    description: 'Bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'Book',
    amount: 14.99,
    date: new Date('2021-02-19'),
  },
  {
    id: 'e5',
    description: 'Book-2',
    amount: 18.59,
    date: new Date('2021-02-18'),
  },
  {
    id: 'e6',
    description: 'Shoes',
    amount: 59.99,
    date: new Date('2021-01-19'),
  },

  {
    id: 'e7',
    description: 'Trousers',
    amount: 89.29,
    date: new Date('2021-01-05'),
  },
  {
    id: 'e8',
    description: 'Bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e9',
    description: 'Book',
    amount: 14.99,
    date: new Date('2021-02-19'),
  },
  {
    id: 'e10',
    description: 'Book-2',
    amount: 18.59,
    date: new Date('2021-02-18'),
  },
];
*/

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      return action.payload.reverse();
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
