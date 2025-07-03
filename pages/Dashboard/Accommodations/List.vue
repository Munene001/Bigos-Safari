<template>
  <div class="flex flex-row">
    <Dashhead />
    <div class="p-[10px]">
      <div class="text-orange-900 font-bold"> ACCOMMODATION LISTINGS</div>
      <div v-if="loading">Loading....</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="accommodations.length === 0">No accommodations found</div>
      <div v-else class="flex flex-col gap-[15px]">
        <div
          v-if="!loading && !error"
          class="text-[35px] leading-[45px] font-bold text-green-900"
        >
          {{ count }} Accommodations
        </div>
        <div
          v-for="accommodation in accommodations"
          :key="accommodation.accommodation_id"
          class="md:grid md:grid-cols-6 justify-between items-center border border-gray p-[4px]"
        >
          <div
            v-if="accommodation.images && accommodation.images.length > 0"
            class="mt-2"
          >
            <img
              :src="
                'http://127.0.0.1:8000' +
                (accommodation.images.find((img) => img.is_primary)
                  ?.image_url || accommodation.images[0].image_url)
              "
              :alt="accommodation.name"
              class="w-[70px] h-[70px] object-cover"
            />
          </div>
          <div class="font-[Sans-serif]">{{ accommodation.name }}</div>
          <div class="hidden md:block font-[Sans-serif]">
            {{ accommodation.type }}
          </div>
          <div class="hidden md:block font-[Sans-serif]">
            {{ accommodation.location }}
          </div>
          <div class="hidden md:block font-[Sans-serif]">
            {{
              new Date(accommodation.created_at).toLocaleDateString("en-US", {
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
              @click="editAccommodation(accommodation.accommodation_id)"
            >
              Edit
            </button>
            <button
              class="border border-gray-500 rounded-sm text-white bg-black p-[3px] font-medium"
              @click="deleteAccommodation(accommodation.accommodation_id)"
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

interface Accommodation {
  accommodation_id: number;
  country_id: number;
  name: string;
  description: string;
  type: "Lodge" | "Camp" | "Hotel" | "Tented Camp" | "Resort" | "Airbnb";
  rating: number;
  website_url: string;
  features: { feature_name: string }[];
  location: string;
  created_at: string;
  images: Image[];
}
interface Image {
  image_id: number;
  accommodation_id: number;
  image_url: string;
  is_primary: boolean;
  caption: string;
}
interface Feature {
  feature_id: number;
  accommodation_id: number;
  feature_name: string;
}
interface Country {
  country_id: number;
  name: string;
}
interface ApiResponse {
  accommodations: Accommodation[];
  count: number;
}

const accommodations = ref<Accommodation[]>([]);
const count = ref(0);
const loading = ref(true);
const error = ref("");
const router = useRouter();

const fetchAccommodations = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get<ApiResponse>(
      `http://127.0.0.1:8000/api/accommodations`,
      {
        params: {
          with_images: true,
          with_features: true,
          with_country: true,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
    accommodations.value = response.data.accommodations;
    count.value = response.data.count;
  } catch (err: any) {
    error.value =
      err.response?.data?.message || "Failed to fetch accommodations";
  } finally {
    loading.value = false;
  }
};
const editAccommodation = (accommodation_id: number) => {
  router.push(`editproperty/${accommodation_id}`);
};
const deleteAccommodation = async (accommodation_id: number) => {
  if (!confirm("Are you suere you want to delete this Accommodation?")) return;

  loading.value = true;
  error.value = "";
  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/accommodation/${accommodation_id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    await fetchAccommodations();
  } catch (err: any) {
    error.value =
      err.response?.data?.message || "Failed to delete accommodation";
  }
};
fetchAccommodations();
</script>
