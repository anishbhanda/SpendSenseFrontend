
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
    Legend,
    Tooltip
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
import axios from "axios";

const Income = () => {
    const [incomes, setIncomes] = useState([
        { id: 1, source: "Salary", amount: 3200.0, date: "2024-01-15" },
        { id: 2, source: "Freelance", amount: 850.0, date: "2024-01-12" },
        { id: 3, source: "Salary", amount: 100.0, date: "2024-01-20" },
        { id: 4, source: "Anish", amount: 100.0, date: "2024-01-20" },
        { id: 5, source: "Heladlo", amount: 1000.0, date: "2024-01-20" },
        { id: 6, source: "Hellsdo", amount: 1000.0, date: "2024-01-20" },
        { id: 7, source: "Headsdsllo", amount: 1000.0, date: "2024-01-20" },
        { id: 8, source: "daaas", amount: 1000.0, date: "2024-03-20" },
        { id: 9, source: "Hadello", amount: 1000.0, date: "2024-05-20" },
        { id: 10, source: "Hedallo", amount: 1000.0, date: "2024-10-20" },
        { id: 11, source: "Hedsdallo", amount: 123000.0, date: "2024-01-20" },
        { id: 12, source: "Hedasllo", amount: 1000.0, date: "2024-11-20" },
    ]);

    const [incomeData, setIncomeData] = useState({
        source: "",
        amount: "",
        date: ""
    })

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

    const aggregateIncomeData = (incomeList) => {
        const aggregatedMap = incomeList.reduce((acc, income) => {
            acc[income.source] = (acc[income.source] || 0) + income.amount;
            return acc;
        }, {});

        return Object.keys(aggregatedMap).map(source => ({
            name: source,
            value: aggregatedMap[source],
        }));
    };

    const aggregatedChartData = aggregateIncomeData(incomes);
    const COLORS = ['#00C49F', '#FFBB28', '#0088FE', '#FF8042']; // Green, Yellow, Blue, Orange
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            // Calculate percentage using the *aggregated* data's total sum
            const totalIncome = aggregatedChartData.reduce((sum, entry) => sum + entry.value, 0);
            const percentage = ((dataPoint.value / totalIncome) * 100).toFixed(1);

            // Format value as currency
            const formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                // Keep min fraction digits for cents
            }).format(dataPoint.value);

            return (
                <div style={{
                    backgroundColor: 'white',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}>
                    <p style={{ margin: 0, color: payload[0].color }}>
                        {`${dataPoint.name}: ${formattedValue}`}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                        {`(${percentage}%)`}
                    </p>
                </div>
            );
        }
        return null;
    };

    const IncomeBreakdownChart = () => {
        return (
            <div style={{ height: 350, width: '100%', padding: '20px', backgroundColor: 'transparent', borderRadius: '8px' }}>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Income Breakdown by Source</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                        <Pie
                            data={aggregatedChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {aggregatedChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{ right: 0, top: '10%' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };

    const onIncomeSubmit = async (data) => {
        console.log(data);
        try {
            await axios.post("http://localhost:5000/api/income", { source: data.source, amount: data.amount, date: data.date })

        } catch (error) {

        }
        const newIncome = {
            source: data.source,
            amount: parseFloat(data.amount),
            date: data.date,
        };
        setIncomes([...incomes, newIncome]);
        incomeForm.reset();
        setIsIncomeDialogOpen(false);
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gradient-card hover:shadow-lg transition-smooth">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Income Year To Date
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                                ${totalBalance.toFixed(2)}
                            </div>
                            <p className="text-xs text-success flex items-center mt-1">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +12.5% from last year
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-card hover:shadow-lg transition-smooth">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Expenses
                            </CardTitle>
                            <TrendingDown className="h-4 w-4 text-destructive" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                                ${totalExpense.toFixed(2)}
                            </div>
                            <p className="text-xs text-destructive flex items-center mt-1">
                                <TrendingDown className="w-3 h-3 mr-1" />
                                -3.1% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-card hover:shadow-lg transition-smooth">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                This Month
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-accent" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                                ${(totalIncome - totalExpense).toFixed(2)}
                            </div>
                            <p className="text-xs text-warning flex items-center mt-1">
                                15 days remaining
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-8">
                    <Card className="bg-gradient-card">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Income</CardTitle>
                                <CardDescription>
                                    Latest income entries
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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <Card className="lg:col-span-2 bg-gradient-card">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Income Overview</CardTitle>
                                <CardDescription>
                                    Your income pattern over time
                                </CardDescription>
                            </div>

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

                    <Card className="lg:col-span-2 bg-gradient-card">
                        <IncomeBreakdownChart />
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Income;
