<template>
    <div class="flex flex-row">
      <Dashhead />
      <div class="p-[10px] flex flex-col gap-[10px] w-full">
        <div class="font-bold text-xl mb-4">CREATE NEW COUNTRY</div>
        
        <form @submit.prevent="createCountry" class="flex flex-col gap-6 max-w-3xl">
          <!-- Country Name -->
          <div>
            <label class="font-bold block mb-2">Country Name:</label>
            <input
              v-model="countryForm.name"
              class="border border-gray-300 rounded h-[42px] p-[8px] w-full"
              placeholder="Enter country name"
              required
            />
          </div>
          
          <!-- Overview -->
          <div>
            <label class="font-bold block mb-2">Overview:</label>
            <textarea
              v-model="countryForm.overview"
              class="border border-gray-300 rounded w-full h-[150px] p-[8px]"
              placeholder="Brief overview of the country (min 20 characters)"
              required
            ></textarea>
          </div>
          
          <!-- About -->
          <div>
            <label class="font-bold block mb-2">About:</label>
            <textarea
              v-model="countryForm.about"
              class="border border-gray-300 rounded w-full h-[150px] p-[8px]"
              placeholder="Detailed description of the country (min 20 characters)"
              required
            ></textarea>
          </div>
          
          <!-- Best Time to Visit -->
          <div>
            <label class="font-bold block mb-2">Best Time to Visit:</label>
            <input
              v-model="countryForm.best_time_to_visit"
              class="border border-gray-300 rounded h-[42px] p-[8px] w-full"
              placeholder="e.g. June to October"
              required
            />
          </div>
          
          <!-- Country Image -->
          <div>
            <label class="font-bold block mb-2">Country Image (max 250KB):</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              @change="handleImageUpload"
              class="border border-gray-300 rounded p-2 w-full"
              required
            />
            <div v-if="imagePreview" class="mt-4">
              <img :src="imagePreview" class="max-w-[300px] max-h-[200px] object-contain border" />
              <p class="text-sm text-gray-600 mt-1">
                {{ imageFile?.name }} ({{ (imageFile.size / 1024).toFixed(2) }}KB)
                <span v-if="imageFile.size > 250 * 1024" class="text-red-500">
                  - Image exceeds 250KB limit
                </span>
              </p>
            </div>
          </div>
          
          <!-- FAQs Section -->
          <div class="border-t pt-4">
            <div class="font-bold mb-4">FAQs (Optional)</div>
            <div v-for="(faq, index) in countryForm.faqs" :key="index" class="mb-6 border-b pb-4">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium">FAQ #{{ index + 1 }}</h3>
                <button 
                  type="button" 
                  @click="removeFaq(index)"
                  class="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <div class="mb-3">
                <label class="block mb-1">Question:</label>
                <input
                  v-model="faq.question"
                  class="border border-gray-300 rounded h-[42px] p-[8px] w-full"
                  placeholder="Enter question"
                />
              </div>
              <div>
                <label class="block mb-1">Answer:</label>
                <textarea
                  v-model="faq.answer"
                  class="border border-gray-300 rounded w-full h-[80px] p-[8px]"
                  placeholder="Enter answer"
                ></textarea>
              </div>
            </div>
            <button
              type="button"
              @click="addFaq"
              class="bg-gray-100 hover:bg-gray-200 p-2 rounded text-sm"
            >
              + Add FAQ
            </button>
          </div>
          
          <!-- Parks Section -->
          <div class="border-t pt-4">
            <div class="font-bold mb-4">Parks (Optional)</div>
            <div v-for="(park, index) in countryForm.parks" :key="index" class="mb-6 border-b pb-4">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium">Park #{{ index + 1 }}</h3>
                <button 
                  type="button" 
                  @click="removePark(index)"
                  class="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-1">Park Name:</label>
                  <input
                    v-model="park.name"
                    class="border border-gray-300 rounded h-[42px] p-[8px] w-full"
                    placeholder="Enter park name"
                  />
                </div>
                <div>
                  <label class="block mb-1">Location:</label>
                  <input
                    v-model="park.location"
                    class="border border-gray-300 rounded h-[42px] p-[8px] w-full"
                    placeholder="Enter location"
                  />
                </div>
              </div>
              <div class="mt-3">
                <label class="block mb-1">Description:</label>
                <textarea
                  v-model="park.description"
                  class="border border-gray-300 rounded w-full h-[80px] p-[8px]"
                  placeholder="Enter description"
                ></textarea>
              </div>
              <div class="mt-3">
                <label class="block mb-1">Best Time to Visit:</label>
                <input
                  v-model="park.best_time_to_visit"
                  class="border border-gray-300 rounded h-[42px] p-[8px] w-full"
                  placeholder="e.g. July to October"
                />
              </div>
              <div class="mt-3">
                <label class="block mb-1">Highlights:</label>
                <input
                  v-model="park.highlights"
                  class="border border-gray-300 rounded h-[42px] p-[8px] w-full"
                  placeholder="e.g. Wildlife, Scenery"
                />
              </div>
              <div class="mt-3">
                <label class="block mb-1">Park Image (max 250KB):</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  @change="(e) => handleParkImage(e, index)"
                  class="border border-gray-300 rounded p-2 w-full"
                />
                <div v-if="park.imagePreview" class="mt-2">
                  <img :src="park.imagePreview" class="max-w-[200px] max-h-[150px] object-contain border" />
                </div>
              </div>
            </div>
            <button
              type="button"
              @click="addPark"
              class="bg-gray-100 hover:bg-gray-200 p-2 rounded text-sm"
            >
              + Add Park
            </button>
          </div>
          
          <!-- Submit Button -->
          <div class="mt-6">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Creating Country...' : 'Create Country' }}
            </button>
            <div v-if="message" :class="[
              'mt-3 p-3 rounded',
              isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            ]">
              {{ message }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  interface Faq {
    question: string;
    answer: string;
  }
  
  interface Park {
    name: string;
    description: string;
    location: string;
    best_time_to_visit: string;
    highlights: string;
    image?: File;
    imagePreview?: string;
  }
  
  const countryForm = ref({
    name: '',
    overview: '',
    about: '',
    best_time_to_visit: '',
    faqs: [] as Faq[],
    parks: [] as Park[]
  });
  
  const imageFile = ref<File | null>(null);
  const imagePreview = ref<string | null>(null);
  const isSubmitting = ref(false);
  const message = ref('');
  const isError = ref(false);
  
  const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      imageFile.value = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target?.result as string;
      };
      reader.readAsDataURL(imageFile.value);
    }
  };
  
  const handleParkImage = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      countryForm.value.parks[index].image = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        countryForm.value.parks[index].imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addFaq = () => {
    countryForm.value.faqs.push({
      question: '',
      answer: ''
    });
  };
  
  const removeFaq = (index: number) => {
    countryForm.value.faqs.splice(index, 1);
  };
  
  const addPark = () => {
    countryForm.value.parks.push({
      name: '',
      description: '',
      location: '',
      best_time_to_visit: '',
      highlights: ''
    });
  };
  
  const removePark = (index: number) => {
    countryForm.value.parks.splice(index, 1);
  };
  
  const createCountry = async () => {
    // Validate image size
    if (imageFile.value && imageFile.value.size > 250 * 1024) {
      message.value = 'Country image must be under 250KB';
      isError.value = true;
      return;
    }
  
    // Validate required fields
    if (!countryForm.value.name || 
        !countryForm.value.overview || 
        !countryForm.value.about || 
        !countryForm.value.best_time_to_visit || 
        !imageFile.value) {
      message.value = 'Please fill all required fields';
      isError.value = true;
      return;
    }
  
    isSubmitting.value = true;
    message.value = '';
    isError.value = false;
  
    try {
      const formData = new FormData();
      formData.append('name', countryForm.value.name);
      formData.append('overview', countryForm.value.overview);
      formData.append('about', countryForm.value.about);
      formData.append('best_time_to_visit', countryForm.value.best_time_to_visit);
      formData.append('image', imageFile.value as Blob);
  
      // Add FAQs if any
      countryForm.value.faqs.forEach((faq, index) => {
        if (faq.question && faq.answer) {
          formData.append(`faqs[${index}][question]`, faq.question);
          formData.append(`faqs[${index}][answer]`, faq.answer);
        }
      });
  
      // Add Parks if any
      countryForm.value.parks.forEach((park, index) => {
        if (park.name) {
          formData.append(`parks[${index}][name]`, park.name);
          formData.append(`parks[${index}][description]`, park.description);
          formData.append(`parks[${index}][location]`, park.location);
          formData.append(`parks[${index}][best_time_to_visit]`, park.best_time_to_visit);
          formData.append(`parks[${index}][highlights]`, park.highlights);
          if (park.image) {
            formData.append(`parks[${index}][image]`, park.image as Blob);
          }
        }
      });
  
      const response = await axios.post('http://127.0.0.1:8000/api/countries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      message.value = 'Country created successfully!';
      isError.value = false;
      
      // Reset form after successful creation
      countryForm.value = {
        name: '',
        overview: '',
        about: '',
        best_time_to_visit: '',
        faqs: [],
        parks: []
      };
      imageFile.value = null;
      imagePreview.value = null;
    } catch (error: any) {
      message.value = error.response?.data?.message || 'Failed to create country';
      isError.value = true;
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>