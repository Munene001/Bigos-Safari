<template>
  <div class="flex flex-row">
    <Dashhead />
    <div class="p-4 max-w-4xl">
      <!-- Header -->
      <div class="mb-6 border-b border-orange-900 pb-2">
        <h1 class="text-2xl font-bold text-orange-900">EDIT ACCOMMODATION</h1>
      </div>

      <!-- Loading/Error States -->
      <div v-if="loading" class="text-center">
        <span class="animate-pulse">Loading accommodation details...</span>
      </div>
      <div
        v-else-if="initialLoadError"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
      >
        {{ initialLoadError }}
      </div>

      <!-- Main Form -->
      <form v-else @submit.prevent="submitAccommodation" class="space-y-6">
        <!-- Basic Information Section -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Title -->
          <div>
            <label class="block text-orange-900 font-medium mb-1" for="name"
              >Title*</label
            >
            <input
              class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              v-model="form.name"
              type="text"
              id="name"
              required
            />
            <span v-if="errors.name" class="text-red-500 text-sm">{{
              errors.name
            }}</span>
          </div>

          <!-- Country -->
          <div>
            <label
              class="block text-orange-900 font-medium mb-1"
              for="country_id"
              >Country*</label
            >
            <select
              class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              v-model="form.country_id"
              id="country_id"
              required
            >
              <option value="" disabled>Select a country</option>
              <option
                v-for="country in countries"
                :key="country.country_id"
                :value="country.country_id"
              >
                {{ country.name }}
              </option>
            </select>
            <span v-if="errors.country_id" class="text-red-500 text-sm">{{
              errors.country_id
            }}</span>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-orange-900 font-medium mb-1" for="location"
              >Location*</label
            >
            <input
              class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              v-model="form.location"
              type="text"
              id="location"
              placeholder="Format example: Kilimani, Nairobi"
              required
            />
            <span v-if="errors.location" class="text-red-500 text-sm">{{
              errors.location
            }}</span>
          </div>

          <!-- Website URL -->
          <div>
            <label
              class="block text-orange-900 font-medium mb-1"
              for="website_url"
              >Website URL</label
            >
            <input
              class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              v-model="form.website_url"
              type="url"
              id="website_url"
            />
            <span v-if="errors.website_url" class="text-red-500 text-sm">{{
              errors.website_url
            }}</span>
          </div>

          <!-- Accommodation Type -->
          <div>
            <label class="block text-orange-900 font-medium mb-1" for="type"
              >Type*</label
            >
            <select
              class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              v-model="form.type"
              id="type"
              required
            >
              <option value="" disabled>Select type</option>
              <option value="Lodge">Lodge</option>
              <option value="Camp">Camp</option>
              <option value="Hotel">Hotel</option>
              <option value="Tented Camp">Tented Camp</option>
              <option value="Resort">Resort</option>
              <option value="Airbnb">Airbnb</option>
            </select>
            <span v-if="errors.type" class="text-red-500 text-sm">{{
              errors.type
            }}</span>
          </div>

          <!-- Rating (Price) -->
          <div>
            <label class="block text-orange-900 font-medium mb-1" for="rating"
              >Price (KSH)*</label
            >
            <input
              class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              v-model.number="form.rating"
              type="number"
              id="rating"
              min="0"
              max="5"
              step="0.1"
              required
              @wheel.prevent
            />
            <span v-if="errors.rating" class="text-red-500 text-sm">{{
              errors.rating
            }}</span>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label
            class="block text-orange-900 font-medium mb-1"
            for="description"
            >Description*</label
          >
          <textarea
            class="w-full border border-gray-300 rounded p-2 h-40 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            v-model="form.description"
            id="description"
            placeholder="A brief description (200 words max)"
            required
          ></textarea>
          <span v-if="errors.description" class="text-red-500 text-sm">{{
            errors.description
          }}</span>
        </div>

        <!-- Features Section -->
        <div>
          <label class="block text-orange-900 font-medium mb-1">Features</label>
          <textarea
            class="w-full border border-gray-300 rounded p-2 h-32 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            v-model="featuresText"
            placeholder="Enter features, separated by commas or new lines"
          ></textarea>
          <p class="text-sm text-gray-500 mt-1">
            Separate features with commas or new lines
          </p>
          <span v-if="errors.features_text" class="text-red-500 text-sm">{{
            errors.features_text
          }}</span>
        </div>

        <!-- Primary Image -->
        <div>
          <label
            class="block text-orange-900 font-medium mb-1"
            for="primary_image"
            >Primary Image* (<250KB)</label
          >
          <input
            type="file"
            id="primary_image"
            accept="image/jpeg, image/png, image/webp"
            @change="handlePrimaryImageChange"
            class="hidden"
            ref="primaryImageInput"
          />
          <div class="flex items-center gap-4">
            <button
              @click.prevent="$refs.primaryImageInput.click()"
              class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300"
              type="button"
            >
              Choose File
            </button>
            <span v-if="primaryImage">{{ primaryImage.name }}</span>
          </div>
          <span v-if="errors.primary_image" class="text-red-500 text-sm">{{
            errors.primary_image
          }}</span>
          <div v-if="currentPrimaryImage" class="mt-4">
            <p class="text-sm text-gray-600 mb-1">Current Primary Image:</p>
            <img
              :src="'http://127.0.0.1:8000' + currentPrimaryImage"
              class="w-64 h-48 object-cover rounded border"
            />
          </div>
        </div>

        <!-- Gallery Images -->
        <div>
          <label
            class="block text-orange-900 font-medium mb-1"
            for="gallery_images"
            >Gallery Images (<250KB each)</label
          >
          <input
            type="file"
            id="gallery_images"
            accept="image/jpeg, image/png, image/webp"
            multiple
            @change="handleGalleryImagesChange"
            class="hidden"
            ref="galleryImagesInput"
          />
          <div class="flex items-center gap-4">
            <button
              @click.prevent="$refs.galleryImagesInput.click()"
              class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300"
              type="button"
            >
              Choose Files
            </button>
            <span v-if="galleryImages.length"
              >Selected {{ galleryImages.length }} images</span
            >
          </div>
          <span v-if="errors.gallery_images" class="text-red-500 text-sm">{{
            errors.gallery_images
          }}</span>

          <!-- Current Gallery Images -->
          <div v-if="currentGalleryImages.length > 0" class="mt-4">
            <p class="text-sm text-gray-600 mb-2">Current Gallery Images:</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div
                v-for="(image, index) in currentGalleryImages"
                :key="image.image_id"
                class="relative group"
              >
                <img
                  :src="'http://127.0.0.1:8000' + image.image_url"
                  class="w-full h-32 object-cover rounded border"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-200"
                >
                  <button
                    @click.prevent="markImageForDeletion(image.image_id)"
                    class="opacity-0 group-hover:opacity-100 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-200"
                  >
                    ×
                  </button>
                  <button
                    v-if="!image.is_primary"
                    @click.prevent="setNewPrimaryImage(image.image_id)"
                    class="opacity-0 group-hover:opacity-100 text-white bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-200 ml-2"
                    title="Set as primary"
                  >
                    ★
                  </button>
                </div>
                <span
                  v-if="image.is_primary"
                  class="absolute top-1 left-1 bg-orange-500 text-white text-xs px-2 py-1 rounded"
                  >Primary</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button
            class="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded transition-colors"
            type="submit"
            :disabled="submitting"
          >
            <span v-if="submitting">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </span>
            <span v-else>Update Property</span>
          </button>
        </div>

        <!-- Success Message -->
        <div
          v-if="message"
          class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
        >
          {{ message }}
        </div>

        <!-- Form Error Message -->
        <div
          v-if="formError"
          class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        >
          {{ formError }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Image {
  image_id: number;
  accommodation_id: number;
  image_url: string;
  is_primary: boolean;
  caption: string;
}

interface Country {
  country_id: number;
  name: string;
}

interface AccommodationForm {
  accommodation_id: number;
  country_id: number;
  name: string;
  description: string;
  type: "Lodge" | "Camp" | "Hotel" | "Tented Camp" | "Resort" | "Airbnb";
  rating: number;
  website_url: string;
  location: string;
  created_at: string;
  images: Image[];
}

// Form state
const form = ref<AccommodationForm>({
  accommodation_id: 0,
  country_id: 0,
  name: "",
  description: "",
  type: "Lodge",
  rating: 0,
  website_url: "",
  location: "",
  created_at: "",
  images: [],
});

// UI state
const loading = ref(true);
const submitting = ref(false);
const initialLoadError = ref("");
const formError = ref("");
const message = ref("");
const errors = ref<Record<string, string>>({});

// Image handling
const primaryImage = ref<File | null>(null);
const galleryImages = ref<File[]>([]);
const currentPrimaryImage = ref<string>("");
const currentGalleryImages = ref<Image[]>([]);
const imagesToDelete = ref<number[]>([]);
const newPrimaryImageId = ref<number | null>(null);

// Data
const countries = ref<Country[]>([]);
const featuresText = ref("");

const route = useRoute();
const router = useRouter();

// Fetch countries list
const fetchCountries = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/countries`);
    countries.value = response.data;
  } catch (err) {
    console.error("Failed to fetch countries", err);
    initialLoadError.value =
      "Failed to load countries list. Please refresh the page.";
  }
};

// Fetch accommodation details
const fetchAccommodation = async () => {
  const accommodation_id = route.params.id as string;
  loading.value = true;
  initialLoadError.value = "";

  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/accommodation/${accommodation_id}`,
      {
        params: {
          with_images: true,
          with_feature: true,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    form.value = response.data;

    // Set features text
    featuresText.value = response.data.features
      .map((f: any) => f.feature_name)
      .join("\n");

    // Handle images
    if (response.data.images) {
      const primary = response.data.images.find((img: Image) => img.is_primary);
      if (primary) {
        currentPrimaryImage.value = primary.image_url;
        newPrimaryImageId.value = primary.image_id;
      }
      currentGalleryImages.value = response.data.images.filter(
        (img: Image) => !img.is_primary
      );
    }
  } catch (err: any) {
    console.error("Failed to fetch accommodation:", err);
    initialLoadError.value =
      err.response?.data?.message || "Failed to load accommodation details";
  } finally {
    loading.value = false;
  }
};

// Handle primary image change
const handlePrimaryImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    primaryImage.value = target.files[0];
    currentPrimaryImage.value = URL.createObjectURL(target.files[0]);
    newPrimaryImageId.value = null; // Reset any existing primary image selection
  }
};

// Handle gallery images change
const handleGalleryImagesChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    galleryImages.value = Array.from(target.files);
  }
};

// Mark image for deletion
const markImageForDeletion = (imageId: number) => {
  imagesToDelete.value.push(imageId);
  currentGalleryImages.value = currentGalleryImages.value.filter(
    (img) => img.image_id !== imageId
  );
};

// Set new primary image
const setNewPrimaryImage = (imageId: number) => {
  newPrimaryImageId.value = imageId;
  const newPrimary = currentGalleryImages.value.find(
    (img) => img.image_id === imageId
  );
  if (newPrimary) {
    currentPrimaryImage.value = newPrimary.image_url;
  }
};

// Validate form before submission
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!form.value.name) {
    errors.value.name = "Title is required";
    isValid = false;
  }

  if (!form.value.country_id) {
    errors.value.country_id = "Country is required";
    isValid = false;
  }

  if (!form.value.location) {
    errors.value.location = "Location is required";
    isValid = false;
  }

  if (!form.value.type) {
    errors.value.type = "Type is required";
    isValid = false;
  }

  if (form.value.rating === null || form.value.rating === undefined) {
    errors.value.rating = "Rating is required";
    isValid = false;
  } else if (form.value.rating < 0 || form.value.rating > 5) {
    errors.value.rating = "Rating must be between 0 and 5";
    isValid = false;
  }

  if (!form.value.description) {
    errors.value.description = "Description is required";
    isValid = false;
  }

  return isValid;
};

// Submit accommodation form
const submitAccommodation = async () => {
  submitting.value = true;
  try {
    const formData = new FormData();

    // 1. First append ALL regular fields (non-file)
    formData.append('name', form.value.name);
    formData.append('description', form.value.description);
    formData.append('location', form.value.location);
    formData.append('type', form.value.type);
    formData.append('website_url', form.value.website_url || '');
    formData.append('rating', form.value.rating.toString());
    formData.append('country_id', form.value.country_id.toString());
    formData.append('features_text', featuresText.value);
    
    // 2. Then append array fields
    imagesToDelete.value.forEach(id => {
      formData.append('images_to_delete[]', id.toString());
    });

    // 3. Only THEN append file fields
    if (primaryImage.value) {
      formData.append('primary_image', primaryImage.value);
    }
    
    galleryImages.value.forEach(file => {
      formData.append('gallery_images[]', file);
    });

    // 4. Finally append any special fields
    if (newPrimaryImageId.value) {
      formData.append('new_primary_image_id', newPrimaryImageId.value.toString());
    }

    // Critical debugging - verify what's actually being sent
    console.log('Final FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await axios.put(
      `http://127.0.0.1:8000/api/accommodations/${form.value.accommodation_id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    message.value = 'Accommodation updated successfully';
    await fetchAccommodation();
  } catch (err: any) {
    if (err.response?.status === 422) {
      errors.value = err.response.data.errors;
      formError.value = 'Validation failed. Please check all fields.';
      
      // Scroll to first error
      const firstError = Object.keys(errors.value)[0];
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    } else {
      formError.value = err.response?.data?.message || 
        'Update failed. Please try again.';
    }
  } finally {
    submitting.value = false;
  }
};


// Initialize component
onMounted(async () => {
  try {
    await Promise.all([fetchCountries(), fetchAccommodation()]);
  } catch (err) {
    console.error("Initialization error:", err);
    initialLoadError.value =
      "Failed to load required data. Please refresh the page.";
  }
});
</script>
