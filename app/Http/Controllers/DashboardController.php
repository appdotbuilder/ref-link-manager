<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ReferralLink;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $userId = auth()->id();

        $stats = [
            'total_categories' => Category::where('user_id', $userId)->count(),
            'total_links' => ReferralLink::where('user_id', $userId)->count(),
            'total_clicks' => ReferralLink::where('user_id', $userId)->sum('click_count'),
        ];

        $recentCategories = Category::where('user_id', $userId)
            ->withCount('referralLinks')
            ->latest()
            ->limit(6)
            ->get();

        $recentLinks = ReferralLink::where('user_id', $userId)
            ->with('category')
            ->latest()
            ->limit(5)
            ->get();

        $topLinks = ReferralLink::where('user_id', $userId)
            ->with('category')
            ->orderBy('click_count', 'desc')
            ->limit(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentCategories' => $recentCategories,
            'recentLinks' => $recentLinks,
            'topLinks' => $topLinks,
        ]);
    }
}