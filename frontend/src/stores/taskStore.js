import { defineStore } from 'pinia'
import axios from 'axios'

// Configuration de base pour l'API Laravel
axios.defaults.baseURL = 'http://localhost:8000/api'

// Store pour les tâches
export const useTaskStore = defineStore('tasks', {
  // État
  state: () => ({
    tasks: [],
    filtre: 'toutes',
    isLoading: false,
    erreur: null
  }),

  // calcul
  getters: {
    // Compteur de tâches non terminées
    tachesRestantes: (state) => {
      return state.tasks.filter(t => !t.is_completed).length
    },

    // Tâches filtrées selon le filtre sélectionné
    tachesFiltrees: (state) => {
      if (state.filtre === 'terminees') {
        return state.tasks.filter(t => t.is_completed)
      }
      if (state.filtre === 'enCours') {
        return state.tasks.filter(t => !t.is_completed)
      }
      return state.tasks
    }
  },

  // Actions (méthodes pour modifier l'état)
  actions: {
    // Charger toutes les tâches
    async chargerTaches() {
      this.isLoading = true
      this.erreur = null
      try {
        const response = await axios.get('/tasks')
        this.tasks = response.data
      } catch (e) {
        this.erreur = 'Erreur lors du chargement'
      } finally {
        this.isLoading = false
      }
    },

    // Ajouter une nouvelle tâche
    async ajouterTache(titre) {
      this.isLoading = true
      this.erreur = null
      try {
        const response = await axios.post('/tasks', { title: titre })
        this.tasks.push(response.data)
      } catch (e) {
        this.erreur = e.response?.data?.message || 'Erreur lors de l\'ajout'
      } finally {
        this.isLoading = false
      }
    },

    // Inverser le statut d'une tâche
    async basculerTache(task) {
      try {
        const response = await axios.patch(`/tasks/${task.id}`)
        task.is_completed = response.data.is_completed
      } catch (e) {
        this.erreur = 'Erreur lors de la mise à jour'
      }
    },

    // Supprimer une tâche
    async supprimerTache(task) {
      try {
        await axios.delete(`/tasks/${task.id}`)
        const index = this.tasks.findIndex(t => t.id === task.id)
        if (index > -1) this.tasks.splice(index, 1)
      } catch (e) {
        this.erreur = 'Erreur lors de la suppression'
      }
    },

    // Changer le filtre
    setFiltre(filtre) {
      this.filtre = filtre
    }
  }
})