import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
    PieChart,
    BarChart3,
    TrendingUp,
    Calendar,
    Download,
} from "lucide-react";
import Navigation from "../components/layout/Navigation";

function Reports() {
    const categoryData = [
        { category: "Food", amount: 245.5, percentage: 35 },
        { category: "Transportation", amount: 180.2, percentage: 26 },
        { category: "Shopping", amount: 159.99, percentage: 23 },
        { category: "Entertainment", amount: 89.99, percentage: 13 },
        { category: "Others", amount: 24.32, percentage: 3 },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Reports & Analytics
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Insights into your spending patterns
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <select className="px-3 py-2 border border-border rounded-md bg-input">
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>Last 3 Months</option>
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                        </select>
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Spending by Category */}
                    <Card className="bg-gradient-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <PieChart className="w-5 h-5 mr-2 text-primary" />
                                Spending by Category
                            </CardTitle>
                            <CardDescription>
                                Your expenses broken down by category
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {categoryData.map((item, index) => (
                                    <div
                                        key={item.category}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{
                                                    backgroundColor: `hsl(${
                                                        index * 60 + 200
                                                    }, 70%, 50%)`,
                                                }}
                                            />
                                            <span className="font-medium">
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ${item.amount.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.percentage}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 h-40 bg-muted rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-muted-foreground">
                                        Pie Chart Visualization
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Trends */}
                    <Card className="bg-gradient-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart3 className="w-5 h-5 mr-2 text-secondary" />
                                Monthly Trends
                            </CardTitle>
                            <CardDescription>
                                Income vs Expenses over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-muted-foreground">
                                        Monthly Trends Chart
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Connect Supabase for data
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Key Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gradient-card">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Avg. Daily Spending
                                    </p>
                                    <p className="text-2xl font-bold">$23.45</p>
                                </div>
                                <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-destructive" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-card">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Largest Expense
                                    </p>
                                    <p className="text-2xl font-bold">
                                        $159.99
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-warning" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-card">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Savings Rate
                                    </p>
                                    <p className="text-2xl font-bold">68%</p>
                                </div>
                                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-success" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Spending Goals */}
                <Card className="bg-gradient-card">
                    <CardHeader>
                        <CardTitle>Monthly Budget Goals</CardTitle>
                        <CardDescription>
                            Track your progress against set budgets
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                        Food & Dining
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        $245 / $300
                                    </span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-gradient-primary h-2 rounded-full"
                                        style={{ width: "82%" }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                        Transportation
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        $180 / $200
                                    </span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-gradient-secondary h-2 rounded-full"
                                        style={{ width: "90%" }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                        Entertainment
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        $90 / $150
                                    </span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-gradient-accent h-2 rounded-full"
                                        style={{ width: "60%" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

export default Reports;
