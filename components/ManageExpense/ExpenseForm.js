import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { GlobalStyles } from '../../constants/styles';

function getInitialState(defaultValues) {
  if (defaultValues) {
    const isValid = true;
    return {
      amount: { value: defaultValues.amount.toString(), isValid },
      date: { value: defaultValues.date.toString().slice(0, 10), isValid },
      description: { value: defaultValues.description, isValid },
    };
  }
  const isValid = true;
  return {
    amount: { value: '', isValid },
    date: { value: '', isValid },
    description: { value: '', isValid },
  };
}

function getValidities(expenseData) {
  const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
  const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
  const descriptionIsValid = expenseData.description.trim().length > 0;
  return [amountIsValid, dateIsValid, descriptionIsValid];
}

function isExpenseDataValid(expenseData) {
  const [amountIsValid, dateIsValid, descriptionIsValid] =
    getValidities(expenseData);
  return amountIsValid && dateIsValid && descriptionIsValid;
}

function updateStateValidity(currentState, expenseData) {
  const [amountIsValid, dateIsValid, descriptionIsValid] =
    getValidities(expenseData);

  return {
    amount: { value: currentState.amount.value, amountIsValid },
    date: { value: currentState.date.value, dateIsValid },
    description: { value: currentState.description.value, descriptionIsValid },
  };
}

function getFormIsValid(input) {
  return (
    input.amount.isValid && input.date.isValid && input.description.isValid
  );
}

function getIsValueValid(key, value) {
  if (key === 'amount') {
    return !isNaN(value) && value > 0;
  } else if (key === 'date') {
    return new Date(value).toString() !== 'Invalid Date';
  } else if (key === 'description') {
    return value.trim().length > 0;
  }
}

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [input, setInput] = useState(getInitialState(defaultValues));

  function inputChangedHandler(key, value) {
    setInput((currentState) => {
      return {
        ...currentState,
        [key]: { value, isValid: getIsValueValid(key, value) },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    if (!isExpenseDataValid(expenseData)) {
      //   Alert.alert('Invalid input', 'Please check your input values');
      return setInput((currentState) => {
        return updateStateValidity(currentState, expenseData);
      });
    }

    onSubmit(expenseData);
  }

  const formIsValid = getFormIsValid(input);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputContainer}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: input.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: input.date.value,
          }}
        />
      </View>

      <View style={styles.description}>
        <Input
          label="Description"
          invalid={!input.description.isValid}
          textInputConfig={{
            multiline: true,
            autoCorrect: false,
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: input.description.value,
          }}
        />
      </View>
      {!formIsValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
