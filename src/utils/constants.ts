import { currentMonth, getMonthString } from "./helper";

// HOME PAGE CONSTANTS
export const HOME = "Home";
export const RECENT_EXPENSES = "Recent Expenses";
export const ADMIN = "Admin";
export const ITEMS_PER_PAGE = 4;
export const SPENDING_GRAPHS = "Spending Graphs";
export const SPENDING_OVERVIEW = `Spending Overview for ${getMonthString(
  currentMonth
)}`;
export const SPENDING_ANNUAL = "Annual Spending Trends Over the Years";
export const RECENT_EXPENSES_DEFAULT = "Start by adding expenses in the Expenses tab!";
export const SPENDING_GRAPHS_DEFAULT = "Currently, there is no expense data available for display.";

// LOGIN PAGE CONSTANTS
export const LOGIN_PAGE = "Log In"
export const LOGIN = "Login";
export const NAME = "Name";
export const EMAIL = "Email";
export const PASSWORD = "Password";
export const CONFIRM_PASSWORD = "Confirm Password";
export const CREATE_ACCOUNT = "Create account";
export const ENTER_EMAIL = "Enter your email";
export const ENTER_PASSWORD = "Enter your password";
export const FORGOT_PASSWORD = "Forgot your password?";
export const LOGIN_ERROR = "Sorry, we couldn't recognize that email or password combination. \
Please try again or reset your password if you've forgotten it.";
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const PASSWORD_ERROR_MSG =
  "The password must be at least 8 characters in length and must contain at least one numeric, one special character, and one lowercase letter or one uppercase letter.";
export const ACCOUNT_CREATED = "Account has been created!";
export const GO_TO_HOME = "Go to Home";
export const CREATE_AN_ACCOUNT = " Create an Account";
export const PASSWORD_RESET = "Password Reset Email Sent!";
export const BACK_TO_LOGIN = "Back to Login";
export const SEND = "Send";

// EXPENSE PAGE CONSTANTS
export const EXPENSES = "Expenses";
export const EXPENSES_DEFAULT = "No expenses to display. Add some with the \"Add new expenses\" button!";
export const ADD_NEW_EXPENSES = "Add new expenses";
export const MERCHANT = "merchant";
export const MERCHANT_NAME = "Merchant Name";
export const MERCHANT_REQUIRED = "Merchant is required";
export const AMOUNT = "Amount";
export const AMOUNT_REQUIRED = "Amount is required";
export const AMOUNT_FORMAT = "Invalid amount format. Please only enter 2 decimal points.";
export const ALL = "All";
export const MONTHLY = "Monthly";
export const DATE = "Date:";
export const CATEGORY = "category";
export const CATEGORY_REQUIRED = "Category is required";
export const SELECT_CATEGORY = "Select Category";
export const IS_RECURRING = "Is Recurring";
export const NOTES = "Notes";
export const CANCEL = "Cancel";
export const SUBMIT = "Submit";
export const BACK = "Back";
export const ERROR_ADDING_EXPENSE = "Error adding expense:";
export const ERROR_DELETING_EXPENSE = "Error deleting expense:";
export const NUMERIC_CHECK = /^\d+(\.\d{0,2})?$/;
export const CATEGORIES = [
  { value: "Misc", label: "Miscellaneous" },
  { value: "Food", label: "Food" },
  { value: "Clothing", label: "Clothing" },
  { value: "Subscription", label: "Subscription" },
  { value: "Housing", label: "Housing" },
  { value: "Utilities", label: "Utilities" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Insurance", label: "Insurance" },
  { value: "Entertainment", label: "Entertainment" },
];
export const ERROR_EXPENSE_FETCH = "Error fetching expenses";

// PROFILE PAGE CONSTANTS
export const PROFILE = "Profile";
export const USER_PROFILE_UPDATE_ERROR = "Error updating user profile:";
export const LOGOUT = "Log Out";
export const SAVE_CHANGES = "Save Changes";
