import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
    FolderIcon, 
    PlusIcon,
    MoreHorizontalIcon,
    EditIcon,
    TrashIcon,
    EyeIcon
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    description: string | null;
    color: string;
    referral_links_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedCategories {
    data: Category[];
    links: PaginationLink[];
    current_page: number;
    per_page: number;
    total: number;
}

interface Props {
    categories: PaginatedCategories;
    [key: string]: unknown;
}

export default function CategoriesIndex({ categories }: Props) {
    const handleDelete = (category: Category) => {
        if (confirm(`Are you sure you want to delete "${category.name}"? This will also delete all referral links in this category.`)) {
            router.delete(route('categories.destroy', category.id));
        }
    };

    return (
        <AppShell>
            <Head title="Categories" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📁 Categories</h1>
                        <p className="text-gray-600">Organize your referral links into categories</p>
                    </div>
                    <Button asChild>
                        <Link href={route('categories.create')}>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            New Category
                        </Link>
                    </Button>
                </div>

                {/* Categories Grid */}
                {categories.data.length > 0 ? (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categories.data.map((category) => (
                                <Card key={category.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div 
                                                    className="w-4 h-4 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: category.color }}
                                                />
                                                <CardTitle className="text-lg truncate">{category.name}</CardTitle>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontalIcon className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('categories.show', category.id)}>
                                                            <EyeIcon className="w-4 h-4 mr-2" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('categories.edit', category.id)}>
                                                            <EditIcon className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDelete(category)}
                                                        className="text-red-600"
                                                    >
                                                        <TrashIcon className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        {category.description && (
                                            <CardDescription className="line-clamp-2">
                                                {category.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="secondary">
                                                {category.referral_links_count} {category.referral_links_count === 1 ? 'link' : 'links'}
                                            </Badge>
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={route('categories.show', category.id)}>
                                                    View Links
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {categories.links.length > 3 && (
                            <div className="flex justify-center">
                                <div className="flex space-x-1">
                                    {categories.links.map((link, index) => (
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
                        <FolderIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories yet</h3>
                        <p className="text-gray-600 mb-6">
                            Create your first category to start organizing your referral links
                        </p>
                        <Button asChild>
                            <Link href={route('categories.create')}>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Create Your First Category
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppShell>
    );
}