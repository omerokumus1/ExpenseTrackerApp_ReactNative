import axios from 'axios';

const baseUrl = 'https://react-native-7d7a3-default-rtdb.firebaseio.com/';
const expensesUrl = baseUrl + 'expenses.json';
export function storeExpense(expenseData) {
  axios.post(expensesUrl, expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(expensesUrl);
  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }
  return expenses;
}
