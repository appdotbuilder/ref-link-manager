import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputError } from '@/components/input-error';
import { ArrowLeftIcon } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Props {
    categories: Category[];
    selectedCategoryId?: string;
    [key: string]: unknown;
}

export default function ReferralLinksCreate({ categories, selectedCategoryId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        url: '',
        description: '',
        category_id: selectedCategoryId || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('referral-links.store'));
    };

    return (
        <AppShell>
            <Head title="Create Referral Link" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('referral-links.index')}>
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Links
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">🔗 Create New Referral Link</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Link Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., Amazon Prime Referral, Shopify Affiliate"
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="url">Referral URL *</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    placeholder="https://example.com/referral?ref=your-code"
                                    className={errors.url ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.url} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category_id">Category *</Label>
                                <Select 
                                    value={data.category_id} 
                                    onValueChange={(value) => setData('category_id', value)}
                                >
                                    <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                <InputError message={errors.category_id} />
                                {categories.length === 0 && (
                                    <p className="text-sm text-gray-600">
                                        <Link href={route('categories.create')} className="text-blue-600 hover:underline">
                                            Create a category first
                                        </Link>
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Brief description or notes about this referral link (optional)"
                                    rows={3}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex items-center space-x-4 pt-4">
                                <Button type="submit" disabled={processing || categories.length === 0}>
                                    {processing ? 'Creating...' : 'Create Link'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('referral-links.index')}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}