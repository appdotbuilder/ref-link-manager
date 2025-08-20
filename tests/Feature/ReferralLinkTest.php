<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\ReferralLink;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReferralLinkTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_referral_links_index(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);
        ReferralLink::factory(3)->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);

        $response = $this->actingAs($user)->get(route('referral-links.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('referral-links/index'));
    }

    public function test_user_can_create_referral_link(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);

        $linkData = [
            'name' => 'Amazon Affiliate',
            'url' => 'https://amazon.com/ref?tag=test123',
            'description' => 'Amazon referral link',
            'category_id' => $category->id,
        ];

        $response = $this->actingAs($user)->post(route('referral-links.store'), $linkData);

        $response->assertRedirect();
        $this->assertDatabaseHas('referral_links', [
            'name' => 'Amazon Affiliate',
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_update_their_referral_link(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);
        $link = ReferralLink::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);

        $updateData = [
            'name' => 'Updated Link',
            'url' => 'https://updated.com/ref?tag=updated',
            'description' => 'Updated description',
            'category_id' => $category->id,
        ];

        $response = $this->actingAs($user)->put(route('referral-links.update', $link), $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('referral_links', [
            'id' => $link->id,
            'name' => 'Updated Link',
        ]);
    }

    public function test_user_can_delete_their_referral_link(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);
        $link = ReferralLink::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);

        $response = $this->actingAs($user)->delete(route('referral-links.destroy', $link));

        $response->assertRedirect();
        $this->assertDatabaseMissing('referral_links', ['id' => $link->id]);
    }

    public function test_user_cannot_access_other_users_referral_link(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $otherUser->id]);
        $link = ReferralLink::factory()->create([
            'user_id' => $otherUser->id,
            'category_id' => $category->id,
        ]);

        $response = $this->actingAs($user)->get(route('referral-links.show', $link));
        $response->assertForbidden();
    }

    public function test_referral_link_validation_rules(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('referral-links.store'), []);

        $response->assertSessionHasErrors(['name', 'url', 'category_id']);
    }

    public function test_user_cannot_create_link_in_other_users_category(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $otherUser->id]);

        $linkData = [
            'name' => 'Test Link',
            'url' => 'https://example.com',
            'category_id' => $category->id,
        ];

        $response = $this->actingAs($user)->post(route('referral-links.store'), $linkData);

        $response->assertNotFound();
    }
}