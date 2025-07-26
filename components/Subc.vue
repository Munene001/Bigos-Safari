<template>
  <div
    v-if="country"
    class="md:flex h-[120vh] hidden bg-[#c7641d] py-[50px] rounded-xl"
  >
    <!-- LEFT SIDEBAR - PARKS LIST -->
    <div
      class="w-80 bg-white border-r border-gray-300 p-4 overflow-y-auto sticky top-0 h-[screen]"
    >
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-800">
          {{ country.name }} NATIONAL PARKS
        </h2>
        <div class="text-sm text-gray-500 mt-1">
          {{ country.parks?.length || 0 }} Parks
        </div>
      </div>

      <div class="space-y-2">
        <div
          v-for="(park, index) in country.parks"
          :key="park.park_id"
          @click="activeParkIndex = index"
          class="p-3 rounded-lg cursor-pointer transition-colors"
          :class="{
            'bg-green-50 border-l-4 border-green-500':
              activeParkIndex === index,
            'hover:bg-green-100': activeParkIndex !== index,
          }"
        >
          <div class="font-medium text-[20px]">
            {{ park.name }}
          </div>
          <div class="text-sm text-gray-600 text-[18px]">
            {{ park.location }}
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT CONTENT - PARK DETAILS -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden h-[screen]">
      <template v-if="activePark">
        <div class="w-[92%] mx-auto">
          <h3 class="text-2xl font-bold mb-6 text-[#4A3620]">
            {{ activePark.name }}
          </h3>
          <div class="mb-4 p-3 bg-green-50 rounded-lg">
            <p class="text-green-800 italic">{{ activePark.location }}</p>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div class="flex flex-col gap-[30px]">
              <div class="">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">
                  About {{ activePark.name }}
                </h4>
                <p class="text-gray-600">{{ activePark.description }}</p>

                <!-- Park Features -->

                <!-- Best Time to Visit -->
                <div v-if="activePark.best_time_to_visit" class="mt-4">
                  <h5 class="font-semibold text-gray-700">
                    Best Time to Visit:
                  </h5>
                  <p class="text-gray-600">
                    {{ activePark.best_time_to_visit }}
                  </p>
                </div>
              </div>
              <div
                v-if="activePark.highlights"
                class="mt-6 bg-green-50 border border-green-100 rounded-lg p-4"
              >
                <h4 class="font-semibold text-green-800 mb-3 flex items-center">
                  <Icon name="mdi:star-circle" class="mr-2 text-green-600" />
                  Park Highlights
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="(highlight, index) in activePark.highlights.split(
                      '\n'
                    )"
                    :key="index"
                    class="flex items-start"
                  >
                    <span class="text-green-600 mr-2 mt-1">•</span>
                    <span class="text-gray-700">{{ highlight.trim() }}</span>
                  </li>
                </ul>
              </div>
              <!-- Park Image -->
              <div class="">
                <img
                  v-if="activePark.image_url"
                  :src="'http://127.0.0.1:8000' + activePark.image_url"
                  :alt="activePark.name"
                  class="w-full h-66 object-cover rounded-lg"
                />
              </div>

              <!-- Park Details -->
            </div>

            <!-- Activities Section -->
            <div v-if="activePark.activities" class="mt-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-2">
                Activities:
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="activity in activePark.activities"
                  :key="activity"
                  class="bg-gray-50 p-3 rounded-lg"
                >
                  {{ activity }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-red-500">No park selected.</div>
      </template>
    </div>
  </div>

  <!-- Mobile version -->
  <div v-if="country" class="md:hidden bg-[#c7641d] py-[40px] px-[10px]">
    <div class="mb-4">
      <h2 class="text-xl font-bold text-gray-800">
        {{ country.name }} NATIONAL PARKS
      </h2>
      <div class="text-sm text-gray-500 mt-1">
        {{ country.parks?.length || 0 }} Parks
      </div>
    </div>

    <div class="space-y-2">
      <div v-for="(park, index) in country.parks" :key="park.park_id">
        <!-- Park Header (Always visible) -->
        <div
          @click="toggleMobilePark(index)"
          class="p-3 rounded-lg cursor-pointer transition-colors bg-white flex items-center flex-row justify-between"
          :class="{
            'border-l-4 border-green-500': mobileActiveIndex === index,
            'hover:bg-green-50': mobileActiveIndex !== index,
          }"
        >
          <div>
            <div class="font-medium text-[20px]">
              {{ park.name }}
            </div>
            <div class="text-sm text-gray-600 text-[18px]">
              {{ park.location }}
            </div>
          </div>
          <div>
            <Icon
              name="icon-park-solid:down-two"
              style="font-size: 30px; color: darkolivegreen"
            />
          </div>
        </div>

        <!-- Park Details (Appears directly below when active) -->
        <div
          v-if="mobileActiveIndex === index"
          class="bg-white rounded-b-lg shadow-sm p-4 mt-[-8px] border-t-0"
        >
          <h3 class="text-lg font-bold mb-3 text-green-900">
            {{ park.name }}
          </h3>

          <div class="flex flex-col gap-4">
            <img
              v-if="park.image_url"
              :src="'http://127.0.0.1:8000' + park.image_url"
              :alt="park.name"
              class="w-full h-48 object-cover rounded-lg"
            />

            <div>
              <h4 class="font-semibold text-gray-800 mb-2">About:</h4>
              <p class="text-gray-600 text-sm">{{ park.description }}</p>
            </div>

            <div
              v-if="park.highlights"
              class="mt-4 bg-green-50 border border-green-100 rounded-lg p-3"
            >
              <h4
                class="font-semibold text-green-800 text-sm mb-2 flex items-center"
              >
                <Icon
                  name="mdi:star-circle"
                  class="mr-1 text-green-600 text-base"
                />
                Highlights
              </h4>
              <ul class="space-y-1 pl-1">
                <li
                  v-for="(highlight, index) in park.highlights.split('\n')"
                  :key="index"
                  class="flex items-start text-sm"
                >
                  <span class="text-green-600 mr-1 mt-1 text-xs">•</span>
                  <span class="text-gray-700">{{ highlight.trim() }}</span>
                </li>
              </ul>
            </div>

            <div v-if="park.activities">
              <h4 class="font-semibold text-gray-800 mb-2">Activities:</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="activity in park.activities"
                  :key="activity"
                  class="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {{ activity }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Park {
  park_id: number;
  name: string;
  location: string;
  description: string;
  image_url?: string;
  highlights?: string;
  activities?: string[];
  best_time_to_visit?: string;
}

interface Country {
  country_id: number;
  name: string;
  parks?: Park[];
}

const props = defineProps<{
  country: Country | null;
}>();

const activeParkIndex = ref(0);
const mobileActiveIndex = ref<number | null>(null);

const activePark = computed(() => {
  if (!props.country?.parks?.length) return null;
  return props.country.parks[activeParkIndex.value];
});

const toggleMobilePark = (index: number) => {
  if (mobileActiveIndex.value === index) {
    mobileActiveIndex.value = null;
  } else {
    mobileActiveIndex.value = index;
  }
};
</script>
