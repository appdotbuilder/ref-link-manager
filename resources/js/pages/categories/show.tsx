import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
    ArrowLeftIcon,
    PlusIcon,
    MoreHorizontalIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    ExternalLinkIcon,
    CopyIcon,
    ShareIcon
} from 'lucide-react';

interface ReferralLink {
    id: number;
    name: string;
    url: string;
    description: string | null;
    click_count: number;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
    description: string | null;
    color: string;
    referral_links: ReferralLink[];
    created_at: string;
}

interface Props {
    category: Category;
    [key: string]: unknown;
}

export default function CategoriesShow({ category }: Props) {
    const handleDeleteCategory = () => {
        if (confirm(`Are you sure you want to delete "${category.name}"? This will also delete all referral links in this category.`)) {
            router.delete(route('categories.destroy', category.id));
        }
    };

    const handleDeleteLink = (link: ReferralLink) => {
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

    return (
        <AppShell>
            <Head title={`${category.name} - Category`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('categories.index')}>
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Categories
                        </Link>
                    </Button>
                </div>

                {/* Category Info */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div 
                                    className="w-6 h-6 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                />
                                <div>
                                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                                    {category.description && (
                                        <CardDescription className="mt-1">{category.description}</CardDescription>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('categories.edit', category.id)}>
                                        <EditIcon className="w-4 h-4 mr-2" />
                                        Edit
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleDeleteCategory}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <TrashIcon className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary">
                                {category.referral_links.length} {category.referral_links.length === 1 ? 'link' : 'links'}
                            </Badge>
                            <Button asChild>
                                <Link href={route('referral-links.create', { category_id: category.id })}>
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    Add Link
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Referral Links */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">🔗 Referral Links</h2>
                    
                    {category.referral_links.length > 0 ? (
                        <div className="grid gap-4">
                            {category.referral_links.map((link) => (
                                <Card key={link.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <CardTitle className="text-lg truncate">{link.name}</CardTitle>
                                                {link.description && (
                                                    <CardDescription className="mt-1">{link.description}</CardDescription>
                                                )}
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <a 
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm truncate max-w-md"
                                                    >
                                                        {link.url}
                                                    </a>
                                                    <ExternalLinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontalIcon className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('referral-links.show', link.id)}>
                                                            <EyeIcon className="w-4 h-4 mr-2" />
                                                            View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('referral-links.edit', link.id)}>
                                                            <EditIcon className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDeleteLink(link)}
                                                        className="text-red-600"
                                                    >
                                                        <TrashIcon className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline">
                                                {link.click_count} clicks
                                            </Badge>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => copyToClipboard(link.url)}
                                                >
                                                    <CopyIcon className="w-4 h-4 mr-2" />
                                                    Copy
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="sm" variant="outline">
                                                            <ShareIcon className="w-4 h-4 mr-2" />
                                                            Share
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem onClick={() => shareUrl(link.url, 'twitter')}>
                                                            Twitter
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => shareUrl(link.url, 'facebook')}>
                                                            Facebook
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => shareUrl(link.url, 'linkedin')}>
                                                            LinkedIn
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => shareUrl(link.url, 'whatsapp')}>
                                                            WhatsApp
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="text-center py-12">
                                <PlusIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No links yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Add your first referral link to this category
                                </p>
                                <Button asChild>
                                    <Link href={route('referral-links.create', { category_id: category.id })}>
                                        <PlusIcon className="w-4 h-4 mr-2" />
                                        Add Your First Link
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppShell>
    );
}