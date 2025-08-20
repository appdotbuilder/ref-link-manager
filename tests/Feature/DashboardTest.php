<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\ReferralLink;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_access_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('dashboard'));
    }

    public function test_dashboard_shows_correct_statistics(): void
    {
        $user = User::factory()->create();
        
        // Create categories and links for the user
        $categories = Category::factory(3)->create(['user_id' => $user->id]);
        foreach ($categories as $category) {
            ReferralLink::factory(2)->create([
                'user_id' => $user->id,
                'category_id' => $category->id,
                'click_count' => 10,
            ]);
        }

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->has('stats')
                ->where('stats.total_categories', 3)
                ->where('stats.total_links', 6)
                ->where('stats.total_clicks', 60)
        );
    }

    public function test_unauthenticated_user_cannot_access_dashboard(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }
}