<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ReferralLink
 *
 * @property int $id
 * @property string $name
 * @property string $url
 * @property string|null $description
 * @property int $click_count
 * @property array|null $social_shares
 * @property int $category_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink query()
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereClickCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereSocialShares($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReferralLink whereUserId($value)
 * @method static \Database\Factories\ReferralLinkFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ReferralLink extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'url',
        'description',
        'click_count',
        'social_shares',
        'category_id',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'click_count' => 'integer',
        'social_shares' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the category that owns the referral link.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the user that owns the referral link.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}