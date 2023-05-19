import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpensesScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpensesAsync() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (e) {
        setErrorOccured('Could not fetch expenses');
      }

      setIsFetching(false);
    }

    fetchExpensesAsync();
  }, []);

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError(null);
        }}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
