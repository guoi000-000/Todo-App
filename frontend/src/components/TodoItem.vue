<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'supprimer'])

const basculer = () => emit('toggle', props.task)
const supprimer = () => emit('supprimer', props.task)
</script>

<template>
  <li class="flex items-center gap-4 py-3 px-2 border-b border-gray-100 last:border-0">
    <!-- Bolleen -->
    <div
      @click="basculer"
      :class="[
        'w-6 h-6 rounded-full border-2 cursor-pointer flex-shrink-0 flex items-center justify-center',
        task.is_completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
      ]"
    >
      <svg v-if="task.is_completed" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
    </div>
    
    <span class="flex-1" :class="{ 'text-gray-400': task.is_completed }">
      {{ task.title }}
    </span>
    
    <!-- Bouton supprimer -->
    <button
      @click="supprimer"
      class="flex items-center justify-center w-10 h-10 bg-transparent border-2 border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.34 6.14m-4.08 0L10 9m4.34-3.42l.001-.1a2 2 0 00-2-2H11.66a2 2 0 00-2 2l.001.1M4.5 6.346h15m-1.5 0L16.74 19.44a2 2 0 01-2 1.876H9.26a2 2 0 01-2-2l.001.1-1.876L5.75 6.346z" />
      </svg>
    </button>
  </li>
</template>