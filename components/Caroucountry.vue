<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation, Icon } from 'vue3-carousel'
import { link } from '#build/ui';

const carouselConfig = {
  itemsToShow: 'auto',
  wrapAround: true,
  gap: 20,
 
 
}
const slides = [
  {
    image: '/Kenya.webp',
    title: 'Kenya',
    description: 'East African wildlife wonderland',
    link: '/kenya'
  },
  {
    image: '/tanzania.webp',
    title: 'Tanzania',
    description: 'East African safari paradise',
    link: '/tanzania'
  },
  {
    image: '/Zanzibar.webp',
    title: 'Zanzibar',
    description: 'East African tropical island gem',
    link: '/zanzibar'
  },
  {
    image: '/Uganda.webp',
    title: 'Uganda',
    description: 'East African mountain gorilla haven',
    link: '/uganda'
  },
  {
    image: '/Southafrica.webp',
    title: 'South Africa',
    description: 'Southern African diverse destination',
    link: '/southafrica'
  },
  {
    image: '/Botswana.webp',
    title: 'Botswana',
    description: 'Southern African delta wilderness',
    link: '/botswana'
  },
  {
    image: '/Namibia.webp',
    title: 'Namibia',
    description: 'Southern African desert landscape',
    link: '/namibia'
  },
  {
    image: '/Mauritius.webp',
    title: 'Mauritius',
    description: 'Indian Ocean island paradise',
    link: '/mauritius'
  },
  {
    image: '/Seychelles.webp',
    title: 'Seychelles',
    description: 'Indian Ocean archipelago jewel',
    link: '/seychelles'
  },
  {
    image: '/Rwanda.webp',
    title: 'Rwanda',
    description: 'East African mountain retreat',
    link: '/rwanda'
  },
  {
    image: '/Maldives.webp',
    title: 'Maldives',
    description: 'Indian Ocean overwater paradise',
    link: '/maldives'
  },
  {
    image: '/Mozambique.webp',
    title: 'Mozambique',
    description: 'Southern African coastal escape',
    link: '/mozambique'
  },
]; </script>

<template>
  <div class="md:bg-[url('grassland3.jpg')] bg-bottom bg-cover flex md:flex-row flex-col md:h-[600px] md:bg-opacity-10 bg-gray-200 py-[20px] gap-[20px] md:py-[1px] md:gap-[1px] relative rounded-t-xl">
    <div class="hidden md:w-[35%] md:flex justify-center px-[10px] flex-col gap-[20px] font-[Sans-serif] text-white bg-opacity-20">
      <div class="font-bold text-green-500"><div class="text-[27px] leading-[32px]  ">Explore </div> <div class="text-[37px] leading-[45px]">Our Must-See Places</div></div>
      <div class="font-medium text-[22px] leading-[33px]" >Uncover essential insights on each location, from the best time to visit to how to make the most of your journey.</div>
    </div>
    <div class="md:hidden font-[Sans-serif] black text-center">
       <div class="text-[26px] leading-[34px] font-semibold  ">EXPLORE </div> 
       <div class="text-[26px] leading-[35px] text-center font-semibold">OUR MUST SEE PLACES</div>
    </div>
   
    
  <Carousel v-bind="carouselConfig" class=" flex md:w-[65%] overflow-hidden " id="1">
    <Slide v-for= "(slide, index) in slides " :key="index">
      
      <NuxtLink :to= slide.link  class="relative h-[450px] w-[330px] overflow-hidden">
      <img :src="slide.image" :alt="'Slide' + (index + 1)" class="h-full w-full object-cover" />
      <div class="absolute bottom-6 left-0 right-0   text-white bg-black bg-opacity-20 px-[20px]">
        <h3 class="text-[28px] font-bold font-[Sans-serif]">{{ slide.title }}</h3>
        <p class="text-sm font-[Sans-serif] text-green-100">{{ slide.description }}</p>
      </div>
      </NuxtLink>
       
      
    </Slide>

    <template #addons>
      <Navigation/>
    <pagination/>  
    </template>

  </Carousel>
  </div>
  
</template>
<style>



@media(min-width:768px){
.carousel {
  --vc-pgn-background-color: white;
  --vc-pgn-active-color: darkgoldenrod;
  --vc-pgn-border-radius: 5px;
  --vc-pgn-height: 7px;
  --vc-pgn-width: 7px;
}
.carousel {
  --vc-nav-background: rgba(0, 0, 0, 0.3);
  --vc-nav-color: white;
  --vc-nav-color-hover: #e5e5e5;
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 50px;
  --vc-nav-height: 50px;
}
}
@media(max-width:768px){

  .carousel {
  --vc-nav-background: white;
  --vc-nav-color: green;
  --vc-nav-color-hover: #e5e5e5;
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 50px;
  --vc-nav-height: 50px;
}
  

.carousel {
  --vc-pgn-display:hidden;
  --vc-pgn-background-color: white;
  --vc-pgn-active-color: rgb(12, 228, 12);
  --vc-pgn-border-radius: 5px;
  --vc-pgn-height: 7px;
  --vc-pgn-width: 7px;


  
}

}
.carousel__slide--active div {
  opacity: 1;
  transform: scale(1) rotateY(0) translateX(0);
}

.carousel__slide--prev div {
  opacity: 0.8;
  transform: scale(0.9) ;
}

.carousel__slide--next div {
  opacity: 0.8;
  transform: scale(0.9) ;
}

.carousel__slide--next ~ .carousel__slide img {
  opacity: 0.7;
  transform: scale(0.9) ;
}
.corousel__navigation--next{
  font-size: 50px;
}

</style>