<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Category>
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'E-commerce',
            'SaaS Tools', 
            'Online Courses',
            'Web Hosting',
            'Marketing Tools',
            'Design Software',
            'Financial Services',
            'Health & Fitness',
            'Travel & Tourism',
            'Gaming',
            'Books & Media',
            'Fashion & Beauty'
        ];

        $colors = [
            '#3b82f6', // blue
            '#ef4444', // red
            '#10b981', // green
            '#f59e0b', // yellow
            '#8b5cf6', // purple
            '#f97316', // orange
            '#06b6d4', // cyan
            '#84cc16', // lime
        ];

        $descriptions = [
            'Links for online shopping and e-commerce platforms',
            'Software as a Service tools and applications',
            'Educational courses and learning platforms',
            'Web hosting and domain services',
            'Marketing and advertising tools',
            'Design and creative software',
            'Banking and financial services',
            'Health, fitness and wellness products',
            'Travel booking and tourism services',
            'Gaming platforms and services',
            'Books, media and entertainment',
            'Fashion, beauty and lifestyle products'
        ];

        $name = $this->faker->randomElement($categories);
        
        return [
            'name' => $name,
            'description' => $this->faker->randomElement($descriptions),
            'color' => $this->faker->randomElement($colors),
            'user_id' => User::factory(),
        ];
    }
}