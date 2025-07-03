<template>
  <div class="flex flex-row">
    <Dashhead />
    <div class="p-[10px]">
      <div class="text-orange-900 font-bold">ITINERARIES LISTINGS</div>
      <div v-if="loading">Loading....</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="itineraries.length === 0">No itineraries found</div>
      <div v-else class="flex flex-col gap-[15px]">
        <div
          v-if="!loading && !error"
          class="text-[35px] leading-[45px] font-bold text-green-900"
        >
          {{ count }} Itineraries
        </div>
        <div
          v-for="itinerary in itineraries"
          :key="itinerary.itinerary_id"
          class="md:grid md:grid-cols-6 justify-between items-center border border-gray p-[4px]"
        >
          <div
            v-if="itinerary.images && itinerary.images.length > 0"
            class="mt-2"
          >
            <img
              :src="
                'http://127.0.0.1:8000' +
                (itinerary.images.find((img) => img.is_primary)?.image_url ||
                  itinerary.images[0].image_url)
              "
              :alt="itinerary.title"
              class="w-[70px] h-[70px] object-cover"
            />
          </div>
          <div class="font-[Sans-serif]">{{ itinerary.title }}</div>
          <div class="hidden md:block font-[Sans-serif]">
            {{ itinerary.best_season }}
          </div>
          <div class="hidden md:block font-[Sans-serif]">
            {{ itinerary.main_destination }}
          </div>
          <div class="hidden md:block font-[Sans-serif]">
            {{
              new Date(itinerary.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            }}
          </div>
          <div class="flex flex-col gap-[6px]">
            <button
              class="border border-gray-500 rounded-sm text-white bg-black p-[3px] font-medium"
              @click="editItinerary(itinerary.itinerary_id)"
            >
              Edit
            </button>
            <button
              class="border border-gray-500 rounded-sm text-white bg-black p-[3px] font-medium"
              @click="deleteItinerary(itinerary.itinerary_id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

interface Itinerary {
  itinerary_id: number;
  title: string;
  country_id: number;
  overview: string;
  best_season: string;
  main_destination: string;
  destination_description: string;
  destination_location: string;
  subItineraries: SubItinerary[];
  images:Image[];
  created_at:string;
}
interface SubItinerary {
  sub_itinerary_id:number;
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
const router = useRouter();

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
          with_subItineraries: true
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
const editItinerary = (itinerary_id: number) => {
  router.push(`editproperty/${itinerary_id}`);
};
const deleteItinerary = async (itinerary_id: number) => {
  if (!confirm("Are you sure you want to delete this Itinerary?")) return;

  
  error.value = "";
  try {
    await axios.delete(`http://127.0.0.1:8000/api/itinerary/${itinerary_id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    await fetchItineraries();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to delete itinerary";
  }
};
fetchItineraries();
</script>
