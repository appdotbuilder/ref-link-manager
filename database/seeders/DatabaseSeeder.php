<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\ReferralLink;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a demo user
        $demoUser = User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
        ]);

        // Create categories for the demo user
        $categories = Category::factory(8)->create([
            'user_id' => $demoUser->id,
        ]);

        // Create referral links for each category
        foreach ($categories as $category) {
            ReferralLink::factory(random_int(3, 8))->create([
                'category_id' => $category->id,
                'user_id' => $demoUser->id,
            ]);
        }

        // Create additional test users with their own data
        $users = User::factory(5)->create();
        
        foreach ($users as $user) {
            $userCategories = Category::factory(random_int(3, 6))->create([
                'user_id' => $user->id,
            ]);

            foreach ($userCategories as $category) {
                ReferralLink::factory(random_int(2, 5))->create([
                    'category_id' => $category->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}