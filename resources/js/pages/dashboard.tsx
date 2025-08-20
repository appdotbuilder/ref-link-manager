import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    FolderIcon, 
    LinkIcon, 
    TrendingUpIcon,
    PlusIcon,
    MousePointerClickIcon
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    description: string | null;
    color: string;
    referral_links_count: number;
    created_at: string;
}

interface ReferralLink {
    id: number;
    name: string;
    url: string;
    description: string | null;
    click_count: number;
    category: {
        id: number;
        name: string;
        color: string;
    };
    created_at: string;
}

interface Stats {
    total_categories: number;
    total_links: number;
    total_clicks: number;
}

interface Props {
    stats: Stats;
    recentCategories: Category[];
    recentLinks: ReferralLink[];
    topLinks: ReferralLink[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentCategories, recentLinks, topLinks }: Props) {
    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📊 Dashboard</h1>
                        <p className="text-gray-600">Overview of your referral link performance</p>
                    </div>
                    <div className="flex gap-3">
                        <Button asChild>
                            <Link href={route('categories.create')}>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                New Category
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route('referral-links.create')}>
                                <LinkIcon className="w-4 h-4 mr-2" />
                                New Link
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                            <FolderIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_categories}</div>
                            <p className="text-xs text-muted-foreground">
                                Organized collections
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_links}</div>
                            <p className="text-xs text-muted-foreground">
                                Referral links created
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                            <MousePointerClickIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_clicks.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                All-time clicks
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Categories */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FolderIcon className="w-5 h-5 mr-2" />
                                Recent Categories
                            </CardTitle>
                            <CardDescription>
                                Your most recently created categories
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentCategories.length > 0 ? (
                                recentCategories.map((category) => (
                                    <div key={category.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div 
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: category.color }}
                                            />
                                            <Link 
                                                href={route('categories.show', category.id)}
                                                className="font-medium hover:underline"
                                            >
                                                {category.name}
                                            </Link>
                                        </div>
                                        <Badge variant="secondary">
                                            {category.referral_links_count} links
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <FolderIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p>No categories yet</p>
                                    <Button size="sm" className="mt-2" asChild>
                                        <Link href={route('categories.create')}>Create Your First Category</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <LinkIcon className="w-5 h-5 mr-2" />
                                Recent Links
                            </CardTitle>
                            <CardDescription>
                                Your most recently added referral links
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentLinks.length > 0 ? (
                                recentLinks.map((link) => (
                                    <div key={link.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                                            <div 
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: link.category.color }}
                                            />
                                            <div className="min-w-0 flex-1">
                                                <Link 
                                                    href={route('referral-links.show', link.id)}
                                                    className="font-medium hover:underline block truncate"
                                                >
                                                    {link.name}
                                                </Link>
                                                <p className="text-sm text-gray-500">{link.category.name}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline">
                                            {link.click_count} clicks
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <LinkIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p>No referral links yet</p>
                                    <Button size="sm" className="mt-2" asChild>
                                        <Link href={route('referral-links.create')}>Add Your First Link</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Top Performing Links */}
                {topLinks.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <TrendingUpIcon className="w-5 h-5 mr-2" />
                                Top Performing Links
                            </CardTitle>
                            <CardDescription>
                                Your most clicked referral links
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topLinks.map((link, index) => (
                                    <div key={link.id} className="flex items-center space-x-4">
                                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold">
                                            #{index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link 
                                                href={route('referral-links.show', link.id)}
                                                className="font-medium hover:underline block truncate"
                                            >
                                                {link.name}
                                            </Link>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <div 
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: link.category.color }}
                                                />
                                                <span className="text-sm text-gray-500">{link.category.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge variant="secondary">
                                                <MousePointerClickIcon className="w-3 h-3 mr-1" />
                                                {link.click_count.toLocaleString()}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}