import axios from 'axios';

const baseUrl = 'https://react-native-7d7a3-default-rtdb.firebaseio.com/';
const expensesUrl = baseUrl + 'expenses.json';
export async function storeExpense(expenseData) {
  const response = await axios.post(expensesUrl, expenseData);
  const id = response.data.name;
  return id;
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

export function updateExpense(id, expenseData) {
  const url = baseUrl + `expenses/${id}.json`;
  return axios.put(url, expenseData);
}

export function deleteExpenese(id) {
  const url = baseUrl + `expenses/${id}.json`;
  return axios.delete(url);
}
