<template>
  <div class="fixed inset-0 z-50">
    <div
      class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>

    <div
      class="absolute md:top-0 md:w-[65vw] inset-0 bg-white rounded-none md:rounded-xl overflow-auto"
    >
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 z-50 text-2xl text-gray-600 hover:text-gray-800"
      >
        ✕
      </button>

      <div class="p-[5%]">
        <h2 class="text-2xl font-bold mb-4">{{ accommodation.name }}</h2>
        <Carousel
          v-if="
            accommodation && accommodation.images && accommodation.images.length
          "
          :items-to-show="1"
          :wrap-around="true"
        >
          <Slide
            v-for="(image, index) in accommodation.images"
            :key="image.image_id || index"
          >
            <div class="w-full h-[450px]">
              <img
                :src="'http://127.0.0.1:8000' + image.image_url"
                :alt="'Image ' + (index + 1)"
                class="w-full h-full object-cover"
              />
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>

        <div
          class="bg-gray-200 justify-between flex p-6 md:items-center md:flex-row flex-col text-[18px] font-[uno]"
        >
          <div>
            <Icon
              name="fluent-emoji-high-contrast:hotel"
              style="color: #4a3620"
            />{{ accommodation.type }}
          </div>
          <div>
            <Icon name="mingcute:location-2-fill" style="color: #4a3620" />{{
              accommodation.location
            }}
          </div>
          <div>
            <Icon name="streamline-ultimate-color:rating-star" />{{
              accommodation.rating
            }}
          </div>
        </div>
        <div class="py-[10px]">
          <h1>Description</h1>
          <p class="text-gray-700">{{ accommodation.description }}</p>
        </div>
        <div
          v-if="
            accommodation &&
            accommodation.features &&
            accommodation.features.length
          "
        >
        <div>Features</div>
          <ol class="text-gray-700">
            <li
              v-for="(feature, index) in accommodation.features"
              :key="feature.feature_id"
            >
              -{{ feature.feature_name }}
            </li>
          </ol>
        </div>
        
        <!-- all accommodation details -->
        <div class="py-[10px]">Website:<span class="text-gray-800 mx-[3px]">{{ accommodation.website_url }}</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { AccommodationDetails } from "#components";

const carouselConfig = {
  itemsToShow: "1",
  wrapAround: true,
  gap: 10,
};

defineProps<{
  accommodation: any;
}>();
</script>
