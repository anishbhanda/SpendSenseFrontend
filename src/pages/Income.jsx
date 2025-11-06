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
    Pencil,
    Trash2,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/Dialog";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Navigation from "../components/layout/Navigation";
import axios from "axios";

// --- Constants and Types (for clarity) ---
const COLORS = ['#00C49F', '#FFBB28', '#0088FE', '#FF8042'];

const Income = () => {
    // --- State Management ---
    const [incomes, setIncomes] = useState([
        { id: 1, source: "Salary", amount: 3200.0, date: "2024-01-15" },
        { id: 2, source: "Freelance", amount: 850.0, date: "2024-01-12" },
        { id: 3, source: "Salary", amount: 100.0, date: "2024-01-20" },
        { id: 4, source: "Anish", amount: 100.0, date: "2024-01-20" },
    ]);
    const [expenses] = useState([
        // ... (Your expenses state remains the same)
        { id: 1, description: "Grocery Shopping", amount: 85.5, category: "Food", date: "2024-01-15" },
        { id: 2, description: "Coffee Shop", amount: 12.75, category: "Food", date: "2024-01-14" },
        { id: 3, description: "Gas Station", amount: 45.2, category: "Transportation", date: "2024-01-14" },
        { id: 4, description: "Online Shopping", amount: 159.99, category: "Shopping", date: "2024-01-13" },
        { id: 5, description: "Restaurant", amount: 67.84, category: "Food", date: "2024-01-12" },
        { id: 6, description: "Subscription", amount: 9.99, category: "Entertainment", date: "2024-01-11" },
    ]);
    const [isIncomeAddDialogOpen, setIsIncomeAddDialogOpen] = useState(false);
    const [isIncomeEditDialogOpen, setIsIncomeEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingIncome, setEditingIncome] = useState(null); // Holds the income object being edited
    const [incomeToDelete, setIncomeToDelete] = useState(null); // Holds the ID of the income to delete

    // --- Form Setup ---
    const incomeAddForm = useForm({
        defaultValues: { source: "", amount: "", date: "" },
    });
    const incomeEditForm = useForm({
        defaultValues: { source: "", amount: "", date: "" },
    });

    // --- API Fetching ---
    const fetchIncomes = async () => {
        try {
            // **IMPORTANT**: Replace with your actual endpoint and add Auth header if needed
            // const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/income", {
                // headers: { Authorization: `Bearer ${token}` }
            });
            setIncomes(response.data.incomes || response.data); // Adjust based on your API response structure
            console.log("Incomes fetched:", response.data);
        } catch (error) {
            console.error("Error fetching incomes:", error);
            // Consider setting an error state here
        }
    }

    useEffect(() => {
        fetchIncomes();
    }, []);

    // --- Data Aggregation for Charts ---
    const aggregateIncomeData = (incomeList) => {
        const aggregatedMap = incomeList.reduce((acc, income) => {
            // Ensure amount is treated as a number
            const amount = typeof income.amount === 'string' ? parseFloat(income.amount) : income.amount;
            acc[income.source] = (acc[income.source] || 0) + amount;
            return acc;
        }, {});

        return Object.keys(aggregatedMap).map(source => ({
            name: source,
            value: aggregatedMap[source],
        }));
    };

    const aggregatedChartData = useMemo(() => aggregateIncomeData(incomes), [incomes]);

    // --- Calculations for Cards ---
    const totalIncome = useMemo(() => incomes.reduce((sum, income) => sum + income.amount, 0), [incomes]);
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalBalance = totalIncome - totalExpense;

    // --- Form Handlers (CRUD) ---

    // 1. ADD INCOME
    const onIncomeSubmit = async (data) => {
        try {
            // **IMPORTANT**: Replace with your actual endpoint and add Auth header if needed
            await axios.post("http://localhost:5000/api/income", {
                source: data.source,
                amount: parseFloat(data.amount),
                date: data.date
            }, {
                // headers: { Authorization: `Bearer ${token}` }
            });
            
            fetchIncomes(); // Refetch data
            incomeAddForm.reset();
            setIsIncomeAddDialogOpen(false);
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    // 2. EDIT INCOME (Setup)
    const handleEditClick = (income) => {
        setEditingIncome(income);
        incomeEditForm.reset({
            source: income.source,
            amount: income.amount.toFixed(2), // Set amount as string for input field
            date: income.date,
        });
        setIsIncomeEditDialogOpen(true);
    };

    // 3. UPDATE INCOME (API Call)
    const onIncomeEditSubmit = async (data) => {
        if (!editingIncome) return;

        try {
            // **IMPORTANT**: Replace with your actual endpoint and add Auth header if needed
            await axios.put(`http://localhost:5000/api/income/${editingIncome.id}`, {
                source: data.source,
                amount: parseFloat(data.amount),
                date: data.date
            }, {
                // headers: { Authorization: `Bearer ${token}` }
            });

            fetchIncomes(); // Refetch data
            setIsIncomeEditDialogOpen(false);
            setEditingIncome(null);
        } catch (error) {
            console.error(`Error updating income ID ${editingIncome.id}:`, error);
        }
    };

    // 4. DELETE INCOME (Setup)
    const handleDeleteClick = (id) => {
        setIncomeToDelete(id);
        setIsDeleteDialogOpen(true); // Open confirmation dialog
    };

    // 5. DELETE INCOME (API Call)
    const confirmDeleteIncome = async () => {
        if (!incomeToDelete) return;

        try {
            // **IMPORTANT**: Replace with your actual endpoint and add Auth header if needed
            await axios.delete(`http://localhost:5000/api/income/${incomeToDelete}`, {
                // headers: { Authorization: `Bearer ${token}` }
            });

            fetchIncomes(); // Refetch data
            setIsDeleteDialogOpen(false);
            setIncomeToDelete(null);
        } catch (error) {
            console.error(`Error deleting income ID ${incomeToDelete}:`, error);
        }
    };
    
    // --- Custom Tooltip for Pie Chart ---
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            const totalIncomeForCalc = aggregatedChartData.reduce((sum, entry) => sum + entry.value, 0);
            const percentage = totalIncomeForCalc > 0 ? ((dataPoint.value / totalIncomeForCalc) * 100).toFixed(1) : 0;

            const formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(dataPoint.value);

            return (
                <div style={{
                    backgroundColor: 'white',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <p style={{ margin: 0, color: payload[0].color, fontWeight: 'bold' }}>
                        {dataPoint.name}
                    </p>
                    <p style={{ margin: 0, color: '#333' }}>
                        {formattedValue}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                        ({percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    // --- Chart Components ---
    const IncomeBreakdownChart = () => (
        <div style={{ height: 350, width: '100%', padding: '20px 0', backgroundColor: 'transparent', borderRadius: '8px' }}>
            <h3 className="text-2xl font-semibold leading-none tracking-tight px-4 lg:px-0">Income Breakdown by Source</h3>
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
                        wrapperStyle={{ right: 0, top: '10%', paddingRight: '20px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );

    const monthlyData = [
        { month: "Jan", income: totalIncome, expenses: totalExpense },
        { month: "Dec", income: 2800, expenses: 280 },
        { month: "Nov", income: 3100, expenses: 320 },
        { month: "Oct", income: 2900, expenses: 290 },
    ];

    const chartConfig = {
        income: { label: "Income", color: "hsl(var(--success))" },
        expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
    };

    // --- Render ---
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* --- Summary Cards --- */}
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
                                ${totalIncome.toFixed(2)}
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
                                Net Balance (YTD)
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-accent" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
                                ${(totalBalance).toFixed(2)}
                            </div>
                            <p className="text-xs text-warning flex items-center mt-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date().getDate()}/{new Date().getDate() <= 15 ? 30 : 31} remaining
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* --- Charts and Income List --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
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
                                className="h-80 w-full"
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
                                        <ChartTooltip content={<ChartTooltipContent />} />
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
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Income</CardTitle>
                                <CardDescription>
                                    Latest income entries
                                </CardDescription>
                            </div>
                            <Dialog
                                open={isIncomeAddDialogOpen}
                                onOpenChange={setIsIncomeAddDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-primary hover:bg-primary-hover">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Income
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Income</DialogTitle>
                                        <DialogDescription>
                                            Add a new income source to track your earnings
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...incomeAddForm}>
                                        <form
                                            onSubmit={incomeAddForm.handleSubmit(onIncomeSubmit)}
                                            className="space-y-4"
                                        >
                                            {/* Source Field */}
                                            <FormField control={incomeAddForm.control} name="source" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Income Source</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., Salary, Freelance, Investment" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            {/* Amount Field */}
                                            <FormField control={incomeAddForm.control} name="amount" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Amount</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="0.00" step="0.01" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            {/* Date Field */}
                                            <FormField control={incomeAddForm.control} name="date" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <Button type="submit" className="w-full bg-gradient-primary hover:bg-primary-hover">
                                                Add Income
                                            </Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {incomes.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-4">No income entries yet.</p>
                                ) : (
                                    incomes.slice(-5).map((income) => (
                                        <div
                                            key={income.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium text-sm">{income.source}</p>
                                                <p className="text-xs text-muted-foreground">{income.date}</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <p className="font-semibold flex items-center text-sm text-success">
                                                    +${income.amount.toFixed(2)}
                                                </p>
                                                
                                                {/* EDIT Button */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 w-7 p-0 text-muted-foreground hover:bg-blue-100 hover:text-blue-500"
                                                    onClick={() => handleEditClick(income)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                
                                                {/* DELETE Button */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 w-7 p-0 text-muted-foreground hover:bg-red-100 hover:text-red-500"
                                                    onClick={() => handleDeleteClick(income.id)} // Open confirmation dialog
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* --- Income Trend Chart (Placeholder for now, shows breakdown) --- */}
                <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-gradient-card">
                        <CardHeader>
                            <CardTitle>Income Source Distribution</CardTitle>
                            <CardDescription>Visualizing where your income comes from.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center">
                            {aggregatedChartData.length > 0 ? (
                                <div style={{ height: 400, width: '100%' }}>
                                    <IncomeBreakdownChart />
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-10">No data to display in the distribution chart.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* --- EDIT INCOME DIALOG --- */}
            {editingIncome && (
                <Dialog open={isIncomeEditDialogOpen} onOpenChange={setIsIncomeEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Income: {editingIncome.source}</DialogTitle>
                            <DialogDescription>
                                Update the details for the selected income entry.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...incomeEditForm}>
                            <form
                                onSubmit={incomeEditForm.handleSubmit(onIncomeEditSubmit)}
                                className="space-y-4"
                            >
                                <FormField control={incomeEditForm.control} name="source" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Income Source</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Salary, Freelance, Investment" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={incomeEditForm.control} name="amount" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0.00" step="0.01" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={incomeEditForm.control} name="date" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="flex justify-end gap-2 pt-2">
                                    <Button variant="outline" type="button" onClick={() => setIsIncomeEditDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            )}

            {/* --- CONFIRM DELETE DIALOG --- */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this income entry? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <CardContent className="py-4">
                        {incomeToDelete && (
                            <div className="space-y-2 p-3 border rounded-md bg-red-50/50">
                                <p className="text-sm font-medium">
                                    Source: **{incomes.find(i => i.id === incomeToDelete)?.source || 'N/A'}**
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Amount: **${(incomes.find(i => i.id === incomeToDelete)?.amount || 0).toFixed(2)}**
                                </p>
                            </div>
                        )}
                    </CardContent>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDeleteIncome}>
                            Delete Permanently
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Income;