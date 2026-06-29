<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Lister toutes les tâches.
     
    public function listerTaches()
    {
        return Task::all();
    }

    // Ajouter une tâche.
    // Validation : titre requis, minimum 3 caractères.
     
    public function ajouterTache(Request $request)
    {
        $donneesValidees = $request->validate([
            'title' => 'required|string|min:3',
        ]);

        return Task::create($donneesValidees);
    }

    // Modifier le statut d'une tâche (complété/non-complété).
     
    public function modifierStatut(Request $request, Task $task)
    {
        $task->is_completed = !$task->is_completed;
        $task->save();

        return $task;
    }

    // Supprimer une tâche.
     
    public function supprimerTache(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}