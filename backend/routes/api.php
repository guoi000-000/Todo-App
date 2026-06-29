<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Routes pour les tâches
Route::get('/tasks', [TaskController::class, 'listerTaches']);
Route::post('/tasks', [TaskController::class, 'ajouterTache']);
Route::patch('/tasks/{task}', [TaskController::class, 'modifierStatut']);
Route::delete('/tasks/{task}', [TaskController::class, 'supprimerTache']);