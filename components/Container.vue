<template>
    <div
    class="w-[87%] h-[250px] px-[20px] bg-gray-100 box-border flex flex-col gap-[20px]  rounded-md md:w-[100%] md:rounded-none items-center justify-center text-center border border-transparent hover:border-green-900  shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
  >
    <Icon :name ="iconity" style="color: #4A3620; font-size: 55px" />
    <div class="flex flex-col gap-[8px]">
      <div
        class="font-[Sans-serif] text-[25px] font-semibold leading-[22px]"
      >
        {{ title }}
      </div>
      <div
        class=" text-[18px] font-medium  leading-[22px] flex flex-col text-gray-700 font-sinco"
      >
        <span>{{ description }}</span>
        <span>{{ desc }}</span>
      </div>
    </div>
  </div>

</template>
<script setup>
defineProps({
    title:String,
    description:String,
    desc:String,
    iconity:String
    
});
</script>