<template>
  <div class="flex flex-row">
    <Dashhead />
    <div class="p-[10px] flex flex-col gap-[10px]">
      <div class="font-bold">ADD A NEW ACCOMMODATION</div>
      <form
        ref="formElement"
        @submit.prevent="submitAccommodation"
        class="flex flex-col gap-[40px] md:gap-[25px]"
      >
        <div>
          <label class="" for="name">Name :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Use Capital Letters"
            required
            @input="(event:Event) => form.name = (event.target as HTMLInputElement).value.toUpperCase()"
          />
        </div>
        <div>
          <label for="country_id">Country</label>
          <select
            class="border border-black h-[42px] p-[8px]"
            v-model="form.country_id"
            id="country_id"
            required
          >
            <option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="font-bold" for="description">Description :</label>
          <textarea
            class="border border-black w-full h-[250px] p-[8px]"
            v-model="form.description"
            id="description"
            placeholder="A brief description, do not exceep 200 words, follow paragraph rules"
          ></textarea>
        </div>
        <div>
          <label class="font-bold">Type :</label>
          <select
            class="border border-blck h-[42px] p-[8px]"
            v-model="form.type"
            id="type"
            required
          >
            <option class="w-full" value="Lodge">Lodge</option>
            <option class="w-full" value="Camp">Camp</option>
            <option class="w-full" value="Hotel">Hotel</option>
            <option class="w-full" value="Tented Camp">Tented Camp</option>
            <option class="w-full" value="Resort">Resort</option>
            <option class="w-full" value="Airbnb">Airbnb</option>
          </select>
        </div>
        <div>
          <label class="font-bold" for="rating">Rating :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model.number="form.rating"
            type="number"
            id="rating"
            min="0"
            max="5"
            step="0.1"
            required
            @wheel.prevent
          />
        </div>

        <div>
          <label class="font-bold" for="website_url">Website link :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.website_url"
            type="text"
            id="website_url"
            required
          />
        </div>

        <div>
          <label class="font-bold" for="location">Location :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.location"
            type="text"
            id="location"
            required
          />
        </div>
        <div>
          <label for="features" class="font-bold">Features :</label>
          <textarea
            id="features"
            v-model="featuresText"
            class="border border-black w-full h-[250px] p-[8px]"
            placeholder="Enter one feature per line:
- Swimming pool
- Free WiFi
- Gym"
          ></textarea>
        </div>

        <div>
          <label for="primaryImage" class="font-bold"
            >Primary Image(Required max 250kb) :</label
          >
          <input
            id="primaryImage"
            type="file"
            accept="image/*"
            @change="handlePrimaryImage"
            class="border p-2"
            required
          />
          <div v-if="primaryImage" class="text-sm text-gray-600">
            Selected: {{ primaryImage.name }} ({{
              (primaryImage.size / 1024).toFixed(2)
            }}KB)
          </div>
          <div
            v-if="primaryImage && primaryImage.size > 250 * 1024"
            class="text-red text-sm"
          >
            Image must be under 250KB
          </div>
        </div>
        <div>
          <label for="galleryImages" class="font-bold"
            >Gallery Images (Optional, max 250KB each):</label
          >
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
        <button
          type="submit"
          class="bg-blue-500 text-white p-2 rounded hover:bg-green-900 0 transition"
          :disabled="loading"
        >
          {{ loading ? "Submitting...." : "Submit Accommodation" }}
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
import { data } from "autoprefixer";
import axios from "axios";
import { ref } from "vue";

interface AccommodationForm {
  country_id: number;
  name: string;
  description: string;
  type: "Lodge" | "Camp" | "Hotel" | "Tented Camp" | "Resort" | "Airbnb";
  rating: number;
  website_url: string;
  features: { feature_name: string }[];
  location: string;
}
const form = ref<AccommodationForm>({
  country_id: 0,
  name: "",
  description: "",
  type: "Lodge",
  rating: 0,
  website_url: "",
  features: [],
  location: "",
});

const primaryImage = ref<File | null>(null);
const galleryImages = ref<File[]>([]);
const loading = ref(false);
const message = ref("");
const error = ref(false);
const imessage = ref("");
const countries = ref<{ id: number; name: string }[]>([]);
const featuresText = ref("");
const formElement = ref<HTMLFormElement>();

const handlePrimaryImage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    if (input.files[0].size > 250 * 1024) {
      error.value = true;
      message.value = "Primary image must be under 250kb";
      input.value = "";
      primaryImage.value = null;
    } else {
      primaryImage.value = input.files[0];
      error.value = false;
      imessage.value = "";
    }
  }
};

const handleGalleryImages = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const files = Array.from(input.files);

    const validFiles = files.filter((file) => file.size <= 250 * 1024);

    galleryImages.value = validFiles;

    if (validFiles.length !== files.length) {
      error.value = true;
      imessage.value = "Some images exceeded 250KB and were not selected";
    } else {
      error.value = false;
      message.value = "";
    }

    input.value = "";
  }
};

const fetchCountries = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/countries`);
    countries.value = response.data;
  } catch (err: any) {
    error.value = true;
    message.value = err.response?.data?.message || "Failed to fetch countries";
  }
};
fetchCountries();

const resetForm = () => {
  form.value = {
    country_id: 0,
    name: "",
    description: "",
    rating: 0,
    type: "Lodge",
    website_url: "",
    features: [],
    location: "",
  };
  featuresText.value = "";
  primaryImage.value = null;
  galleryImages.value = [];
  formElement.value?.reset();
};

const submitAccommodation = async () => {
  if (!primaryImage.value) {
    error.value = true;
    message.value = "Primary Image is required";
    return;
  }

  form.value.features = featuresText.value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((feature_name) => ({ feature_name }));

  loading.value = true;

  try {
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("description", form.value.description);
    formData.append("country_id", form.value.country_id.toString());
    formData.append("location", form.value.type);
    formData.append("type", form.value.type);
    formData.append("rating", form.value.rating.toString());
    formData.append("website_url", form.value.website_url);

    if (primaryImage.value) {
      formData.append(`primary_image`, primaryImage.value);
    }
    galleryImages.value.forEach((file, index) => {
      formData.append(`gallery_images[${index}]`, file);
    });
    form.value.features.forEach((feature, index) => {
      formData.append(`features[${index}][feature_name]`, feature.feature_name);
    });
    const response = await axios.post(
      `http://127.0.0.1:8000/api/accommodations`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    message.value =
      response.data.message || "Accommodation created successfully";
    error.value = false;
    resetForm();

    setTimeout(() => {
      message.value = "";
    }, 9000);
  } catch (err: any) {
    error.value = true;
    message.value =
      err.response?.data?.message || "Failed to post Accommodation";
  } finally {
    loading.value = false;
  }
};
</script>
