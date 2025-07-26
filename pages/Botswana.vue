<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="country">
      <!-- Hero Section -->
      <div class="w-full h-[500px] md:h-[500px] relative overflow-hidden">
        <img
          v-if="country.image_url"
          :src="'http://127.0.0.1:8000' + country.image_url"
          :alt="country.name"
          class="w-full h-full object-cover object-center"
        />
        <div
          class="absolute z-10 text-white md:w-[60%] left-[5%] md:top-[20%] md:space-y-[30px] top-[100px] space-y-[20px] w-[80%] md:translate-x-0 bg-black bg-opacity-5 p-[5px]"
        >
          <div class="hidden md:block text-white">
            HOME > COUNTRIES > {{ country.name }}
          </div>
          <div
            class="md:text-[70px] md:leading-[68px] text-[32px] leading-[39px] font-bold"
          >
            {{ country.name }}
          </div>
          <div
            class="text-white md:text-[21px] md:leading-[30px font-[Sans-serif] text-[15px] font-medium"
          >
          Home to the Okavango Delta and the Kalahari Desert, Botswana is a land of striking contrasts and raw beauty, where pristine wilderness and rich traditions offer deeply immersive safari experiences.
          </div>
          <button class="bg-orange-500 px-[40px] py-[10px]">Lets talk</button>
        </div>
      </div>
      <div class="px-[10px] py-[20px] md:py-[40px] flex flex-row gap-[50px]">
        <div class="md:w-[60%] flex flex-col gap-[20px]">
          <div
            class="flex flex-row md:justify-start md:gap-[100px] justify-between items-center"
          >
            <div class="flex flex-col gap-[10px]">
              <div class="text-[28px] md:text-[32px] font-bold leading-[28px]">BOTSWANA OVERVIEW</div>
              <div class="hidden md:block font-medium">In Botswana, elephants outnumber people in some regions, making it one of the best places on Earth to spot these gentle giants roaming freely.</div>
            </div>
            <img src="/bo2.jpeg" class="height-[50px]" />
          </div>
          <div class="text-[17px] leading-[25px]">{{ country.overview }}</div>
         
          
        </div>
        <div
          class="hidden md:flex w-[40%] bg-gray-100 p-[20px] justify-around items-start flex-col gap-[15px]"
        >
        <div class="text-18px text-black">OUR VALUES</div>
      
        <item
          title="20+ YEARS OF WILD EXPERTISE"
          description="Guided by decades of safari wisdom, we craft journeys only seasoned experts can deliver."
          iconName="oui:vis-timelion"
        />
        <item
          title="BESPOKE SAFARI DREAMS"
          description="Every detail customized—because no two wilderness adventures should be alike."
          iconName="cib:safari"
        />
        <item
          title="FINANCIAL PEACE OF MIND"
          description="ATOL protected & price-locked—no surprises, just wild freedom."
          iconName="game-icons:peace-dove"
        />
        <item
          title="END-TO-END SAFARI GUARDIANS"
          description="From booking to homecoming, we’re your 24/7 safety net in the wild."
          iconName="game-icons:paw"
        />
        <item
          title="PAY ONLY WHEN PERFECTED"
          description="Your itinerary is finalized to perfection before any payment is required."
          iconName="game-icons:pay-money"
        />
            
          
        </div>
      </div>
  
      <Subc :country="country" />
      <div class="px-[10px] py-[20px] md:py-[40px] flex flex-col md:flex-row gap-[30px]">
    <!-- FAQ Accordion -->
    <div class="md:w-[60%]">
      <h2 class="text-[24px] md:text-[28px] font-bold mb-[20px]">FREQUENTLY ASKED QUESTIONS</h2>
      
      <div class="space-y-[10px]">
        <div 
          v-for="(faq, index) in country?.faqs" 
          :key="index" 
          class="border-b border-gray-200 pb-[10px]"
        >
          <button 
            @click="toggleFaq(index)"
            class="flex justify-between items-center w-full text-left py-[15px] focus:outline-none"
          >
            <span class="text-[16px] md:text-[18px] font-medium">{{ faq.question }}</span>
            <span class="text-orange-500">
              <Icon 
                :name="openFaqs.includes(index) ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
                width="24"
              />
            </span>
          </button>
          
          <div 
            v-show="openFaqs.includes(index)"
            class="pb-[15px] text-[14px] md:text-[16px] text-gray-700"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contact Info (hidden on mobile) -->
    <div class="hidden md:flex md:w-[40%] bg-gray-100 p-[30px] rounded-lg">
      <div class="space-y-[25px]">
        <h3 class="text-[20px] font-bold">NEED HELP?</h3>
        
        <div class="space-y-[15px]">
          <div class="flex items-start gap-[15px]">
            <Icon name="mdi:phone" width="24" class="text-[#c7641d] mt-[2px]" />
            <div>
              <p class="font-medium">Call us</p>
              <p class="text-gray-600">+1 (234) 567-8900</p>
            </div>
          </div>
          
          <div class="flex items-start gap-[15px]">
            <Icon name="mdi:email" width="24" class="text-[#c7641d] mt-[2px]" />
            <div>
              <p class="font-medium">Email us</p>
              <p class="text-gray-600">info@safaribookings.com</p>
            </div>
          </div>
          
          <div class="flex items-start gap-[15px]">
            <Icon name="mdi:clock" width="24" class="text-[#c7641d] mt-[2px]" />
            <div>
              <p class="font-medium">Opening hours</p>
              <p class="text-gray-600">Mon-Fri: 8am - 6pm</p>
              <p class="text-gray-600">Sat: 9am - 4pm</p>
            </div>
          </div>
        </div>
        
        <button class="bg-[#c7641d] text-white px-[25px] py-[10px] rounded-md font-medium">
          Contact Us
        </button>
      </div>
    </div>
  </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  
  interface Country {
    country_id: number;
    name: string;
    overview: string;
    about: string;
    image_url: string;
    best_time_to_visit: string;
    main_destination?: string;
    parks?: Park[];
    faqs?: FAQ[];
  }
  
  interface Park {
    park_id: number;
    name: string;
    location: string;
    description: string;
  }
  
  interface FAQ {
    question: string;
    answer: string;
  }
  
  const country = ref<Country | null>(null);
  const loading = ref(true);
  const error = ref("");
  const route = useRoute();
  const openFaqs = ref<number[]>([]);

const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index);
  } else {
    openFaqs.value.push(index);
  }
};
  
  const fetchCountry = async () => {
    error.value = "";
    loading.value = true;
    const countryId = route.params.countryId;
  
    try {
      const response = await axios.get<Country>(
        `http://127.0.0.1:8000/api/countries/3`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      country.value = response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to fetch country details";
      console.error("Error fetching country:", err);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchCountry();
  });
  </script>
  