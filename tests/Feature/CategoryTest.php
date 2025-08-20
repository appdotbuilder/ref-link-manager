<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_categories_index(): void
    {
        $user = User::factory()->create();
        Category::factory(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('categories.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('categories/index'));
    }

    public function test_user_can_create_category(): void
    {
        $user = User::factory()->create();

        $categoryData = [
            'name' => 'E-commerce',
            'description' => 'Online shopping referral links',
            'color' => '#3b82f6',
        ];

        $response = $this->actingAs($user)->post(route('categories.store'), $categoryData);

        $response->assertRedirect();
        $this->assertDatabaseHas('categories', [
            'name' => 'E-commerce',
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_update_their_category(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);

        $updateData = [
            'name' => 'Updated Category',
            'description' => 'Updated description',
            'color' => '#ef4444',
        ];

        $response = $this->actingAs($user)->put(route('categories.update', $category), $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Updated Category',
        ]);
    }

    public function test_user_can_delete_their_category(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('categories.destroy', $category));

        $response->assertRedirect();
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }

    public function test_user_cannot_access_other_users_category(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($user)->get(route('categories.show', $category));
        $response->assertForbidden();
    }

    public function test_category_name_is_required(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('categories.store'), [
            'description' => 'Test description',
            'color' => '#3b82f6',
        ]);

        $response->assertSessionHasErrors(['name']);
    }
}