<template>
  <div class="flex flex-row">
    <Dashhead />
    <div class="p-[10px]">
      <div class="text-orange-900 font-bold">ACTIVITIES LISTINGS</div>
      <div v-if="loading">Loading....</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else-if="activities.length === 0">No activities found</div>
      <div v-else class="flex flex-col gap-[15px]">
        <div
          v-if="!loading && !error"
          class="text-[35px] leading-[45px] font-bold text-green-900"
        >
          {{ count }} Activities
        </div>
        <div
          v-for="activity in activities"
          :key="activity.activity_id"
          class="md:grid md:grid-cols-6 justify-between items-center border border-gray p-[4px]"
        >
          <div
            v-if="activity.images && activity.images.length > 0"
            class="mt-2"
          >
            <img
              :src="
                'http://127.0.0.1:8000' +
                (activity.images.find((img) => img.is_primary)
                  ?.image_url || activity.images[0].image_url)
              "
              :alt="activity.activity_name"
              class="w-[70px] h-[70px] object-cover"
            />
          </div>
          <div class="font-[Sans-serif]">{{ activity.activity_name }}</div>
          <div class="hidden md:block font-[Sans-serif]">
            {{ activity.duration_hours }}
          </div>
          <div class="hidden md:block font-[Sans-serif]">
            {{ activity.difficulty_level }}
          </div>
          <div class="hidden md:block font-[Sans-serif]">
            {{
              new Date(activity.created_at).toLocaleDateString("en-US", {
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
              @click="editActivity(activity.activity_id)"
            >
              Edit
            </button>
            <button
              class="border border-gray-500 rounded-sm text-white bg-black p-[3px] font-medium"
              @click="deleteActivity(activity.activity_id)"
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
const editActivity = (activity_id: number) => {
  router.push(`editproperty/${activity_id}`);
};
const deleteActivity = async (activity_id: number) => {
  if (!confirm("Are you sure you want to delete this Activity?")) return;

  loading.value = true;
  error.value = "";
  try {
    await axios.delete(`http://127.0.0.1:8000/api/activity/${activity_id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    await fetchActivities();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to delete activity";
  }
};
fetchActivities();
</script>
