<template>
    <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <!-- Filter Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Filter Itineraries</h2>
        
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
  
          <!-- Title Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Title</label>
            <input 
              v-model="filters.title"
              type="text"
              placeholder="Enter itinerary title..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <!-- Main Destination -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Main Destination</label>
            <input 
              v-model="filters.main_destination"
              type="text"
              placeholder="Enter destination..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <!-- Month Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Best Season Month</label>
            <select 
              v-model="filters.month"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option :value="null">Any Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
  
          <!-- Nights Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nights Range</label>
            <div class="flex space-x-2">
              <input 
                v-model.number="filters.min_nights"
                type="number"
                placeholder="Min"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input 
                v-model.number="filters.max_nights"
                type="number"
                placeholder="Max"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          <!-- Price Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price Range ($)</label>
            <div class="flex space-x-2">
              <input 
                v-model.number="filters.min_price"
                type="number"
                placeholder="Min price"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input 
                v-model.number="filters.max_price"
                type="number"
                placeholder="Max price"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
  
          <!-- Special Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Special Notes</label>
            <select 
              v-model="filters.has_special_notes"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option :value="null">Any</option>
              <option :value="true">Has Special Notes</option>
              <option :value="false">No Special Notes</option>
            </select>
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
          <p class="text-gray-600">Loading itineraries...</p>
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
            @click="fetchItineraries"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="itineraries.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-gray-600 text-lg">No itineraries found matching your criteria.</p>
        </div>
  
        <!-- Results Grid -->
        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-800">
              {{ total }} Itineraries Found
            </h3>
            <div class="text-sm text-gray-600">
              Page {{ currentPage }} of {{ lastPage }}
            </div>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="itinerary in itineraries" 
              :key="itinerary.id"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <NuxtLink :to="`/itinerary/${itinerary.id}`" class="block">
                <!-- Image Section -->
                <div class="relative h-48 overflow-hidden">
                  <img
                    :src="getPrimaryImage(itinerary)"
                    :alt="itinerary.title"
                    class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                    <h4 class="text-white font-semibold text-lg truncate">{{ itinerary.title }}</h4>
                  </div>
                </div>
  
                <!-- Details Section -->
                <div class="p-4 space-y-3">
                  <!-- Best Season -->
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-600">Best Season: {{ itinerary.best_season || 'N/A' }}</span>
                  </div>
  
                  <!-- Main Destination -->
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-600">{{ itinerary.main_destination }}</span>
                  </div>
  
                  <!-- Nights -->
                  <div v-if="getDurationNights(itinerary)" class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                    </svg>
                    <span class="text-sm text-gray-600">{{ getDurationNights(itinerary) }} Nights</span>
                  </div>
  
                  <!-- Price -->
                  <div v-if="getStartingPrice(itinerary)" class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm font-semibold text-green-600">From ${{ getStartingPrice(itinerary) }}</span>
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
  
  interface SubItinerary {
    id: number;
    duration_nights: number;
    price: number;
    special_notes: string | null;
    dayPlans: any[];
  }
  
  interface ItineraryImage {
    id: number;
    itinerary_id: number;
    image_url: string;
    is_primary: boolean;
  }
  
  interface Itinerary {
    id: number;
    title: string;
    main_destination: string;
    best_season: string;
    country_id: number;
    sub_itineraries: SubItinerary[];
    images: ItineraryImage[];
    country?: Country;
  }
  
  interface ApiResponse {
    success: boolean;
    itineraries: Itinerary[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
    applied_filters: any;
  }
  
  // Reactive data
  const itineraries = ref<Itinerary[]>([]);
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
    title: null as string | null,
    main_destination: null as string | null,
    min_nights: null as number | null,
    max_nights: null as number | null,
    min_price: null as number | null,
    max_price: null as number | null,
    month: null as string | null,
    has_special_notes: null as boolean | null,
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
  
  // Fetch itineraries with filters
  const fetchItineraries = async () => {
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
      
      const response = await fetch(`http://127.0.0.1:8000/api/itineraries/filter?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        itineraries.value = data.itineraries;
        total.value = data.total;
        currentPage.value = data.current_page;
        lastPage.value = data.last_page;
        perPage.value = data.per_page;
      } else {
        throw new Error('Failed to fetch itineraries');
      }
    } catch (err: any) {
      error.value = err.message || 'An error occurred while fetching itineraries';
      console.error('Error fetching itineraries:', err);
    } finally {
      loading.value = false;
    }
  };
  
  // Apply filters (manual trigger)
  const applyFilters = () => {
    currentPage.value = 1;
    fetchItineraries();
  };
  
  // Helper functions
  const getPrimaryImage = (itinerary: Itinerary): string => {
    if (!itinerary.images || itinerary.images.length === 0) {
      return '/images/placeholder.jpg';
    }
    
    const primaryImage = itinerary.images.find(img => img.is_primary);
    return primaryImage ? 
      `http://127.0.0.1:8000/${primaryImage.image_url}` : 
      `http://127.0.0.1:8000/${itinerary.images[0].image_url}`;
  };
  
  const getDurationNights = (itinerary: Itinerary): number | null => {
    if (!itinerary.sub_itineraries || itinerary.sub_itineraries.length === 0) {
      return null;
    }
    
    return itinerary.sub_itineraries[0].duration_nights;
  };
  
  const getStartingPrice = (itinerary: Itinerary): number | null => {
    if (!itinerary.sub_itineraries || itinerary.sub_itineraries.length === 0) {
      return null;
    }
    
    return itinerary.sub_itineraries[0].price;
  };
  
  // Reset filters
  const resetFilters = () => {
    Object.assign(filters, initialFilters);
    currentPage.value = 1;
    fetchItineraries();
  };
  
  // Change page
  const changePage = (page: number) => {
    if (page >= 1 && page <= lastPage.value) {
      currentPage.value = page;
      fetchItineraries();
    }
  };
  
  // Watch filters for changes with debounce
  let debounceTimer: NodeJS.Timeout;
  watch(filters, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentPage.value = 1;
      fetchItineraries();
    }, 500);
  }, { deep: true });
  
  // Initialize component
  onMounted(() => {
    fetchCountries();
    fetchItineraries();
  });
  </script>