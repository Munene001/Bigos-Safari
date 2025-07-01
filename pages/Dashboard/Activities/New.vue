<template>
  <div class="flex flex-row">
    <Dashhead />
    <div class="p-[10px] flex flex-col gap-[10px]">
      <div class="font-bold">ADD A NEW ACTIVITY</div>
      <form
        ref="formElement"
        @submit.prevent="submitActivity"
        class="flex flex-col gap-[40px] md:gap-[25px]"
      >
        <div>
          <label class="" for="activity_name">Name :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.activity_name"
            type="text"
            id="activity_name"
            placeholder="Use Capital Letters"
            required
            @input="(event:Event) => form.activity_name = (event.target as HTMLInputElement).value.toUpperCase()"
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
          <label class="font-bold" for="duration_hours">Duration Hours :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model.number="form.duration_hours"
            type="number"
            id="duration_hours"
            step="0.1"
            required
            @wheel.prevent
          />
        </div>

        <div>
          <label class="font-bold" for="difficulty_level">Difficulty Level :</label>
          <input
            class="border border-black h-[42px] p-[8px]"
            v-model="form.difficulty_level"
            type="text"
            id="difficulty_level"
            required
          />
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
          {{ loading ? "Submitting...." : "Submit Activity" }}
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

interface ActivityForm {
  country_id: number;
  activity_name: string;
  description: string;
  difficulty_level: string;
  duration_hours: number;
}
const form = ref<ActivityForm>({
  country_id: 0,
  activity_name: "",
  description: "",
  difficulty_level: "",
  duration_hours: 0,
});

const primaryImage = ref<File | null>(null);
const galleryImages = ref<File[]>([]);
const loading = ref(false);
const message = ref("");
const error = ref(false);
const imessage = ref("");
const countries = ref<{ id: number; name: string }[]>([]);
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
    activity_name: "",
    description: "",
    difficulty_level: "",
    duration_hours: 0,
  };

  primaryImage.value = null;
  galleryImages.value = [];
  formElement.value?.reset();
};

const submitActivity = async () => {
  if (!primaryImage.value) {
    error.value = true;
    message.value = "Primary Image is required";
    return;
  }

  loading.value = true;

  try {
    const formData = new FormData();
    formData.append("activity_name", form.value.activity_name);
    formData.append("description", form.value.description);
    formData.append("country_id", form.value.country_id.toString());
    formData.append("difficulty_level", form.value.difficulty_level);
    formData.append("duration_hours", form.value.duration_hours.toString());

    if (primaryImage.value) {
      formData.append(`primary_image`, primaryImage.value);
    }
    galleryImages.value.forEach((file, index) => {
      formData.append(`gallery_images[${index}]`, file);
    });
   
    const response = await axios.post(
      `http://127.0.0.1:8000/api/activities`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    message.value =
      response.data.message || "Activity created successfully";
    error.value = false;
    resetForm();

    setTimeout(() => {
      message.value = "";
    }, 9000);
  } catch (err: any) {
    error.value = true;
    message.value =
      err.response?.data?.message || "Failed to post Activity";
  } finally {
    loading.value = false;
  }
};
</script>
