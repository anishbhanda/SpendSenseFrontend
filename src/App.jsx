import Toaster from "./components/ui/Toaster";
// import { Toaster, toast } from "./components/ui/Sonner";
import { TooltipProvider } from "./components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";
import Sonner from "./components/ui/Sonner";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginForm from "./LoginForm";

const queryClient = new QueryClient();

const App = () => (
    <>
   <AuthProvider> 
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/LoginForm" element={<LoginForm />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/transactions"
                            element={<Transactions />}
                        />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
                        <Route path="/expense" element={<Expense />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
        </AuthProvider>
    </>
);

export default App;
