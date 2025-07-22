<template>
  <div
    class="md:h-[calc(100vh-90px)] hidden md:flex md:flex-row relative box-border overflow-hidden shadow-lg shadow-b shadow-spread rounded-b-xl"    id='home'
  >
    <!-- Left Section -->
    <div
      class="bg-[#4A3620] md:w-[50%] pl-[40px] pt-[80px] flex flex-col gap-[50px] box-border overflow-hidden"
    >
      <div class="flex flex-col gap-[30px] pr-[10px] pl-[10px] box-border">
        <div
          class="text-white text-[38px] leading-[45px] font-semibold animate-title-in"
        >
          ISLAND AND BUSH - JOURNEY TO WILD BEAUTY
        </div>
        <div class="text-white text-[15px] leading-[24px] font-[Sans-serif]">
          
          
          Experience the untamed beauty of Africa, where pristine islands meet the raw majesty of the wild. Let us take you on a journey through nature’s finest landscapes, curated with comfort and adventure in perfect harmony.
        </div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-[25px] box-border">
          <button
            class="px-[15px] py-[7px] w-[150px] rounded-full bg-white hover:bg-blue-500 flex flex-row items-center gap-[10px] justify-center"
          >
            Learn More<Icon name="guidance:left-arrow" />
          </button>
          <div class="flex text-gray-300 flex-row gap-[20px]">
            <button class="flex items-center gap-[5px]"><span><Icon name="game-icons:wavy-itinerary" style="color: darkgoldenrod;"/></span><span>itineraries</span></button>
            <button class="flex items-center gap-[5px]"><span><Icon name="material-symbols-light:flights-and-hotels-sharp"  style="color: darkgoldenrod;"/></span><span>accommodations</span></button>
          </div>
        </div>
        <img src="/island.webp" alt="qr" class="pr-[40px] h-[192px] w-[244px] " />
      </div>
    </div>

    <!-- Centered Image (Absolute Positioning) -->

    <img
      src="/elephant.png"
      class="md:absolute right-[30px] top-[35%]   max-h-[50%] max-w-[90%] object-scale-down animate-glide-in box-border"
    />

    <!-- Right Section -->
    <div
      class="md:w-[50%] bg-[url('/nrb.jpg')] bg-cover bg-center bg-no-repeat"
    ></div>
  </div>

  <!--Mobile hero-->

  <div
  id='home1'
    class="md:hidden bg-[#4A3620]  overflow-hidden rounded-b-xl" 
  >
    <div
      class="text-white text-[32px] leading-[40px] font-semibold animate-title-in p-[30px]"
    >
    ISLAND AND BUSH - JOURNEY TO WILD BEAUTY
    </div>
    <div class="text-gray-300 text-[15px] leading-[24px] px-[30px]">
      Discover Africa’s wild beauty — from serene islands to untamed bush. Your unforgettable safari adventure starts here.
    </div>
    <div class="flex w-full px-[40px] pt-[20px] items-center justify-between">
      <button
        class="h-[30px] p-[20px] rounded-full bg-white hover:bg-blue-500 flex flex-row items-center gap-[10px] justify-center"
      >
        About <Icon name="guidance:left-arrow" />
      </button>
      <img
        src="/elephant.png"
        class="flex max-h-[230px] max-w-[100%] object-scale-down box-border animate-mobile-glide-in"
      />
    </div>
    <div class="flex text-gray-300 flex-row gap-[20px] px-[30px] pt-[30px] pb-[50px]">
            <button class="flex items-center"><span><Icon name="game-icons:wavy-itinerary" style="color: darkgoldenrod;"/></span><span>itineraries</span></button>
            <button class="flex items-center"><span><Icon name="material-symbols-light:flights-and-hotels-sharp"  style="color: darkgoldenrod;"/></span><span>accommodations</span></button>
          </div>
  </div>
</template>
