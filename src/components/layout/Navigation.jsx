import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, CreditCard, PieChart, Settings, User } from "lucide-react";

const Navigation = () => {
    return (
        <nav className="bg-card border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">
                            ExpenseTracker
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/dashboard"
                            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            to="/transactions"
                            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                            <CreditCard className="w-4 h-4" />
                            <span>Transactions</span>
                        </Link>
                        <Link
                            to="/reports"
                            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                            <PieChart className="w-4 h-4" />
                            <span>Reports</span>
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-gradient-primary hover:bg-primary-hover">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
