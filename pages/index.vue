<script setup lang="ts">
import Activiter from '~/components/Activiter.vue';
import Caroucountry from '~/components/Caroucountry.vue';

</script>

<template>
    <Anime/>
    <div
    class="   w-[full] flex flex-col items-center py-[60px] gap-[30px] md:px-[20px] md:py-[70px] md:gap-[40px]"
  >
    <div class="text-[36px] font-bold leading-[40px] text-[#4A3620] font-[Bodoni]">WHY CHOOSE US</div>
    <div
      class="grid grid-flow-row gap-[30px] place-items-center md:grid-cols-3"
    >
      <Whyus
        title="20+ YEARS OF WILD EXPERTISE"
        description="Guided by decades of safari wisdom, we craft journeys only seasoned experts can deliver."
        iconName="oui:vis-timelion"
      />
      <Whyus
        title="BESPOKE SAFARI DREAMS"
        description="Every detail customized—because no two wilderness adventures should be alike."
        iconName="cib:safari"
      />
      <Whyus
        title="FINANCIAL PEACE OF MIND"
        description="ATOL protected & price-locked—no surprises, just wild freedom."
        iconName="game-icons:peace-dove"
      />
      <Whyus
        title="END-TO-END SAFARI GUARDIANS"
        description="From booking to homecoming, we’re your 24/7 safety net in the wild."
        iconName="game-icons:paw"
      />
      <Whyus
        title="PAY ONLY WHEN PERFECTED"
        description="Your itinerary is finalized to perfection before any payment is required."
        iconName="game-icons:pay-money"
      />
    
    </div>
  </div>
  <Iten/>
  <Activiter/>
  <Caroucountry/>
 
  
</template>