<template>
    <div v-if="activity">
      <div class="mb-8">
        <div class="text-sm text-gray-500">TOP DESTINATIONS FOR</div>
        <div class="text-2xl font-bold">{{ activity.activity_name }}</div>
      </div>
      
      <!-- Gallery Section -->
      <div v-if="galleryImages.length > 0">
        <div class="md:grid grid-cols-3 gap-4">
          <!-- Loop through non-primary images -->
          <div 
            v-for="(image, index) in galleryImages" 
            :key="image.image_id"
            class="relative h-64 rounded-lg overflow-hidden group"
          >
            <!-- Background image -->
            <div 
              class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              :style="{ backgroundImage: `url(http://127.0.0.1:8000${image.image_url})` }"
            ></div>
            
            <!-- Optional caption overlay -->
            <div 
              v-if="image.caption"
              class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4"
            >
              {{ image.caption }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Fallback if no gallery images -->
      <div v-else class="text-gray-500 py-8">
        No additional images available for this activity
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  
  interface Image {
    image_id: number;
    activity_id: number;
    image_url: string;
    is_primary: boolean;
    caption: string;
  }
  
  interface Props {
    activity: {
      activity_id: number;
      country_id: number;
      activity_name: string;
      description: string;
      difficulty_level: string;
      duration_hours: number;
      images: Image[];
      created_at: string;
    } | null;
  }
  
  const { activity } = defineProps<Props>();
  
  // Compute non-primary images for gallery
  const galleryImages = computed(() => {
    return activity?.images.filter(img => !img.is_primary) || [];
  });
  </script>
  
  