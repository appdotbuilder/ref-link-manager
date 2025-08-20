import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
    ArrowLeftIcon,
    EditIcon,
    TrashIcon,
    ExternalLinkIcon,
    CopyIcon,
    ShareIcon,
    MousePointerClickIcon,
    CalendarIcon
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface ReferralLink {
    id: number;
    name: string;
    url: string;
    description: string | null;
    click_count: number;
    category: Category;
    created_at: string;
    updated_at: string;
}

interface Props {
    link: ReferralLink;
    [key: string]: unknown;
}

export default function ReferralLinksShow({ link }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${link.name}"?`)) {
            router.delete(route('referral-links.destroy', link.id));
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareUrl = (url: string, platform: string) => {
        const encodedUrl = encodeURIComponent(url);
        const text = encodeURIComponent(`Check out this link!`);
        
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            whatsapp: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`,
        };
        
        window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title={`${link.name} - Referral Link`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('referral-links.index')}>
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Links
                        </Link>
                    </Button>
                </div>

                {/* Link Details */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div 
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: link.category.color }}
                                    />
                                    <Link 
                                        href={route('categories.show', link.category.id)}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {link.category.name}
                                    </Link>
                                </div>
                                <CardTitle className="text-2xl mb-2">{link.name}</CardTitle>
                                {link.description && (
                                    <CardDescription className="text-base">{link.description}</CardDescription>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('referral-links.edit', link.id)}>
                                        <EditIcon className="w-4 h-4 mr-2" />
                                        Edit
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleDelete}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <TrashIcon className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* URL Section */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Referral URL</Label>
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                <a 
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline break-all flex-1"
                                >
                                    {link.url}
                                </a>
                                <ExternalLinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={() => copyToClipboard(link.url)}
                                className="flex-1 sm:flex-none"
                            >
                                <CopyIcon className="w-4 h-4 mr-2" />
                                Copy Link
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex-1 sm:flex-none">
                                        <ShareIcon className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => shareUrl(link.url, 'twitter')}>
                                        <span className="mr-2">🐦</span> Twitter
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => shareUrl(link.url, 'facebook')}>
                                        <span className="mr-2">📘</span> Facebook
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => shareUrl(link.url, 'linkedin')}>
                                        <span className="mr-2">💼</span> LinkedIn
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => shareUrl(link.url, 'whatsapp')}>
                                        <span className="mr-2">💬</span> WhatsApp
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics & Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MousePointerClickIcon className="w-5 h-5 mr-2" />
                                Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Total Clicks</span>
                                    <Badge variant="secondary" className="text-lg px-3 py-1">
                                        {link.click_count.toLocaleString()}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CalendarIcon className="w-5 h-5 mr-2" />
                                Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Category</span>
                                    <Link 
                                        href={route('categories.show', link.category.id)}
                                        className="flex items-center space-x-2 hover:underline"
                                    >
                                        <div 
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: link.category.color }}
                                        />
                                        <span>{link.category.name}</span>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Created</span>
                                    <span>{formatDate(link.created_at)}</span>
                                </div>
                                {link.updated_at !== link.created_at && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Last Updated</span>
                                        <span>{formatDate(link.updated_at)}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
}