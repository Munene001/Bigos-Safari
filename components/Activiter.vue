<template>
    <div class="text-green-900 text-[40px] leading-[55px] text-center py-[30px] font-medium"> TOP ACTIVITIES</div>
    <Carousel v-bind="carouselConfig"  class="pb-[20px]">
        
        <Slide v-for="activity in activities" :key="activity.activity_id">

            <div class="flex flex-col w-[330px] md:w-[420px]">
                <div class="relative md:p-[10px]">
                <img :src="'http://127.0.0.1:8000' + (activity.images.find((img) => img.is_primary) ?.image_url || activity.images[0].image_url)" alt="activity.activity_name" class="object-cover w-[330px] h-[450px] md:w-[420px]" />
                <div class="absolute bottom-8 left-6 bg-black bg-opacity-30 text-white p-[5px]">
                    <div class="text-[28px] font-bold font-[Sans-serif]">{{ activity.activity_name }}</div>
                    <div class="text-[15px] font-[Sans-serif] text-green-100">Duration: {{ activity.duration_hours }} hours</div>
                    

                </div>
                </div>
                <div class="font-[Montserrat] pt-[10px]">
                    <p class="text-[17px] leading-[25px]">{{ activity.description }}</p>
                    <p class="text-yellow-600 text-[17px] leading-[25px]">Difficulty: {{ activity.difficulty_level }}</p>
                </div>
            </div>

        </Slide>
        <template #addons>
            <Navigation/>
            <Pagination/>
        </template>

    </Carousel>


</template>
<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel';
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const carouselConfig = {
    itemsToShow:'auto',
    wrapAround:true,
    gap:10,
   
    autoplay:'3000'

}

interface Activity {
activity_id:number;
  country_id: number;
  activity_name: string;
  description: string;
  difficulty_level: string;
  duration_hours: number;
  images: Image[];
  created_at:string;
}
interface Image {
  image_id: number;
  activity_id: number;
  image_url: string;
  is_primary: boolean;
  caption: string;
}

interface Country {
  country_id: number;
  name: string;
}
interface ApiResponse {
  activities: Activity[];
  count: number;
}

const activities = ref<Activity[]>([]);
const count = ref(0);
const loading = ref(true);
const error = ref("");
const router = useRouter();

const fetchActivities = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get<ApiResponse>(
      `http://127.0.0.1:8000/api/activities`,
      {
        params: {
          with_images: true,
          with_country: true,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
    activities.value = response.data.activities;
    count.value = response.data.count;
  } catch (err: any) {
    error.value =
      err.response?.data?.message || "Failed to fetch activities";
  } finally {
    loading.value = false;
  }
};

fetchActivities();

</script>