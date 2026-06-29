<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TodoItem from './TodoItem.vue'

const store = useTaskStore()
const titre = ref('')
const erreurSaisie = ref('')

const ajouterUneTache = async () => {
  erreurSaisie.value = ''
  
  if (titre.value.trim().length < 3) {
    erreurSaisie.value = 'Le titre doit contenir au moins 3 caractères'
    return
  }
  
  await store.ajouterTache(titre.value.trim())
  titre.value = ''
}

onMounted(() => store.chargerTaches())
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
    <!-- Titre -->
    <div class="flex items-center justify-center gap-3 mb-6">
      <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <h1 class="text-2xl font-bold">Gestionnaire de tâches dynamique</h1>
      <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
    </div>

    <!-- Chargement -->
    <div v-if="store.isLoading" class="text-center py-4">
      <span class="text-gray-500">Chargement...</span>
    </div>

    <div v-else class="space-y-4">
      <!-- Ligne input + filtres -->
      <div class="flex gap-3">
        <input
          v-model="titre"
          type="text"
          placeholder="Saisissez une tâche..."
          @keyup.enter="ajouterUneTache"
          class="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-200 outline-none"
        />
        
        <!-- Filtres à droite -->
        <div class="flex gap-2 text-sm">
          <button
            @click="store.setFiltre('toutes')"
            :class="[
              'px-3 py-1 rounded border',
              store.filtre === 'toutes' ? 'bg-gray-800 text-white' : 'border-gray-400'
            ]"
          >
            Toutes ({{ store.tasks.length }})
          </button>
          <button
            @click="store.setFiltre('enCours')"
            :class="[
              'px-3 py-1 rounded border',
              store.filtre === 'enCours' ? 'bg-gray-800 text-white' : 'border-gray-400'
            ]"
          >
            À faire ({{ store.tachesRestantes }})
          </button>
          <button
            @click="store.setFiltre('terminees')"
            :class="[
              'px-3 py-1 rounded border',
              store.filtre === 'terminees' ? 'bg-gray-800 text-white' : 'border-gray-400'
            ]"
          >
            Terminées ({{ store.tasks.filter(t => t.is_completed).length }})
          </button>
        </div>
      </div>

      <!-- Bouton + stats -->
      <div class="flex items-start gap-8">
        <div>
          <button
            @click="ajouterUneTache"
            class="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            Ajouter
          </button>
          
          <span class="block text-xs text-gray-500 mt-1">Caractères minimum : 3</span>
        </div>

        <!-- Stats -->
        <div class="flex items-start gap-2 pt-1 flex-1">
          <div class="flex flex-col items-center">
            <svg class="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14l-7 7-7-7z"/>
            </svg>
            <div class="w-px h-8 bg-blue-500"></div>
          </div>
          
          <div class="pt-1">
            <p class="text-blue-600 font-medium text-sm">{{ store.tachesRestantes }} tâche(s) restantes</p>
            <div class="mt-1 bg-gray-200 rounded-full h-2 w-36">
              <div 
                class="bg-blue-500 h-2 rounded-full transition-all" 
                :style="{ width: store.tasks.length > 0 ? (store.tachesRestantes / store.tasks.length * 100) + '%' : '0%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500">{{ store.tasks.length > 0 ? Math.round((store.tachesRestantes / store.tasks.length) * 100) : 0 }}% restant</p>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <p v-if="erreurSaisie" class="text-red-500 text-sm">{{ erreurSaisie }}</p>
      <p v-if="store.erreur" class="text-red-500 text-sm">{{ store.erreur }}</p>
    </div>

    <!-- Liste des tâches -->
    <ul v-if="store.tachesFiltrees.length" class="mt-6 space-y-2 divide-y divide-gray-100">
      <TodoItem
        v-for="task in store.tachesFiltrees"
        :key="task.id"
        :task="task"
        @toggle="store.basculerTache"
        @supprimer="store.supprimerTache"
      />
    </ul>

    <p v-else-if="!store.isLoading && !store.erreur && !erreurSaisie" class="mt-6 text-center text-gray-500">
      Aucune tâche
    </p>
  </div>
</template>