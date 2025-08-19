<template>
    <div
      class="w-[87%] h-[250px] px-[20px] box-border flex flex-col gap-[20px] bg-white rounded-md md:w-[100%] md:rounded-none items-center justify-center text-center  border border-green-500 hover:border-green-900  shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <Icon :name="iconName" style="color: #4A3620; font-size: 45px" />
      <div class="flex flex-col gap-[8px]">
        <div
          class=" text-[21px] font-semibold  text-green-900 font-tres leading-[23px] "
        >
          {{ title }}
        </div>
        <div
          class=" text-[18px] font-medium font-[Open sans] font-sinco text-gray-900 leading-[24px] t"
        >
          {{ description }}
        </div>
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
  