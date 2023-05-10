import { Text, View } from 'react-native';

function ExpensesSummary({ expenses, periodName }) {
  const totalExpense = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${totalExpense.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;
