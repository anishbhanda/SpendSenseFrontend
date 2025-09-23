import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Switch } from "../components/ui/Switch";
import { Separator } from "../components/ui/Separator";
import {
    User,
    Bell,
    Shield,
    Palette,
    CreditCard,
    Download,
} from "lucide-react";
import Navigation from "../components/layout/Navigation";

function Settings() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                        Settings
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your account preferences and configurations
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <Card className="bg-gradient-card sticky top-8">
                            <CardContent className="p-4">
                                <nav className="space-y-2">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                    >
                                        <Bell className="w-4 h-4 mr-2" />
                                        Notifications
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                    >
                                        <Shield className="w-4 h-4 mr-2" />
                                        Security
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                    >
                                        <Palette className="w-4 h-4 mr-2" />
                                        Appearance
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                    >
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Categories
                                    </Button>
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        <Card className="bg-gradient-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="w-5 h-5 mr-2" />
                                    Profile Information
                                </CardTitle>
                                <CardDescription>
                                    Update your personal information and
                                    preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">
                                        Default Currency
                                    </Label>
                                    <select
                                        id="currency"
                                        className="w-full px-3 py-2 border border-border rounded-md bg-input"
                                    >
                                        <option>USD - US Dollar</option>
                                        <option>EUR - Euro</option>
                                        <option>GBP - British Pound</option>
                                        <option>CAD - Canadian Dollar</option>
                                    </select>
                                </div>
                                <Button className="bg-gradient-primary hover:bg-primary-hover">
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Notification Settings */}
                        <Card className="bg-gradient-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Bell className="w-5 h-5 mr-2" />
                                    Notifications
                                </CardTitle>
                                <CardDescription>
                                    Configure how you want to receive updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">
                                            Email Notifications
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive emails about your account
                                            activity
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">
                                            Budget Alerts
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Get notified when you exceed budget
                                            limits
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">
                                            Monthly Reports
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive monthly spending summaries
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Security Settings */}
                        <Card className="bg-gradient-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="w-5 h-5 mr-2" />
                                    Security
                                </CardTitle>
                                <CardDescription>
                                    Manage your account security settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">
                                        Current Password
                                    </Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">
                                        New Password
                                    </Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm new password"
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">
                                            Two-Factor Authentication
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Add an extra layer of security to
                                            your account
                                        </p>
                                    </div>
                                    <Button variant="outline">
                                        Enable 2FA
                                    </Button>
                                </div>

                                <Button variant="destructive">
                                    Update Password
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Data & Privacy */}
                        <Card className="bg-gradient-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Download className="w-5 h-5 mr-2" />
                                    Data & Privacy
                                </CardTitle>
                                <CardDescription>
                                    Manage your data and privacy preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">
                                            Export Data
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Download all your transaction data
                                        </p>
                                    </div>
                                    <Button variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">
                                            Delete Account
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Permanently delete your account and
                                            all data
                                        </p>
                                    </div>
                                    <Button variant="destructive">
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Settings;
