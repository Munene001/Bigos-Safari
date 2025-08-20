<template>
  <!-- Your template remains the same, just change the references from -->
  <!-- itinerary to localItinerary and activeSubItinerary to localActiveSubItinerary -->
  <div
    v-if="localItinerary"
    class="md:flex h-[120vh] hidden bg-[#c7641d] py-[50px] rounded-xl font-sinco"
  >
    <!-- LEFT SIDEBAR - SUB-ITINERARIES -->
    <div
      class="w-80 bg-white border-r border-gray-300 p-4 overflow-y-auto sticky top-0 h-[screen]"
    >
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-800">
          {{ localItinerary.title }} ITINERARIES
        </h2>
        <div class="text-sm text-gray-500 mt-1">
          {{ localItinerary.best_season }}
        </div>
      </div>

      <div class="space-y-2">
        <div
          v-for="(sub, index) in localItinerary.sub_itineraries"
          :key="sub.sub_itinerary_id"
          @click="activeSubIndex = index"
          class="p-3 rounded-lg cursor-pointer transition-colors"
          :class="{
            'bg-green-50 border-l-4 border-green-500': activeSubIndex === index,
            'hover:bg-green-100': activeSubIndex !== index,
          }"
        >
          <div class="font-medium text-[20px]">
            {{ sub.duration_nights }} Nights
          </div>
          <div class="text-sm text-gray-600 text-[18px]">
            {{ sub.duration_days }} Days
          </div>
          <div v-if="sub.price" class="text-sm font-semibold mt-3">
            Ksh{{ sub.price.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT CONTENT - DAY PLANS -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden h-[screen]">
      <template v-if="localActiveSubItinerary">
        <div class="w-[90%] mx-auto">
          <h3 class="text-2xl font-bold mb-6 text-[#4A3620]">
            {{ localItinerary.main_destination }} Itinerary
          </h3>

          <!-- Special Notes and Accommodation Link -->
          <div
            v-if="
              localActiveSubItinerary.special_notes ||
              (localActiveSubItinerary.accommodations &&
                localActiveSubItinerary.accommodations.length)
            "
            class="mb-4 p-3 bg-green-50 rounded-lg"
          >
            <div
              v-if="
                localActiveSubItinerary.accommodations &&
                localActiveSubItinerary.accommodations.length
              "
            >
              <span class="text-green-800 font-medium">Accommodation: </span>
              <button
                @click="toggleAccommodationDetails"
                class="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                {{ localActiveSubItinerary.accommodations[0].name }}
              </button>

              <AccommodationDetails
                v-if="showAccommodationDetails"
                :accommodation="localActiveSubItinerary.accommodations[0]"
                @close="showAccommodationDetails = false"
              />

              <span
                v-if="localActiveSubItinerary.accommodations[0].rating"
                class="text-yellow-600 ml-2"
              >
                ★ {{ localActiveSubItinerary.accommodations[0].rating }}
              </span>
            </div>

            <p
              v-if="localActiveSubItinerary.special_notes"
              class="text-green-800 italic mb-2"
            >
              {{ localActiveSubItinerary.special_notes }}
            </p>
          </div>

          <div
            v-if="
              localActiveSubItinerary.day_plans &&
              localActiveSubItinerary.day_plans.length > 0
            "
          >
            <div
              v-for="day in localActiveSubItinerary.day_plans"
              :key="day.day_number"
              class="mb-12"
            >
              <div
                class="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
              >
                <div class="flex gap-[30px] items-center">
                  <div
                    class="text-[#4A3620] flex-shrink-0 font-bold text-[25px]"
                  >
                    DAY {{ day.day_number }}:
                  </div>
                  <div>
                    <div>
                      <h4 class="text-lg font-semibold text-gray-800">
                        {{ day.location }}
                      </h4>
                      <p class="text-gray-600 mt-2">{{ day.description }}</p>
                    </div>

                    <div
                      v-if="
                        localItinerary.images && 
                        localItinerary.images[day.day_number - 1]
                      "
                      class="mt-4"
                    >
                      <img
                        :src="
                          'http://127.0.0.1:8000' +
                          localItinerary.images[day.day_number - 1].image_url
                        "
                        :alt="`Day ${day.day_number} - ${day.location}`"
                        class="w-full h-64 object-cover rounded-lg"
                      />
                      <p
                        v-if="localItinerary.images[day.day_number - 1].caption"
                        class="text-sm text-gray-500 mt-2"
                      >
                        {{ localItinerary.images[day.day_number - 1].caption }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-red-500">
            No day plans available for this sub-itinerary.
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-red-500">No sub-itinerary selected.</div>
      </template>
    </div>
  </div>

  <!--Mobile version-->
  <div v-if="localItinerary" class="md:hidden bg-gray-50 py-[40px] px-[10px]">
    <div class="mb-4">
      <h2 class="text-xl font-bold text-gray-800">
        {{ localItinerary.title }} ITINERARIES
      </h2>
      <div class="text-sm text-gray-500 mt-1">
        {{ localItinerary.best_season }}
      </div>
    </div>

    <div class="space-y-2">
      <div
        v-for="(sub, index) in localItinerary.sub_itineraries"
        :key="sub.sub_itinerary_id"
      >
        <!-- Sub-Itinerary Header (Always visible) -->
        <div
          @click="toggleMobileSubItinerary(index)"
          class="p-3 rounded-lg cursor-pointer transition-colors bg-white flex items-center flex-row justify-between"
          :class="{
            'border-l-4 border-green-500': mobileActiveIndex === index,
            'hover:bg-green-50': mobileActiveIndex !== index,
          }"
        >
          <div>
            <div class="font-medium text-[20px]">
              {{ sub.duration_nights }} Nights
            </div>
            <div class="text-sm text-gray-600 text-[18px]">
              {{ sub.duration_days }} Days
            </div>
            <div v-if="sub.price" class="text-sm font-semibold mt-3">
              Ksh{{ sub.price.toLocaleString() }}
            </div>
          </div>
          <div>
            <Icon
              name="icon-park-solid:down-two"
              style="font-size: 30px; color: darkolivegreen"
            />
          </div>
        </div>

        <!-- Day Plans Content (Appears directly below when active) -->
        <div
          v-if="mobileActiveIndex === index"
          class="bg-white rounded-b-lg shadow-sm p-4 mt-[-8px] border-t-0"
        >
          <h3 class="text-lg font-bold mb-3 text-green-900">
            {{ localItinerary.main_destination }} Itinerary
          </h3>

          <!-- Special Notes and Accommodation Link for Mobile -->
          <div
            v-if="
              sub.special_notes ||
              (sub.accommodations && sub.accommodations.length)
            "
            class="mb-4 p-3 bg-green-50 rounded-lg"
          >
            <div v-if="sub.accommodations && sub.accommodations.length">
              <span class="text-green-800 font-medium">Accommodation: </span>
              <button
                @click="toggleAccommodationDetailsForSub(sub.sub_itinerary_id)"
                class="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                {{ sub.accommodations[0].name }}
              </button>
              <AccommodationDetails
                v-if="showAccommodationDetailsForSubId === sub.sub_itinerary_id"
                :accommodation="sub.accommodations[0]"
                @close="showAccommodationDetailsForSubId = null"
              />
              <span
                v-if="sub.accommodations[0].rating"
                class="text-yellow-600 ml-2 text-sm"
              >
                ★ {{ sub.accommodations[0].rating }}
              </span>
            </div>
            <p v-if="sub.special_notes" class="text-green-800 italic mb-2">
              {{ sub.special_notes }}
            </p>
          </div>

          <div v-if="sub.day_plans?.length">
            <div
              v-for="day in sub.day_plans"
              :key="day.day_number"
              class="mb-4 pb-4 border-b border-gray-100 last:border-0"
            >
              <div class="flex gap-3 items-start">
                <div class="text-green-900 font-bold text-[18px] flex-shrink-0">
                  DAY {{ day.day_number }}:
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">
                    {{ day.location }}
                  </h4>
                  <p class="text-gray-600 mt-1 text-sm">
                    {{ day.description }}
                  </p>

                  <div v-if="getDayImage(day.day_number)" class="mt-2">
                    <img
                      :src="
                        'http://127.0.0.1:8000' +
                        getDayImage(day.day_number)?.image_url
                      "
                      class="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500 py-2 text-sm">
            No day plans available
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps<{
  itinerary: {
    itinerary_id?: number;
    title?: string;
    country_id?: number;
    overview?: string;
    main_destination?: string;
    destination_description?: string;
    destination_location?: string;
    images?: any[];
    created_at?: string;
    best_season?: string;
    sub_itineraries?: any[];
  } | null;
}>();

// Create a local reactive copy of the itinerary
const localItinerary = ref(JSON.parse(JSON.stringify(props.itinerary)));

// Update localItinerary when props.itinerary changes
watch(() => props.itinerary, (newItinerary) => {
  localItinerary.value = JSON.parse(JSON.stringify(newItinerary));
}, { deep: true });

const activeSubIndex = ref(0);
const accommodationsLoading = ref(false);
const showAccommodationDetails = ref(false);
const showAccommodationDetailsForSubId = ref<number | null>(null);

const toggleAccommodationDetails = () => {
  showAccommodationDetails.value = !showAccommodationDetails.value;
};

const toggleAccommodationDetailsForSub = (subId: number) => {
  if (showAccommodationDetailsForSubId.value === subId) {
    showAccommodationDetailsForSubId.value = null;
  } else {
    showAccommodationDetailsForSubId.value = subId;
  }
};

const localActiveSubItinerary = computed(() => {
  if (!localItinerary.value?.sub_itineraries) {
    return null;
  }
  return localItinerary.value.sub_itineraries[activeSubIndex.value];
});

const mobileActiveIndex = ref<number | null>(null);

// Mobile toggle function
const toggleMobileSubItinerary = (index: number) => {
  if (mobileActiveIndex.value === index) {
    mobileActiveIndex.value = null;
  } else {
    mobileActiveIndex.value = index;
  }
};

// Safe image getter
const getDayImage = (dayNumber: number) => {
  if (!localItinerary.value?.images?.length) return null;
  return localItinerary.value.images[dayNumber - 1] || null;
};

// Fetch accommodations for sub-itineraries
const fetchAccommodations = async () => {
  if (!localItinerary.value?.sub_itineraries || !localItinerary.value.itinerary_id) return;

  accommodationsLoading.value = true;
  try {
    for (let i = 0; i < localItinerary.value.sub_itineraries.length; i++) {
      const sub = localItinerary.value.sub_itineraries[i];
      
      // Only fetch if accommodations don't exist
      if (!sub.accommodations || sub.accommodations.length === 0) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/itineraries/${localItinerary.value.itinerary_id}/sub-itineraries/${sub.sub_itinerary_id}/accommodations`
        );

        if (response.ok) {
          const accommodations = await response.json();
          // Update the local reactive copy
          localItinerary.value.sub_itineraries[i].accommodations = accommodations;
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch accommodations:", error);
  } finally {
    accommodationsLoading.value = false;
  }
};

// Fetch accommodations when component mounts
onMounted(() => {
  if (props.itinerary) {
    fetchAccommodations();
  }
});

// Also fetch when the prop changes
watch(() => props.itinerary, (newItinerary) => {
  if (newItinerary) {
    fetchAccommodations();
  }
});
</script>