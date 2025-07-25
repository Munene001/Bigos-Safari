<template>
    <div
      class="box-border flex flex-row gap-[20px]  rounded-md  md:rounded-none items-center justify-center   "
    >
      <div><Icon :name="iconName" style="color: #4A3620; font-size: 20px" /></div>
      
        <div
          class="font-[Sans-serif] text-[18px] font-semibold  text-yellow-800  leading-[22px] "
        >
          {{ title }}
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