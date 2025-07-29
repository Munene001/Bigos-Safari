<template>
  <div class="flex flex-row">
    <Dashhead />
    <div class="p-[10px] flex flex-col gap-[10px]">
      <div class="font-bold">ADD A NEW ITINERARY</div>
      <form
        ref="formElement"
        @submit.prevent="submitItinerary"
        class="flex flex-col gap-[40px] md:gap-[25px]"
      >
        <div>
          <label class="" for="title">Title :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.title"
            type="text"
            id="title"
            placeholder="Use Capital Letters"
            required
            @input="(event:Event) => form.title = (event.target as HTMLInputElement).value.toUpperCase()"
          />
        </div>
        <div>
          <label for="country_id">Country: </label>
          <select
            class="border border-black h-[42px] p-[8px]"
            v-model="form.country_id"
            id="country_id"
            required
          >
            <option
              v-for="country in countries"
              :key="country.country_id"
              :value="country.country_id"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="font-bold" for="best_season">Best Season :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.best_season"
            type="text"
            id="best_season"
            required
          />
        </div>
        <div>
          <label class="font-bold" for="main_destination">Main Destination :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.main_destination"
            type="text"
            id="main_destination"
            required
          />
        </div>
        <div>
          <label class="font-bold" for="overview">Overview :</label>
          <textarea
            class="border border-black w-full h-[250px] p-[8px]"
            v-model="form.overview"
            id="overview"
            placeholder="A brief description of the itinerary, do not exceed 200 words, follow paragraph rules"
            required
          ></textarea>
        </div>

        <div>
          <label class="font-bold" for="destination_location">Destination Location :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.destination_location"
            type="text"
            id="destination_location"
            required
          />
        </div>
        <div>
          <label class="font-bold" for="destination_description">Destination Description :</label>
          <textarea
            class="border border-black w-full h-[250px] p-[8px]"
            v-model="form.destination_description"
            id="destination_description"
            placeholder="A brief description, do not exceed 200 words, follow paragraph rules"
            required
          ></textarea>
        </div>

        <div>
          <label for="primaryImage" class="font-bold">Primary Image (Required max 250kb) :</label>
          <input
            id="primaryImage"
            type="file"
            accept="image/*"
            @change="handlePrimaryImage"
            class="border p-2"
            required
          />
          <div v-if="primaryImage" class="text-sm text-gray-600">
            Selected: {{ primaryImage.name }} ({{ (primaryImage.size / 1024).toFixed(2) }}KB)
          </div>
          <div
            v-if="primaryImage && primaryImage.size > 250 * 1024"
            class="text-red text-sm"
          >
            Image must be under 250KB
          </div>
        </div>
        <div>
          <label for="galleryImages" class="font-bold">Gallery Images (Optional, max 250KB each):</label>
          <input
            id="galleryImages"
            type="file"
            accept="image/*"
            @change="handleGalleryImages"
            multiple
            class="border p-2"
          />
          <div v-if="galleryImages.length > 0" class="text-sm text-gray-600">
            Selected {{ galleryImages.length }} images
          </div>
          <ul class="list-disc pl-5 mt-1">
            <li v-for="(image, index) in galleryImages" :key="index">
              {{ image.name }} ({{ (image.size / 1024).toFixed(2) }} KB)
            </li>
          </ul>
        </div>
        <div
          v-if="galleryImages.some((img) => img.size > 250 * 1024)"
          class="text-red-500 text-sm"
        >
          Some images exceed 250KB and won't be uploaded
        </div>

        <div
          v-for="(subItinerary, subIndex) in form.sub_itineraries"
          :key="subIndex"
          class="border p-4 mb-4"
        >
          <h3 class="font-bold mb-2">Sub-Itinerary #{{ subIndex + 1 }}</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label>Duration Days:</label>
              <input
                v-model.number="subItinerary.duration_days"
                type="number"
                min="1"
                class="border border-black h-[42px] p-[8px]"
                required
              />
            </div>
            <div>
              <label>Duration Nights:</label>
              <input
                v-model.number="subItinerary.duration_nights"
                type="number"
                min="0"
                class="border border-black h-[42px] p-[8px]"
                required
              />
            </div>
            <div>
              <label>Price (Ksh):</label>
              <input
                v-model.number="subItinerary.price"
                type="number"
                min="0"
                step="0.01"
                class="border border-black h-[42px] p-[8px]"
                required
              />
            </div>
          </div>
          
          <div>
            <label>Special Notes:</label>
            <textarea
              v-model="subItinerary.special_notes"
              class="border border-black w-full p-2"
            ></textarea>
          </div>

          <h4 class="font-bold mt-4 mb-2">Day Plans</h4>
          <div
            v-for="(dayPlan, dayIndex) in subItinerary.day_plans"
            :key="dayIndex"
            class="border p-3 mb-3"
          >
            <h5>Day {{ dayPlan.day_number }}</h5>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label>Location:</label>
                <input
                  v-model="dayPlan.location"
                  class="border border-black h-[42px] p-[8px]"
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  v-model="dayPlan.description"
                  class="border border-black w-full p-2"
                  required
                ></textarea>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Accommodation:</label>
                <select
                  v-model="dayPlan.accommodation_id"
                  class="border border-black h-[42px] p-[8px]"
                >
                  <option :value="null">Select Accommodation</option>
                  <option
                    v-for="acc in accommodations"
                    :key="acc.accommodation_id"
                    :value="acc.accommodation_id"
                  >
                    {{ acc.name }} ({{ acc.location }})
                  </option>
                </select>
              </div>
              
            </div>
          </div>
          
          <button
            type="button"
            @click="addDayPlan(subIndex)"
            class="bg-blue-100 p-2 rounded mb-4"
          >
            + Add Day Plan
          </button>
        </div>

        <button
          type="button"
          @click="addSubItinerary"
          class="bg-green-100 p-2 rounded mb-4"
        >
          + Add Sub-Itinerary
        </button>

        <button
          type="submit"
          class="bg-blue-500 text-white p-2 rounded hover:bg-green-900 transition"
          :disabled="loading"
        >
          {{ loading ? "Submitting..." : "Submit Itinerary" }}
        </button>
        <div
          v-if="message"
          :class="[
            'p-2 rounded',
            error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700',
          ]"
        >
          {{ message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

interface DayPlan {
  day_number: number;
  location: string;
  description: string;
  activities_summary?: string;
  accommodation_id?: number | null;
  night_number?: number | null;
}

interface SubItinerary {
  duration_days: number;
  duration_nights: number;
  price: number;
  special_notes?: string;
  day_plans: DayPlan[];
}

interface ItineraryForm {
  title: string;
  country_id: number;
  overview: string;
  best_season: string;
  main_destination: string;
  destination_description: string;
  destination_location: string;
  sub_itineraries: SubItinerary[];
}

const form = ref<ItineraryForm>({
  title: "",
  country_id: 0,
  overview: "",
  best_season: "",
  main_destination: "",
  destination_description: "",
  destination_location: "",
  sub_itineraries: [
    {
      duration_days: 1,
      duration_nights: 0,
      price: 0,
      special_notes: "",
      day_plans: [
        {
          day_number: 1,
          location: "",
          description: "",
          accommodation_id: null,
          
        },
      ],
    },
  ],
});

const primaryImage = ref<File | null>(null);
const galleryImages = ref<File[]>([]);
const loading = ref(false);
const message = ref("");
const error = ref(false);
const countries = ref<{ country_id: number; name: string }[]>([]);
const accommodations = ref<{ accommodation_id: number; name: string; location: string }[]>([]);
const formElement = ref<HTMLFormElement>();

// Helper functions
const addSubItinerary = () => {
  form.value.sub_itineraries.push({
    duration_days: 1,
    duration_nights: 0,
    price: 0,
    special_notes: "",
    day_plans: [
      {
        day_number: form.value.sub_itineraries.at(-1)?.day_plans.length || 1,
        location: "",
        description: "",
        accommodation_id: null,
        
      },
    ],
  });
};

const addDayPlan = (subItineraryIndex: number) => {
  const subItinerary = form.value.sub_itineraries[subItineraryIndex];
  const dayNumber = subItinerary.day_plans.length + 1;
  subItinerary.day_plans.push({
    day_number: dayNumber,
    location: "",
    description: "",
    accommodation_id: null,
    
  });
};

const attachAccommodation = async (
  itineraryId: number,
  subItineraryId: number,
  accommodation_id: number,
  
) => {
  if (!accommodation_id  === null) {
    error.value = true;
    message.value = "Please select both accommodation and night number";
    return;
  }

  try {
    await axios.post(
      `http://127.0.0.1:8000/api/itineraries/${itineraryId}/sub-itineraries/${subItineraryId}/accommodations`,
      { accommodation_id, }
    );
    message.value = "Accommodation attached successfully";
    error.value = false;
  } catch (err: any) {
    error.value = true;
    message.value = err.response?.data?.message || "Failed to attach accommodation";
    throw err; // Re-throw to handle in calling function
  }
};

// Image handlers
const handlePrimaryImage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) {
    const file = input.files[0];
    if (file.size > 250 * 1024) {
      error.value = true;
      message.value = "Primary image must be under 250kb";
      input.value = "";
      primaryImage.value = null;
    } else {
      primaryImage.value = file;
      error.value = false;
      message.value = "";
    }
  }
};

const handleGalleryImages = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const files = Array.from(input.files);
    const validFiles = files.filter(file => file.size <= 250 * 1024);
    galleryImages.value = validFiles;

    if (validFiles.length !== files.length) {
      error.value = true;
      message.value = "Some images exceeded 250KB and were not selected";
    } else {
      error.value = false;
      message.value = "";
    }
  }
};

// Data fetchers
const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/countries`);
    countries.value = data;
  } catch (err: any) {
    handleError(err, "Failed to fetch countries");
  }
};

const fetchAccommodations = async () => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/accommodations`, {
      params: { minimal: true }
    });
    accommodations.value = Array.isArray(data) ? data : data.data;
  } catch (err: any) {
    handleError(err, "Failed to fetch accommodations");
  }
};

// Form handlers
const resetForm = () => {
  form.value = {
    title: "",
    country_id: 0,
    overview: "",
    best_season: "",
    main_destination: "",
    destination_description: "",
    destination_location: "",
    sub_itineraries: [
      {
        duration_days: 1,
        duration_nights: 0,
        price: 0,
        special_notes: "",
        day_plans: [
          {
            day_number: 1,
            location: "",
            description: "",
            accommodation_id: null,
            
          },
        ],
      },
    ],
  };
  primaryImage.value = null;
  galleryImages.value = [];
  formElement.value?.reset();
};

const handleError = (err: any, defaultMessage: string) => {
  error.value = true;
  message.value = err.response?.data?.message || defaultMessage;
  console.error(err);
};

// Main submission
const submitItinerary = async () => {
  if (!primaryImage.value) {
    error.value = true;
    message.value = "Primary Image is required";
    return;
  }

  loading.value = true;
  error.value = false;
  message.value = "";

  try {
    // Prepare form data
    const formData = new FormData();
    Object.entries({
      title: form.value.title,
      country_id: form.value.country_id,
      overview: form.value.overview,
      best_season: form.value.best_season,
      main_destination: form.value.main_destination,
      destination_description: form.value.destination_description,
      destination_location: form.value.destination_location,
    }).forEach(([key, value]) => formData.append(key, String(value)));

    // Add images
    if (primaryImage.value) formData.append("primary_image", primaryImage.value);
    galleryImages.value.forEach((file, index) => {
      formData.append(`gallery_images[${index}]`, file);
    });

    // Add sub-itineraries and day plans
    form.value.sub_itineraries.forEach((sub, subIndex) => {
      Object.entries({
        duration_days: sub.duration_days,
        duration_nights: sub.duration_nights,
        price: sub.price,
        ...(sub.special_notes && { special_notes: sub.special_notes })
      }).forEach(([key, value]) => {
        formData.append(`sub_itineraries[${subIndex}][${key}]`, String(value));
      });

      sub.day_plans.forEach((day, dayIndex) => {
        Object.entries({
          day_number: day.day_number,
          location: day.location,
          description: day.description,
          ...(day.activities_summary && { activities_summary: day.activities_summary })
        }).forEach(([key, value]) => {
          formData.append(`sub_itineraries[${subIndex}][day_plans][${dayIndex}][${key}]`, String(value));
        });
      });
    });

    // Submit itinerary
    const { data } = await axios.post(`http://127.0.0.1:8000/api/itineraries`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    // Attach accommodations
    
    for (const [subIndex, subItinerary] of form.value.sub_itineraries.entries()) {
  const subItineraryData = data.itinerary.sub_itineraries[subIndex];
  
  // Proper type narrowing with null check
  if (!subItineraryData || typeof subItineraryData.sub_itinerary_id !== 'number') {
    console.error(`Missing or invalid sub_itinerary_id for sub-itinerary at index ${subIndex}`);
    continue;
  }

  const subItineraryId: number = subItineraryData.sub_itinerary_id;

  for (const dayPlan of subItinerary.day_plans) {
    if (dayPlan.accommodation_id  !== null) {
      await attachAccommodation(
        data.itinerary.itinerary_id,
        subItineraryId,
        dayPlan.accommodation_id,
        
      );
    }
  }
}
    message.value = "Itinerary created successfully!";
    resetForm();
  } catch (err: any) {
    handleError(err, "Failed to create itinerary");
  } finally {
    loading.value = false;
  }
};

// Initialize
fetchCountries();
fetchAccommodations();
</script>