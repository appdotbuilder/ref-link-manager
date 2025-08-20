import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    FolderIcon, 
    LinkIcon, 
    ShareIcon, 
    TrendingUpIcon,
    StarIcon,
    CheckIcon
} from 'lucide-react';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="LinkVault - Organize Your Referral Links" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Header */}
                <header className="border-b bg-white/70 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <LinkIcon className="w-4 h-4 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    LinkVault
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-700">Welcome, {auth.user.name}!</span>
                                        <Button asChild>
                                            <Link href="/dashboard">Go to Dashboard</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Button variant="ghost" asChild>
                                            <Link href="/login">Sign In</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/register">Get Started</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                            <StarIcon className="w-4 h-4 mr-2" />
                            Organize • Track • Share • Earn
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            🔗 Organize Your{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Referral Links
                            </span>
                            <br />
                            Like a Pro
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Create categories, manage referral links, track performance, and share across social media. 
                            Turn your referral game into a streamlined revenue machine! 💰
                        </p>
                        {!auth?.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild className="text-lg px-8 py-4">
                                    <Link href="/register">Start Organizing Free 🚀</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
                                    <Link href="/login">Sign In</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                            <CardHeader className="text-center pb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <FolderIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl">📁 Smart Categories</CardTitle>
                                <CardDescription>
                                    Organize links by niche, platform, or campaign type with custom colors and descriptions
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                            <CardHeader className="text-center pb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <TrendingUpIcon className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle className="text-xl">📊 Click Tracking</CardTitle>
                                <CardDescription>
                                    Monitor which links perform best with built-in analytics and click counters
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                            <CardHeader className="text-center pb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <ShareIcon className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle className="text-xl">📱 Social Sharing</CardTitle>
                                <CardDescription>
                                    One-click sharing to Facebook, Twitter, LinkedIn and more with custom messaging
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                ✨ Everything You Need to Scale Your Referrals
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Unlimited Categories & Links</h4>
                                        <p className="text-gray-600">Create as many categories and referral links as you need</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">One-Click Copy & Share</h4>
                                        <p className="text-gray-600">Instantly copy links or share them across social platforms</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Performance Dashboard</h4>
                                        <p className="text-gray-600">Track clicks, views, and top-performing links at a glance</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Custom Link Descriptions</h4>
                                        <p className="text-gray-600">Add notes and context to remember what each link is for</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border shadow-lg">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="font-medium">E-commerce</span>
                                    </div>
                                    <Badge variant="secondary">12 links</Badge>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="font-medium">SaaS Tools</span>
                                    </div>
                                    <Badge variant="secondary">8 links</Badge>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <span className="font-medium">Courses</span>
                                    </div>
                                    <Badge variant="secondary">5 links</Badge>
                                </div>
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total Clicks This Month</span>
                                        <span className="font-bold text-green-600">+1,234</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth?.user && (
                        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
                            <h3 className="text-3xl font-bold mb-4">
                                🎯 Ready to Maximize Your Referral Income?
                            </h3>
                            <p className="text-xl mb-8 opacity-90">
                                Join thousands of smart marketers who've organized their way to higher earnings
                            </p>
                            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
                                <Link href="/register">Create Free Account 🚀</Link>
                            </Button>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t bg-white/70 backdrop-blur-sm py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                        <p>&copy; 2024 LinkVault. Built with ❤️ for referral marketers worldwide.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}