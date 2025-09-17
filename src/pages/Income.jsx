import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/Tabs";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../components/ui/Chart";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
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
import {
    Plus,
    TrendingDown,
    TrendingUp,
    DollarSign,
    Calendar,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/Dialog";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navigation from "../components/layout/Navigation";

const Income = () => {
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

    const chartConfig = {
        income: { label: "Income", color: "hsl(var(--success))" },
        expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 bg-gradient-card">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Income Overview</CardTitle>
                                <CardDescription>
                                    Your income pattern over time
                                </CardDescription>
                            </div>
                            <Dialog
                                open={isIncomeDialogOpen}
                                onOpenChange={setIsIncomeDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-primary hover:bg-primary-hover">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Income
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add New Income
                                        </DialogTitle>
                                        <DialogDescription>
                                            Add a new income source to track
                                            your earnings
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...incomeForm}>
                                        <form
                                            onSubmit={incomeForm.handleSubmit(
                                                onIncomeSubmit
                                            )}
                                            className="space-y-4"
                                        >
                                            <FormField
                                                control={incomeForm.control}
                                                name="source"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Income Source
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="e.g., Salary, Freelance, Investment"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={incomeForm.control}
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
                                                control={incomeForm.control}
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
                                                Add Income
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
                                    <BarChart data={monthlyData}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="hsl(var(--muted-foreground))"
                                            opacity={0.3}
                                        />
                                        <XAxis
                                            dataKey="month"
                                            stroke="hsl(var(--muted-foreground))"
                                        />
                                        <YAxis stroke="hsl(var(--muted-foreground))" />
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                        <Bar
                                            dataKey="income"
                                            fill="hsl(var(--success))"
                                            radius={4}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Income List */}
                    <Card className="bg-gradient-card">
                        <CardHeader>
                            <CardTitle>Recent Income</CardTitle>
                            <CardDescription>
                                Latest income entries
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {incomes.slice(-5).map((income) => (
                                    <div
                                        key={income.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                    >
                                        <div>
                                            <p className="font-medium text-sm">
                                                {income.source}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {income.date}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm text-success">
                                                +$
                                                {income.amount.toFixed(2)}
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

export default Income;
