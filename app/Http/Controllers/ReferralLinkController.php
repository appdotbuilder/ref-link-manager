<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReferralLinkRequest;
use App\Http\Requests\UpdateReferralLinkRequest;
use App\Models\Category;
use App\Models\ReferralLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReferralLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $links = ReferralLink::where('user_id', auth()->id())
            ->with('category')
            ->when($request->category_id, function ($query, $categoryId) {
                return $query->where('category_id', $categoryId);
            })
            ->latest()
            ->paginate(15);

        $categories = Category::where('user_id', auth()->id())
            ->select('id', 'name', 'color')
            ->get();
        
        return Inertia::render('referral-links/index', [
            'links' => $links,
            'categories' => $categories,
            'filters' => [
                'category_id' => $request->category_id
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $categories = Category::where('user_id', auth()->id())
            ->select('id', 'name', 'color')
            ->get();

        return Inertia::render('referral-links/create', [
            'categories' => $categories,
            'selectedCategoryId' => $request->category_id
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReferralLinkRequest $request)
    {
        // Verify category belongs to user
        $category = Category::where('id', $request->category_id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $link = ReferralLink::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('referral-links.show', $link)
            ->with('success', 'Referral link created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ReferralLink $referralLink)
    {
        if ($referralLink->user_id !== auth()->id()) {
            abort(403);
        }

        $referralLink->load('category');
        
        return Inertia::render('referral-links/show', [
            'link' => $referralLink
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReferralLink $referralLink)
    {
        if ($referralLink->user_id !== auth()->id()) {
            abort(403);
        }

        $categories = Category::where('user_id', auth()->id())
            ->select('id', 'name', 'color')
            ->get();

        return Inertia::render('referral-links/edit', [
            'link' => $referralLink,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReferralLinkRequest $request, ReferralLink $referralLink)
    {
        // Verify category belongs to user
        $category = Category::where('id', $request->category_id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $referralLink->update($request->validated());

        return redirect()->route('referral-links.show', $referralLink)
            ->with('success', 'Referral link updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReferralLink $referralLink)
    {
        if ($referralLink->user_id !== auth()->id()) {
            abort(403);
        }

        $referralLink->delete();

        return redirect()->route('referral-links.index')
            ->with('success', 'Referral link deleted successfully.');
    }
}