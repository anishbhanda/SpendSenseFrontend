import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Plus, Search, Download } from "lucide-react";
import Navigation from "../components/layout/Navigation";

const Transactions = () => {
    const transactions = [
        {
            id: 1,
            description: "Grocery Shopping",
            amount: -85.5,
            category: "Food",
            date: "2024-01-15",
            type: "expense",
        },
        {
            id: 2,
            description: "Salary Deposit",
            amount: 3200,
            category: "Income",
            date: "2024-01-15",
            type: "income",
        },
        {
            id: 3,
            description: "Coffee Shop",
            amount: -12.75,
            category: "Food",
            date: "2024-01-14",
            type: "expense",
        },
        {
            id: 4,
            description: "Gas Station",
            amount: -45.2,
            category: "Transportation",
            date: "2024-01-14",
            type: "expense",
        },
        {
            id: 5,
            description: "Online Shopping",
            amount: -159.99,
            category: "Shopping",
            date: "2024-01-13",
            type: "expense",
        },
        {
            id: 6,
            description: "Freelance Project",
            amount: 850,
            category: "Income",
            date: "2024-01-12",
            type: "income",
        },
        {
            id: 7,
            description: "Restaurant",
            amount: -67.84,
            category: "Food",
            date: "2024-01-12",
            type: "expense",
        },
        {
            id: 8,
            description: "Subscription",
            amount: -9.99,
            category: "Entertainment",
            date: "2024-01-11",
            type: "expense",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Transactions
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Manage all your financial transactions
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Button className="bg-gradient-primary hover:bg-primary-hover">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Transaction
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-6 bg-gradient-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search transactions..."
                                    className="pl-10"
                                />
                            </div>
                            <select className="px-3 py-2 border border-border rounded-md bg-input">
                                <option>All Categories</option>
                                <option>Food</option>
                                <option>Transportation</option>
                                <option>Shopping</option>
                                <option>Entertainment</option>
                                <option>Income</option>
                            </select>
                            <select className="px-3 py-2 border border-border rounded-md bg-input">
                                <option>All Types</option>
                                <option>Income</option>
                                <option>Expense</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions List */}
                <Card className="bg-gradient-card">
                    <CardHeader>
                        <CardTitle>All Transactions</CardTitle>
                        <CardDescription>
                            Your complete transaction history
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                transaction.type === "income"
                                                    ? "bg-success/20 text-success"
                                                    : "bg-destructive/20 text-destructive"
                                            }`}
                                        >
                                            {transaction.type === "income"
                                                ? "+"
                                                : "-"}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {transaction.description}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {transaction.category} •{" "}
                                                {transaction.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`font-semibold ${
                                                transaction.amount > 0
                                                    ? "text-success"
                                                    : "text-destructive"
                                            }`}
                                        >
                                            {transaction.amount > 0 ? "+" : ""}$
                                            {Math.abs(
                                                transaction.amount
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6">
                            <Button variant="outline">
                                Load More Transactions
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Transactions;
