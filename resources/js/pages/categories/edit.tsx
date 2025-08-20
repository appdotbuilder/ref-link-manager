import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { InputError } from '@/components/input-error';
import { ArrowLeftIcon } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    description: string | null;
    color: string;
}

interface Props {
    category: Category;
    [key: string]: unknown;
}

export default function CategoriesEdit({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description || '',
        color: category.color,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('categories.update', category.id));
    };

    const colorOptions = [
        { value: '#3b82f6', label: 'Blue' },
        { value: '#ef4444', label: 'Red' },
        { value: '#10b981', label: 'Green' },
        { value: '#f59e0b', label: 'Yellow' },
        { value: '#8b5cf6', label: 'Purple' },
        { value: '#f97316', label: 'Orange' },
        { value: '#06b6d4', label: 'Cyan' },
        { value: '#84cc16', label: 'Lime' },
    ];

    return (
        <AppShell>
            <Head title={`Edit ${category.name}`} />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('categories.show', category.id)}>
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Category
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">✏️ Edit Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Category Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., E-commerce, SaaS Tools, Courses"
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Brief description of this category (optional)"
                                    rows={3}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="color">Category Color</Label>
                                <div className="flex flex-wrap gap-3">
                                    {colorOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setData('color', option.value)}
                                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                                                data.color === option.value 
                                                    ? 'border-gray-900 scale-110' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            style={{ backgroundColor: option.value }}
                                            title={option.label}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <span>Or enter custom color:</span>
                                    <Input
                                        type="color"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        className="w-16 h-8 p-1 border rounded"
                                    />
                                </div>
                                <InputError message={errors.color} />
                            </div>

                            <div className="flex items-center space-x-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Category'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('categories.show', category.id)}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}