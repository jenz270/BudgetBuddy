export interface Expense {
    id: string;
    uid: string;
    merchant: string;
    amount: string;
    category: string;
    date: Date;
    notes?: string;
    isRecurring: boolean;
}