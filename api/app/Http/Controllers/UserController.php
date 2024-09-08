<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new User);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->crudControllerHelper->index($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $this->crudControllerHelper->show($user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        return $this->crudControllerHelper->update($request, $user);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, User $user, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $user, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->crudControllerHelper->destroy($user);
    }
}
