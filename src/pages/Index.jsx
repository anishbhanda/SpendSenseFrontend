import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import {
    BarChart3,
    CreditCard,
    PieChart,
    TrendingUp,
    Shield,
    Smartphone,
    ArrowRight,
    CheckCircle,
} from "lucide-react";

const Index = () => {
    const features = [
        {
            icon: BarChart3,
            title: "Smart Analytics",
            description:
                "Get detailed insights into your spending patterns with beautiful charts and reports.",
        },
        {
            icon: CreditCard,
            title: "Transaction Tracking",
            description:
                "Easily categorize and manage all your income and expenses in one place.",
        },
        {
            icon: PieChart,
            title: "Budget Management",
            description:
                "Set budgets for different categories and track your progress in real-time.",
        },
        {
            icon: Shield,
            title: "Bank-Level Security",
            description:
                "Your financial data is protected with enterprise-grade encryption.",
        },
        {
            icon: Smartphone,
            title: "Mobile Friendly",
            description:
                "Access your finances anywhere with our responsive web application.",
        },
        {
            icon: TrendingUp,
            title: "Financial Goals",
            description:
                "Set and track financial goals to achieve your dreams faster.",
        },
    ];

    const benefits = [
        "Track all your expenses in one place",
        "Beautiful charts and analytics",
        "Set budgets and financial goals",
        "Secure and private data handling",
        "Export data anytime",
        "Mobile-responsive design",
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                                <CreditCard className="w-8 h-8 text-primary-foreground" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Take Control of Your
                            <span className="bg-gradient-primary bg-clip-text text-transparent">
                                {" "}
                                Finances
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Track expenses, manage budgets, and gain insights
                            into your financial habits with our beautiful and
                            intuitive expense tracking application.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link to="/signup">
                                <Button
                                    size="lg"
                                    className="bg-gradient-primary hover:bg-primary-hover px-8 py-6 text-lg"
                                >
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/dashboard">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-6 text-lg"
                                >
                                    View Dashboard
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">
                                    $2M+
                                </div>
                                <div className="text-muted-foreground">
                                    Transactions Tracked
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-secondary">
                                    10K+
                                </div>
                                <div className="text-muted-foreground">
                                    Happy Users
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-accent">
                                    99.9%
                                </div>
                                <div className="text-muted-foreground">
                                    Uptime
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Everything You Need to Manage Your Money
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Powerful features designed to help you understand
                            and control your financial life.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="bg-gradient-card hover:shadow-lg transition-smooth group"
                            >
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Why Choose ExpenseTracker?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Join thousands of users who have taken control
                                of their finances with our comprehensive expense
                                tracking solution.
                            </p>

                            <div className="space-y-4 mb-8">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                                        <span className="text-foreground">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/signup">
                                <Button className="bg-gradient-secondary hover:bg-secondary-hover">
                                    Start Your Journey Today
                                </Button>
                            </Link>
                        </div>

                        <div className="relative">
                            <Card className="bg-gradient-card shadow-xl">
                                <CardHeader>
                                    <CardTitle>Dashboard Preview</CardTitle>
                                    <CardDescription>
                                        See your financial overview at a glance
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                                            <span>Total Balance</span>
                                            <span className="font-bold text-success">
                                                $2,847.23
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                                            <span>This Month</span>
                                            <span className="font-bold text-destructive">
                                                -$303.44
                                            </span>
                                        </div>
                                        <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded flex items-center justify-center">
                                            <BarChart3 className="w-12 h-12 text-muted-foreground" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Ready to Transform Your Financial Life?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Join ExpenseTracker today and start making smarter
                        financial decisions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button
                                size="lg"
                                className="bg-gradient-primary hover:bg-primary-hover px-8 py-6 text-lg"
                            >
                                Create Free Account
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-6 text-lg"
                            >
                                Sign In
                            </Button>
                        </Link>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4">
                        No credit card required • Free forever • Start in
                        seconds
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground">
                                ExpenseTracker
                            </span>
                        </div>

                        <div className="flex space-x-6 text-sm text-muted-foreground">
                            <Link
                                to="/privacy"
                                className="hover:text-foreground transition-smooth"
                            >
                                Privacy
                            </Link>
                            <Link
                                to="/terms"
                                className="hover:text-foreground transition-smooth"
                            >
                                Terms
                            </Link>
                            <Link
                                to="/support"
                                className="hover:text-foreground transition-smooth"
                            >
                                Support
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                        © 2024 ExpenseTracker. Built with ❤️ for better
                        financial management.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;
