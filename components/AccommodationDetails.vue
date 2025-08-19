<template>
    <div class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="$emit('close')"></div>
      
      <div class="absolute inset-0 md:inset-10 bg-white rounded-none md:rounded-xl overflow-auto">
        <button @click="$emit('close')" 
                class="absolute top-4 right-4 z-50 text-2xl text-gray-600 hover:text-gray-800">
          ✕
        </button>
        
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4">{{ accommodation.name }}</h2>
          <p class="text-gray-600">{{ accommodation.description }}</p>
          <!-- all accommodation details -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    accommodation: any;
  }>();
  
  
  </script>