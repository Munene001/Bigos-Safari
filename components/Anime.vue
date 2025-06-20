<template>
  <div
    class="bg-[url('/public/grassland3.jpg')] relative bg-cover md:bg-right px-[10px] py-[20px] md:items-center md:h-[450px] md:flex md:flex-row"
  >
  <div class="absolute inset-0 bg-green-900 bg-opacity-30 overflow-hidden"></div>
    <div
      class="flex flex-col relative  z-10 gap-[10px]  md:text-start md:pl-[20px]  mb-[20px] md:flex-[65%] "
    >
      <div
        class="text-amber-200  text-[40px] leading-[55px] font-semibold font-[Merriweather]"
      >
        BIGOS SAFARI - <span class="text-amber-200">JOURNEY INTO WILD BEAUTY</span>
      </div>
      <div
        class="text-green text-[18px] leading-[24px] font-semibold font-[Sans-serif]"
      >
        Discover Africa's wild heart through unforgettable safaris. Journey from
        East Africa's sweeping plains to the South's untamed wonders and the
        Indian Ocean's serene shores. Travel in comfort, explore with wonder,
        and create timeless memories where every sunrise brings new adventures."
      </div>
      <div class="mt-[15px]  mb-[5px] md:my-[30px]  ">
        <NuxtLink
          to="/about"
          class="bg-[#FFD700]  md:w-[30%] w-[60%] text-[20px] leading-[24px]  font-[Sans-serif]  px-[15px] py-[8px] flex gap-[20px]  items-center justify-center animate-glide-out"
          >Learn More<Icon name="lucide:move-right"/></NuxtLink
        >
        </div>
     
    </div>
    <div  class="md:flex-[35%] overflow-hidden flex justify-center z-10 relative">
    <img
      src="/public/elephant.png"
      alt="elephant"
      class="h-[350px] w-[350px] object-scale-down animate-glide-in "
    />
    </div>
  </div>
</template>
