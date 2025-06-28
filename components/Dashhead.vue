<template>
  <div
    class="w-[30%] flex px-[5px] py-[10px] h-[100vh] flex-col gap-[20px] border-r md:w-[15%] relative border-gray-300 bg-white"
  >
  
    <div>
      <button
        class="flex flex-row gap-[2px] mb-[5px] text-[14px] text-black leading-[14px] font-semibold no-underline"
      >
        ACCOMMODATIONS<Icon name="ant-design:down-outlined" />
      </button>
      <div class="flex flex-col pb-[3px] z-50 gap-[2px] text-sm">
        <NuxtLink
          to="/Dashboard/Accommodations/New"
          class="border-b border-gray-300 hover:bg-[#FFD700] items-center text-black px-[5px] box-border"
          active-class="bg-[#FFD700]"
          exact-active-class="bg-[#FFD700]"
          >ADD NEW</NuxtLink
        >
        <NuxtLink
          to="/Dashboard/Accommodations/List"
          class="hover:bg-[#FFD700] items-center text-black px-[5px] box-border"
          active-class="bg-[#FFD700]"
          exact-active-class="bg-[#FFD700]"
          >SHOW LISTINGS</NuxtLink
        >
      </div>
    </div>
    <div>
      <button
        class="flex flex-row gap-[2px] mb-[5px] text-[14px] text-black leading-[14px] font-semibold no-underline"
        active-class="bg-[#FFD700]"
        exact-active-class="bg-[#FFD700]"
      >
        ACTIVITIES<Icon name="ant-design:down-outlined" />
      </button>
      <div class="flex flex-col pb-[3px] z-50 gap-[2px] text-sm">
        <NuxtLink
          to="/Dashboard/Activities/New"
          class="border-b border-gray-300 hover:bg-[#FFD700] items-center text-black px-[5px] box-border"
          active-class="bg-[#FFD700]"
          exact-active-class="bg-[#FFD700]"
          >ADD NEW</NuxtLink
        >
        <NuxtLink
          to="/Dashboard/Activities/List"
          class="hover:bg-[#FFD700] items-center text-black px-[5px] box-border"
          active-class="bg-[#FFD700]"
          exact-active-class="bg-[#FFD700]"
          >SHOW LISTINGS</NuxtLink
        >
      </div>
    </div>
    <div>
      <button
        class="flex flex-row gap-[2px] text-[14px] mb-[5px] text-black leading-[14px] font-semibold no-underline"
      >
        ITINENARIES<Icon name="ant-design:down-outlined" />
      </button>
      <div class="flex flex-col pb-[3px] z-50 gap-[2px] text-sm">
        <NuxtLink
          to="/Dashboard/Itineraries/New"
          class="border-b border-gray-300 hover:bg-[#FFD700] items-center text-black box-border"
          active-class="bg-[#FFD700]"
          exact-active-class="bg-[#FFD700]"
          >ADD NEW</NuxtLink
        >
        <NuxtLink
          to="/Dashboard/Itineraries/List"
          class="hover:bg-[#FFD700] items-center text-black px-[5px] box-border"
          active-class="bg-[#FFD700]"
          exact-active-class="bg-[#FFD700]"
          >SHOW LISTINGS</NuxtLink
        >
      </div>
      </div>
    </div>
  
</template>
<script></script>
