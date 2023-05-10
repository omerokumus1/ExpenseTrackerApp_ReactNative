import { View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

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
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;
