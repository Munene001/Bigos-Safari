<template>
    <div
      class="flex flex-col gap-[20px] w-[87%] h-[300px] border border-gray-500 p-[20px] md:w-[100%] rounded-lg"
    >
      <Icon :name="iconName" style="font-size: 64px !important; color: green" />
      <div class=" text-[24px] font-bold leading-[26px]">
        {{ title }}
      </div>
      <div class=" text-[17px] leading-[25px] text-[#3C3B32] font-sinco">
        {{ description }}
      </div>
    </div>
  </template>
  <script setup>
  defineProps({
    title: String,
    description: String,
    iconName: String,
  });
  </script>