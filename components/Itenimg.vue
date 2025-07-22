<template>
    <div class="px-[10px]">
      <div class="text-xl font-bold ">GALLERY IMAGES</div>
      <div v-if="itinerary && itinerary.images && itinerary.images.length > 0" class="flex flex-col gap-[2px] ">
        
        <div class="flex flex-wrap gap-[10px]">
          <div 
            v-for="image in itinerary.images" 
            :key="image.image_id"
            @click="selectedImage = image"
            class="cursor-pointer"
          >
            <img 
              :src="'http://127.0.0.1:8000' + image.image_url"
              :alt="image.caption || 'Thumbnail'"
              class="w-20 h-20 object-cover rounded-md"
              :class="{ 'ring-2 ring-green-500': image.image_id === selectedImage.image_id }"
            />
          </div>
        </div>
        <div >
          <img 
            :src="'http://127.0.0.1:8000' + selectedImage.image_url"
            :alt="selectedImage.caption || 'Gallery Image'"
            class=" h-96 object-cover object-center rounded-sm"
          />
          <p v-if="selectedImage.caption" class="text-sm text-gray-500 mt-2">
            {{ selectedImage.caption }}
          </p>
        </div>
      </div>
     
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, watch } from 'vue';

interface Image {
  image_id: number;
  itinerary_id: number;
  image_url: string;
  is_primary: boolean;
  caption: string;
}

interface Props {
  itinerary: {
    itinerary_id?: number;
    title?: string;
    country_id?: number;
    overview?: string;
    main_destination?: string;
    destination_description?: string;
    destination_location?: string;
    images?: Image[];
    created_at?: string;
    best_season?: string;
  } | null;
}

const { itinerary } = defineProps<Props>();
const selectedImage = ref<Image | null>(null);

watch(
  () => itinerary?.images,
  (images) => {
    if (images && images.length > 0) {
      const primary = images.find(img => img.is_primary);
      selectedImage.value = primary || images[0];
    }
  },
  { immediate: true }
);
</script>
