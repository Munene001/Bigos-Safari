<template>
  <div v-if="loading">loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="itinerary">
    <div class="w-full  h-[500px] md:[700px] relative overflow-hidden ">
    <img
      v-if="itinerary.images && itinerary.images.length > 0"
      :src="'http://127.0.0.1:8000' + 
           ((itinerary.images.find(img => img.is_primary)?.image_url) || 
            itinerary.images[0]?.image_url || '')"
      :alt="itinerary.title"
      class="  w-full h-full object-cover object-center"
     
      
    />
    <div class="absolute  z-10  text-white  md:w-[60%] md:left-[5%] md:top-[20%] md:space-y-[30px]  top-[120px] space-y-[40px] translate-x-1/2 w-[60%] md:translate-x-0">
      <div class="hidden md:block text-white ">HOME > ITINERARIES > {{ itinerary.title }}</div>
    <div class="   md:text-[70px] md:leading-[68px] text-[32px] leading-[39px] font-bold">
        {{ itinerary.title}}
    </div>
    <button class=" text-[16px] leading-[24px]   bg-yellow-600  w-[166px] h-[40px]  ">See Itinerary</button>
    </div>
    </div>
    <div class="bg-gray-200 flex flex-col md:items-center py-[20px] gap-[10px] md:grid md:grid-cols-3 md:h-[74px] px-[10px]">
      <div class="flex items-center gap-[5px]"><span><Icon name="subway:calendar-1" style="color: darkolivegreen;"/></span> <span>{{ itinerary.best_season }}</span></div>
      <div class="flex items-center gap-[5px]"><span><Icon name="ic:round-place" style="color: darkolivegreen;"/></span>{{ itinerary.main_destination }}</div>
      <div class="flex items-center gap-[5px]"><span><Icon name="material-symbols:clear-night" style="color: darkolivegreen;"/></span>{{ itinerary.sub_itineraries[0].duration_nights }} nights</div>
    </div>

    <div class="px-[10px] py-[20px] flex flex-row gap-[50px]">
      <div class="md:w-[60%] flex flex-col gap-[20px]">
        <div class="text-[28px] font-bold leading-[28px]">TRIP OVERVIEW</div>
        <div class="text-[17px] leading-[25px]">{{ itinerary.overview }}</div>
        <div class="text-[17px] leading-[25px]">{{itinerary.destination_description }}</div>
        
      </div>
      <div class="hidden md:flex  w-[40%]  bg-gray-100 p-[20px] h-[200px] text-center flex-col gap-[15px]">
        <div>TALK TO OUR EXPERTS</div>
        <div>They’ll gladly share their insider tips and work with you to design a personalized journey you’ll remember forever.</div>
        <div class="flex flex-row justify-between"><div>+254715067768</div> <div><span><Icon name = "icon-park:hand-right"/></span> <NuxtLink to="/contact" class="text-green-700">Lets discuss your trip</NuxtLink></div></div>

      </div>
    </div>
  </div>
  
  <Subiten :itinerary = "itinerary"/>
  <Itenimg :itinerary = "itinerary"/>
  <Iten/>

</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Subiten from "~/components/Subiten.vue";
import Itenimg from "~/components/Itenimg.vue";

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
  day_plans: DayPlan[]; 
}
interface DayPlan {
  day_number: number;
  location: string;
  description: string;
  accommodation_id: number | null;
  night_number: number | null;
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

const itinerary = ref<Itinerary | null>(null);
const count = ref(0);
const loading = ref(true);
const error = ref("");
const route = useRoute();

const fetchItinerary = async () => {
  error.value = "";
  loading.value = true;
  const itinerary_id = route.params.id;
  try {
    const response = await axios.get<Itinerary>(
      `http://127.0.0.1:8000/api/itinerary/${itinerary_id}`,
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
    itinerary.value = response.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to fetch itineraries";
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchItinerary();
});
</script>
