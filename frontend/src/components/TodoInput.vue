<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()
const titre = ref('')
const erreurSaisie = ref('')

// Ajouter une tâche
const ajouterUneTache = async () => {
  erreurSaisie.value = ''
  
  if (titre.value.trim().length < 3) {
    erreurSaisie.value = 'Le titre doit contenir au moins 3 caractères'
    return
  }
  
  await store.ajouterTache(titre.value.trim())
  titre.value = ''
}
</script>

<template>
  <form @submit.prevent="ajouterUneTache" class="flex gap-2 mb-4">
    <input
      v-model="titre"
      type="text"
      placeholder="Nouvelle tâche..."
      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Ajouter
    </button>
  </form>
  
  <p v-if="erreurSaisie" class="text-red-500 text-sm">{{ erreurSaisie }}</p>
</template>