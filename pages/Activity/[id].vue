<template>
  <div v-if="loading">loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="activity"></div>
  <div class="w-full h-[500px] md:[700px] relative overflow-hidden">
    <img
      v-if="activity?.images && activity.images.length > 0"
      :src="
        'http://127.0.0.1:8000' +
        (activity.images.find((img) => img.is_primary)?.image_url ||
          activity.images[0]?.image_url ||
          '')
      "
      :alt="activity?.activity_name"
      class="w-full h-full object-cover object-center"
    />
    <div
      class="absolute z-10 text-white md:w-[60%] md:left-[5%] md:top-[20%] md:space-y-[30px] top-[120px] space-y-[40px] translate-x-1/2 w-[60%] md:translate-x-0"
    >
      <div class="hidden md:block text-white font-tres font-semibold">
        HOME > ACTIVITIES > {{ activity?.activity_name }}
      </div>
      <div
        class="md:text-[70px] md:leading-[68px] text-[32px] leading-[39px] font-bold"
      >
        {{ activity?.activity_name }}
      </div>
      <div class="flex flex-row gap-[100px] items-center">
      
      <button
        class="text-[16px] leading-[24px] bg-yellow-600 w-[166px] h-[40px]"
      >
        See Activity
      </button>
  
      </div>
    </div>
    
  </div>
  <div class="px-[10px] py-[20px] flex flex-row gap-[50px]">
      <div class="md:w-[60%] flex flex-col gap-[20px]">
        <div class="text-[28px] font-bold leading-[28px]">ACTIVITY OVERVIEW</div>
        <div class="text-[17px] leading-[25px] font-sinco">{{ activity?.description }}</div>
        <div class="text-[17px] leading-[25px] font-sinco"> <b>DIFFICULTY LEVEL : </b>{{activity?.difficulty_level }}</div>
        
      </div>
      <div class="hidden md:flex  w-[40%]  bg-gray-100 p-[20px] h-[200px] text-center flex-col gap-[15px]">
        <div>TALK TO OUR EXPERTS</div>
        <div>They’ll gladly share their insider tips and work with you to design a personalized journey you’ll remember forever.</div>
        <div class="flex flex-row justify-between"><div>+254715067768</div> <div><span><Icon name = "icon-park:hand-right"/></span> <NuxtLink to="/contact" class="text-green-700">Lets discuss your trip</NuxtLink></div></div>

      </div>
    </div>
    <Act-desti :activity = "activity"/>
 
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";


interface Activity {
  activity_id: number;
  country_id: number;
  activity_name: string;
  description: string;
  difficulty_level: string;
  duration_hours: number;
  images: Image[];
  created_at: string;
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

const activity = ref<Activity | null>(null);

const loading = ref(true);
const error = ref("");
const route = useRoute();

const fetchActivity = async () => {
  loading.value = true;
  error.value = "";
  const activity_id = route.params.id;
  try {
    const response = await axios.get<Activity>(
      `http://127.0.0.1:8000/api/activity/${activity_id}`,
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
    activity.value = response.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to fetch activities";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchActivity();
});
</script>
