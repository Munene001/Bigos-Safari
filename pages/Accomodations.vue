<template>
    <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <!-- Filter Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Filter Activities</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Country Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select 
              v-model="filters.country_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option :value="null">All Countries</option>
              <option v-for="country in countries" :key="country.id" :value="country.id">
                {{ country.name }}
              </option>
            </select>
          </div>
  
          <!-- Activity Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Activity Name</label>
            <input 
              v-model="filters.activity_name"
              type="text"
              placeholder="Enter activity name..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <!-- Difficulty Level -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
            <select 
              v-model="filters.difficulty_level"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option :value="null">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
              <option value="expert">Expert</option>
            </select>
          </div>
  
          <!-- Duration Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Duration (Hours)</label>
            <div class="flex space-x-2">
              <input 
                v-model.number="filters.min_duration"
                type="number"
                placeholder="Min hours"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input 
                v-model.number="filters.max_duration"
                type="number"
                placeholder="Max hours"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          <!-- Search -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              v-model="filters.search"
              type="text"
              placeholder="Search in activity name and description..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <!-- Actions -->
          <div class="flex items-end space-x-3">
            <button 
              @click="applyFilters"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Apply Filters
            </button>
            <button 
              @click="resetFilters"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
  
      <!-- Results Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p class="text-gray-600">Loading activities...</p>
        </div>
  
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <p class="text-red-600 text-lg mb-4">{{ error }}</p>
          <button 
            @click="fetchActivities"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="activities.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-gray-600 text-lg">No activities found matching your criteria.</p>
        </div>
  
        <!-- Results Grid -->
        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-800">
              {{ total }} Activities Found
            </h3>
            <div class="text-sm text-gray-600">
              Page {{ currentPage }} of {{ lastPage }}
            </div>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="activity in activities" 
              :key="activity.id"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <NuxtLink :to="`/activity/${activity.id}`" class="block">
                <!-- Image Section -->
                <div class="relative h-48 overflow-hidden">
                  <img
                    :src="getPrimaryImage(activity)"
                    :alt="activity.activity_name"
                    class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div class="absolute top-2 right-2">
                    <span class="px-2 py-1 bg-black bg-opacity-70 text-white text-xs font-medium rounded-full capitalize">
                      {{ activity.difficulty_level }}
                    </span>
                  </div>
                  <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                    <h4 class="text-white font-semibold text-lg truncate">{{ activity.activity_name }}</h4>
                  </div>
                </div>
  
                <!-- Details Section -->
                <div class="p-4 space-y-3">
                  <!-- Country -->
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-600">{{ getCountryName(activity.country_id) }}</span>
                  </div>
  
                  <!-- Duration -->
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-600">{{ activity.duration_hours }} hours</span>
                  </div>
  
                  <!-- Difficulty -->
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-600 capitalize">{{ activity.difficulty_level }}</span>
                  </div>
  
                  <!-- Description Preview -->
                  <div class="text-xs text-gray-500 line-clamp-2">
                    {{ activity.description }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
  
          <!-- Pagination -->
          <div v-if="lastPage > 1" class="flex justify-center items-center space-x-4 mt-8">
            <button 
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            
            <span class="text-sm text-gray-600">
              Page {{ currentPage }} of {{ lastPage }}
            </span>
            
            <button 
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === lastPage"
              class="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted, watch } from 'vue';
  
  interface Country {
    id: number;
    name: string;
  }
  
  interface ActivityImage {
    id: number;
    activity_id: number;
    image_url: string;
    is_primary: boolean;
  }
  
  interface Activity {
    id: number;
    activity_name: string;
    description: string;
    difficulty_level: 'easy' | 'moderate' | 'difficult' | 'expert';
    duration_hours: number;
    country_id: number;
    images: ActivityImage[];
  }
  
  interface ApiResponse {
    success: boolean;
    activities: Activity[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
    applied_filters: any;
  }
  
  // Reactive data
  const activities = ref<Activity[]>([]);
  const countries = ref<Country[]>([]);
  const loading = ref(false);
  const error = ref('');
  const total = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const perPage = ref(12);
  
  // Filters
  const initialFilters = {
    country_id: null as number | null,
    activity_name: null as string | null,
    difficulty_level: null as string | null,
    min_duration: null as number | null,
    max_duration: null as number | null,
    search: null as string | null,
  };
  
  const filters = reactive({ ...initialFilters });
  
  // Fetch countries for dropdown
  const fetchCountries = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/countries');
      if (response.ok) {
        const data = await response.json();
        countries.value = data;
      }
    } catch (err) {
      console.error('Failed to fetch countries:', err);
    }
  };
  
  // Fetch activities with filters
  const fetchActivities = async () => {
    loading.value = true;
    error.value = '';
    
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      // Add filters that have values
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      // Add pagination
      params.append('page', currentPage.value.toString());
      params.append('per_page', perPage.value.toString());
      
      const response = await fetch(`http://127.0.0.1:8000/api/activities/filter?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        activities.value = data.activities;
        total.value = data.total;
        currentPage.value = data.current_page;
        lastPage.value = data.last_page;
        perPage.value = data.per_page;
      } else {
        throw new Error('Failed to fetch activities');
      }
    } catch (err: any) {
      error.value = err.message || 'An error occurred while fetching activities';
      console.error('Error fetching activities:', err);
    } finally {
      loading.value = false;
    }
  };
  
  // Apply filters (manual trigger)
  const applyFilters = () => {
    currentPage.value = 1;
    fetchActivities();
  };
  
  // Helper functions
  const getPrimaryImage = (activity: Activity): string => {
    if (!activity.images || activity.images.length === 0) {
      return '/images/placeholder.jpg';
    }
    
    const primaryImage = activity.images.find(img => img.is_primary);
    const imageUrl = primaryImage ? primaryImage.image_url : activity.images[0].image_url;
    
    // Check if it's already a full URL
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it's a relative path, prepend the base URL
    const cleanPath = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
    return `http://127.0.0.1:8000/${cleanPath}`;
  };
  
  const getCountryName = (countryId: number): string => {
    const country = countries.value.find(c => c.id === countryId);
    return country ? country.name : 'Unknown Country';
  };
  
  // Reset filters
  const resetFilters = () => {
    Object.assign(filters, initialFilters);
    currentPage.value = 1;
    fetchActivities();
  };
  
  // Change page
  const changePage = (page: number) => {
    if (page >= 1 && page <= lastPage.value) {
      currentPage.value = page;
      fetchActivities();
    }
  };
  
  // Watch filters for changes with debounce
  let debounceTimer: NodeJS.Timeout;
  watch(filters, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentPage.value = 1;
      fetchActivities();
    }, 500);
  }, { deep: true });
  
  // Initialize component
  onMounted(() => {
    fetchCountries();
    fetchActivities();
  });
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>