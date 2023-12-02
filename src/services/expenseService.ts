import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/config";
import { Expense } from "../interfaces/Expense";
import { ERROR_ADDING_EXPENSE, ERROR_DELETING_EXPENSE } from "../utils/constants";

export const addExpense = async (expense: Expense) => {
  try {
    const expenseRef = collection(db, "expenses");
    const docRef = await addDoc(expenseRef, {
      ...expense,
      uid: expense.uid,
      date: Timestamp.fromDate(expense.date), // Convert Date to Firestore Timestamp
    });
    return docRef.id; // Returns the generated id
  } catch (e) {
    console.error({ERROR_ADDING_EXPENSE}, e);
  }
};

export const getAllExpenses = async (uid: string): Promise<Expense[]> => {
  const expensesRef = query(collection(db, "expenses"), where("uid", "==", uid));
  const querySnapshot = await getDocs(expensesRef);
  const expenses: Expense[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    expenses.push({
      id: doc.id,
      uid: data.uid,
      merchant: data.merchant,
      amount: data.amount,
      category: data.category,
      date: data.date.toDate(), // Convert Firestore Timestamp to JavaScript Date
      notes: data.notes,
      isRecurring: data.isRecurring,
    });
  });

  return expenses;
};

export const deleteExpense = async (expenseId: string) => {
  try {
    await deleteDoc(doc(db, "expenses", expenseId));
  } catch (error) {
    console.error({ERROR_DELETING_EXPENSE}, error);
  }
};
