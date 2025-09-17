import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import { CreditCard, Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Password reset logic will go here when Supabase is connected
        console.log("Password reset request for:", email);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-gradient-card shadow-lg">
                    <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <CardTitle className="text-2xl font-bold">
                            Check Your Email
                        </CardTitle>
                        <CardDescription>
                            We've sent a password reset link to {email}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Click the link in the email to reset your password.
                            If you don't see the email, check your spam folder.
                        </p>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            onClick={() => setIsSubmitted(false)}
                            variant="outline"
                            className="w-full"
                        >
                            Try Different Email
                        </Button>

                        <Link to="/login" className="w-full">
                            <Button variant="ghost" className="w-full">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Login
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-gradient-card shadow-lg">
                <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        Forgot Password?
                    </CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you a link to
                        reset your password
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-accent hover:bg-accent"
                        >
                            Send Reset Link
                        </Button>

                        <Link to="/login" className="w-full">
                            <Button variant="ghost" className="w-full">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Login
                            </Button>
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ForgotPassword;
