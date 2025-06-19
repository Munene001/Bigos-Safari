<template>
    <div class="flex flex-col gap-[20px] md:flex md:flex-row">
      <div
        class="bg-contain h-[300px] md:flex md:flex-1"
        :style="{ backgroundImage: `url(${image})` }"
      >
        hello
      </div>
      <div class="md:flex flex-1 md:flex-col md:gap-[20px]">
        <div class="text-[22px] font-semibold leading-[26px]">
          {{ title }}
        </div>
        <div
          class="font-[Sans-serif] text-[17px] leading-[25px] text-[#3C3B32] md:text-[18px] md:leading-[35px]"
        >
          {{ description }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });
  </script>