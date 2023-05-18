import { useContext, useEffect } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

function RecentExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpensesAsync() {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    }

    fetchExpensesAsync();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No registered expense is found for the last 7 days"
    />
  );
}
export default RecentExpensesScreen;
