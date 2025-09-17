import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../components/ui/Chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/Select";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/Form";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/Dialog";

import Navigation from "../components/layout/Navigation";

const Expense = () => {
    const [incomes, setIncomes] = useState([
        { id: 1, source: "Salary", amount: 3200.0, date: "2024-01-15" },
        { id: 2, source: "Freelance", amount: 850.0, date: "2024-01-12" },
    ]);

    const [expenses, setExpenses] = useState([
        {
            id: 1,
            description: "Grocery Shopping",
            amount: 85.5,
            category: "Food",
            date: "2024-01-15",
        },
        {
            id: 2,
            description: "Coffee Shop",
            amount: 12.75,
            category: "Food",
            date: "2024-01-14",
        },
        {
            id: 3,
            description: "Gas Station",
            amount: 45.2,
            category: "Transportation",
            date: "2024-01-14",
        },
        {
            id: 4,
            description: "Online Shopping",
            amount: 159.99,
            category: "Shopping",
            date: "2024-01-13",
        },
        {
            id: 5,
            description: "Restaurant",
            amount: 67.84,
            category: "Food",
            date: "2024-01-12",
        },
        {
            id: 6,
            description: "Subscription",
            amount: 9.99,
            category: "Entertainment",
            date: "2024-01-11",
        },
    ]);
    const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
    const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

    const incomeForm = useForm({
        defaultValues: { source: "", amount: "", date: "" },
    });

    const expenseForm = useForm({
        defaultValues: { description: "", category: "", amount: "", date: "" },
    });

    const onIncomeSubmit = (data) => {
        const newIncome = {
            id: incomes.length + 1,
            source: data.source,
            amount: parseFloat(data.amount),
            date: data.date,
        };
        setIncomes([...incomes, newIncome]);
        incomeForm.reset();
        setIsIncomeDialogOpen(false);
    };

    const onExpenseSubmit = (data) => {
        const newExpense = {
            id: expenses.length + 1,
            description: data.description,
            category: data.category,
            amount: parseFloat(data.amount),
            date: data.date,
        };
        setExpenses([...expenses, newExpense]);
        expenseForm.reset();
        setIsExpenseDialogOpen(false);
    };

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );
    const totalBalance = totalIncome - totalExpense;

    const monthlyData = [
        { month: "Jan", income: totalIncome, expenses: totalExpense },
        { month: "Dec", income: 2800, expenses: 280 },
        { month: "Nov", income: 3100, expenses: 320 },
        { month: "Oct", income: 2900, expenses: 290 },
    ];

    const expenseByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const categoryData = Object.entries(expenseByCategory).map(
        ([category, amount]) => ({
            category,
            amount,
        })
    );

    const COLORS = [
        "hsl(var(--primary))",
        "hsl(var(--secondary))",
        "hsl(var(--accent))",
        "hsl(var(--warning))",
        "hsl(var(--success))",
    ];

    const chartConfig = {
        income: { label: "Income", color: "hsl(var(--success))" },
        expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Expense Chart */}
                    <Card className="lg:col-span-2 bg-gradient-card">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Expense Overview</CardTitle>
                                <CardDescription>
                                    Your spending breakdown by category
                                </CardDescription>
                            </div>
                            <Dialog
                                open={isExpenseDialogOpen}
                                onOpenChange={setIsExpenseDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-primary hover:bg-primary-hover">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Expense
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add New Expense
                                        </DialogTitle>
                                        <DialogDescription>
                                            Record a new expense transaction
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...expenseForm}>
                                        <form
                                            onSubmit={expenseForm.handleSubmit(
                                                onExpenseSubmit
                                            )}
                                            className="space-y-4"
                                        >
                                            <FormField
                                                control={expenseForm.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Description
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="e.g., Grocery Shopping"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={expenseForm.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Category
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Food">
                                                                    Food
                                                                </SelectItem>
                                                                <SelectItem value="Transportation">
                                                                    Transportation
                                                                </SelectItem>
                                                                <SelectItem value="Shopping">
                                                                    Shopping
                                                                </SelectItem>
                                                                <SelectItem value="Entertainment">
                                                                    Entertainment
                                                                </SelectItem>
                                                                <SelectItem value="Utilities">
                                                                    Utilities
                                                                </SelectItem>
                                                                <SelectItem value="Healthcare">
                                                                    Healthcare
                                                                </SelectItem>
                                                                <SelectItem value="Other">
                                                                    Other
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={expenseForm.control}
                                                name="amount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Amount
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="0.00"
                                                                step="0.01"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={expenseForm.control}
                                                name="date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Date
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="date"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-primary hover:bg-primary-hover"
                                            >
                                                Add Expense
                                            </Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={chartConfig}
                                className="h-80"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            dataKey="amount"
                                            nameKey="category"
                                        >
                                            {categoryData.map((_, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Expense List */}
                    <Card className="bg-gradient-card">
                        <CardHeader>
                            <CardTitle>Recent Expenses</CardTitle>
                            <CardDescription>
                                Latest expense entries
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {expenses.slice(-5).map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                    >
                                        <div>
                                            <p className="font-medium text-sm">
                                                {expense.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {expense.category} •{" "}
                                                {expense.date}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm text-destructive">
                                                -$
                                                {expense.amount.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Expense;
