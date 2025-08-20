import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
    LinkIcon, 
    PlusIcon,
    MoreHorizontalIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    ExternalLinkIcon,
    CopyIcon,
    ShareIcon,
    FilterIcon
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
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedLinks {
    data: ReferralLink[];
    links: PaginationLink[];
    current_page: number;
    per_page: number;
    total: number;
}

interface Props {
    links: PaginatedLinks;
    categories: Category[];
    filters: {
        category_id?: string;
    };
    [key: string]: unknown;
}

export default function ReferralLinksIndex({ links, categories, filters }: Props) {
    const handleDelete = (link: ReferralLink) => {
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

    const handleCategoryFilter = (categoryId: string) => {
        const url = new URL(window.location.href);
        if (categoryId === 'all') {
            url.searchParams.delete('category_id');
        } else {
            url.searchParams.set('category_id', categoryId);
        }
        router.get(url.pathname + url.search);
    };

    return (
        <AppShell>
            <Head title="Referral Links" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🔗 Referral Links</h1>
                        <p className="text-gray-600">Manage all your referral links</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* Category Filter */}
                        <div className="flex items-center space-x-2">
                            <FilterIcon className="w-4 h-4 text-gray-500" />
                            <Select value={filters.category_id || 'all'} onValueChange={handleCategoryFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            <div className="flex items-center space-x-2">
                                                <div 
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: category.color }}
                                                />
                                                <span>{category.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button asChild>
                            <Link href={route('referral-links.create')}>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                New Link
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Links Grid */}
                {links.data.length > 0 ? (
                    <>
                        <div className="grid gap-4">
                            {links.data.map((link) => (
                                <Card key={link.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div 
                                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                                        style={{ backgroundColor: link.category.color }}
                                                    />
                                                    <Badge variant="secondary" className="text-xs">
                                                        {link.category.name}
                                                    </Badge>
                                                </div>
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
                                                        onClick={() => handleDelete(link)}
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
                                                    <CopyIcon className="w-4 h-4 mr-1" />
                                                    Copy
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="sm" variant="outline">
                                                            <ShareIcon className="w-4 h-4 mr-1" />
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

                        {/* Pagination */}
                        {links.links.length > 3 && (
                            <div className="flex justify-center">
                                <div className="flex space-x-1">
                                    {links.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => {
                                                if (link.url) {
                                                    router.get(link.url);
                                                }
                                            }}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <LinkIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {filters.category_id ? 'No links in this category' : 'No referral links yet'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filters.category_id 
                                ? 'Try selecting a different category or create a new link'
                                : 'Create your first referral link to get started'
                            }
                        </p>
                        <Button asChild>
                            <Link href={route('referral-links.create')}>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Create Your First Link
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppShell>
    );
}