<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all(), Response::HTTP_OK);
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json($user, Response::HTTP_CREATED);
    }

    public function show(User $user)
    {
        return response()->json($user, Response::HTTP_OK);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return response()->json($user, Response::HTTP_OK);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
