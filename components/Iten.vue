<template>
  <div class="bg-[#4A3620] rounded-xl">
    <div
      class="text-white text-[40px] leading-[55px] text-center md:text-start py-[30px] font-medium flex flex-col gap-[15px] px-[10px] "
    >
      <div>
        <div class="md:text-[30px] leading-[34px] text-[16px] font-semibold">
          UNFORGETTABLE
        </div>
        <div
          class="md:text-[50px] md:leading-[50px] text-[28px] leading-[28px] font-semibold"
        >
          ITINERARIES
        </div>
      </div>
      <div
        class="md:text-[20px] md:leading-[28px] text-[15px] leading-[18px] text-[Montserrat] md:w-[70%]"
      >
        From breathtaking wildlife encounters to serene coastal getaways, we
        design personalized journeys that reflect your vision. Explore a few
        handpicked experiences we've crafted for past travelers.
      </div>
    </div>
    <Carousel v-bind="carouselConfig" class="pb-[20px]" id="iten-carousel">
      <Slide
        v-for="itinerary in itineraries"
        :key="itinerary.itinerary_id"
        class="flex flex-col"
      >
        <NuxtLink :to= "`/Itinerary/${itinerary.itinerary_id}`" class="flex flex-col w-[330px] md:w-[300px]">
          <div class="relative">
            <img
              :src="
                'http://127.0.0.1:8000' +
                (itinerary.images.find((img) => img.is_primary)?.image_url ||
                  itinerary.images[0].image_url)
              "
              alt="itinerary.itinerary"
              class="object-cover w-[330px] h-[450px] md:w-[300px]"
            />
            <div
              class="text-[22px] font-bold font-[Sans-serif] absolute bottom-2 bg-black bg-opacity-25 text-white"
            >
              <div>{{ itinerary.title }}</div>
            </div>
          </div>
          <div
            class="font-[Montserrat] pt-[10px] grid grid-cols-[auto_1fr] gap-[10px] items-center"
          >
            <!-- Best Season -->
            <div class="flex items-center">
              <Icon name="meteocons:time-morning-fill" style="color: darkgoldenrod;" />
            </div>
            <p class="text-white text-[16px]">
              Best Season: {{ itinerary.best_season }}
            </p>

            <!-- Main Destination -->
            <div class="flex items-center">
              <Icon
                name="ic:round-place"
                style="color: darkgoldenrod;"
              />
            </div>
            <p class="text-white text-[16px]">{{ itinerary.main_destination }}</p>

            <!-- Nights -->
            <div
              v-if="itinerary.sub_itineraries?.[0]?.duration_nights"
              class="flex items-center"
            >
              <Icon
                name="material-symbols:clear-night"
                style="color: darkgoldenrod;"
              />
            </div>
            <p
              v-if="itinerary.sub_itineraries?.[0]?.duration_nights"
              class="text-white text-[16px]"
            >
              {{ itinerary.sub_itineraries[0].duration_nights }} Nights
            </p>
          </div>
        </NuxtLink>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const carouselConfig = {
  itemsToShow: "auto",
  wrapAround: true,
  gap: 10,
 
};

interface Itinerary {
  itinerary_id: number;
  title: string;
  country_id: number;
  overview: string;
  best_season: string;
  main_destination: string;
  destination_description: string;
  destination_location: string;
  sub_itineraries: SubItinerary[];
  images: Image[];
  created_at: string;
}
interface SubItinerary {
  sub_itinerary_id: number;
  duration_days: number;
  itinerary_id: number;
  duration_nights: number;
  price: number;
  special_notes?: string;
}
interface Image {
  image_id: number;
  itinerary_id: number;
  image_url: string;
  is_primary: boolean;
  caption: string;
}

interface Country {
  country_id: number;
  name: string;
}
interface ApiResponse {
  itineraries: Itinerary[];
  count: number;
}

const itineraries = ref<Itinerary[]>([]);
const count = ref(0);
const loading = ref(true);
const error = ref("");



const fetchItineraries = async () => {
  error.value = "";
  loading.value = true;
  try {
    const response = await axios.get<ApiResponse>(
      `http://127.0.0.1:8000/api/itineraries`,
      {
        params: {
          with_images: true,
          with_country: true,
          with_subItineraries: true,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
    itineraries.value = response.data.itineraries;
    count.value = response.data.count;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to fetch itineraries";
  } finally {
    loading.value = false;
  }
};
fetchItineraries();
</script>
<style>
@media (min-width: 768px) {
  #iten-carousel {
    --vc-pgn-background-color: white;
    --vc-pgn-active-color: darkgoldenrod;
    --vc-pgn-border-radius: 5px;
    --vc-pgn-height: 7px;
    --vc-pgn-width: 7px;
  }
  .carousel {
    --vc-nav-background: rgba(0, 0, 0, 0.3);
    --vc-nav-color: white;
    --vc-nav-color-hover: #e5e5e5;
    --vc-nav-border-radius: 50%;
    --vc-nav-width: 50px;
    --vc-nav-height: 50px;
  }
}
@media (max-width: 768px) {
  #iten-carousel {
    --vc-nav-background: white;
    --vc-nav-color: green;
    --vc-nav-color-hover: #e5e5e5;
    --vc-nav-border-radius: 50%;
    --vc-nav-width: 50px;
    --vc-nav-height: 50px;
  }

  #iten-carousel {
    --vc-pgn-display: hidden;
    --vc-pgn-background-color: white;
    --vc-pgn-active-color: darkgoldenrod;
    --vc-pgn-border-radius: 5px;
    --vc-pgn-height: 7px;
    --vc-pgn-width: 7px;
  }
}
#iten-carousel .carousel__slide--active div {
  opacity: 1;
  transform: scale(1) rotateY(0) translateX(0);
}

#iten-carousel .carousel__slide--prev div {
  opacity: 1;
  transform: scale(1);
}

#iten-carousel .carousel__slide--next div {
  opacity: 1;
  transform: scale(1);
}

#iten-carousel .carousel__slide--next ~ .carousel__slide img {
  opacity: 1;
  transform: scale(1);
}
#iten-corousel .carousel__navigation--next {
  font-size: 50px;
}
</style>
