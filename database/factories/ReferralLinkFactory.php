<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\ReferralLink;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReferralLink>
 */
class ReferralLinkFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ReferralLink>
     */
    protected $model = ReferralLink::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $linkNames = [
            'Amazon Prime Affiliate',
            'Shopify Partner Link',
            'Udemy Course Referral',
            'Bluehost Hosting Deal',
            'Mailchimp Referral',
            'Canva Pro Invitation',
            'PayPal Business Link',
            'MyFitnessPal Premium',
            'Booking.com Partnership',
            'Steam Game Referral',
            'Audible Membership',
            'Nike Affiliate Link'
        ];

        $descriptions = [
            'Get exclusive discounts on premium membership',
            'Start your online store with special pricing', 
            'Learn new skills with discounted courses',
            'Reliable web hosting with bonus features',
            'Email marketing made easy with free credits',
            'Design like a pro with premium templates',
            'Simplified payment processing for businesses',
            'Track your fitness goals with premium features',
            'Save on your next travel booking',
            'Discover amazing games with friends',
            'Listen to thousands of audiobooks',
            'Get the latest athletic gear with discounts'
        ];

        $domains = [
            'amazon.com',
            'shopify.com',
            'udemy.com',
            'bluehost.com',
            'mailchimp.com',
            'canva.com',
            'paypal.com',
            'myfitnesspal.com',
            'booking.com',
            'steampowered.com',
            'audible.com',
            'nike.com'
        ];

        $domain = $this->faker->randomElement($domains);
        $refCode = $this->faker->uuid();
        
        return [
            'name' => $this->faker->randomElement($linkNames),
            'url' => "https://{$domain}/referral?ref={$refCode}",
            'description' => $this->faker->randomElement($descriptions),
            'click_count' => $this->faker->numberBetween(0, 500),
            'social_shares' => [
                'twitter' => $this->faker->numberBetween(0, 50),
                'facebook' => $this->faker->numberBetween(0, 30),
                'linkedin' => $this->faker->numberBetween(0, 20),
                'whatsapp' => $this->faker->numberBetween(0, 40),
            ],
            'category_id' => Category::factory(),
            'user_id' => User::factory(),
        ];
    }
}