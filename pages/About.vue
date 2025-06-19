<script setup lang="ts"></script>

<template>
  <div
    class="px-[25px] py-[10px] h-[220px] justify-center text-[#242d2d] flex flex-col gap-[18px]"
  >
    <div class="flex flex-row">
      <Icon name="mage:home" /><Icon name="lsicon:right-filled" /><span
        class="align-middle font-light"
        >About us</span
      >
    </div>
    <div class="flex flex-col gap-[10px]">
      <div class="font-[Sans-serif] text-[40px] leading-[60px] font-bold">
        ABOUT US
      </div>
      <div class="text-[16px] leading-[18px] font-medium">
        Find out about our services ,our destinations and our experiences
      </div>
    </div>
  </div>
  <div
    class="flex flex-col gap-[20px] md:grid md:grid-cols-3 items-center md:px-[8px]"
  >
    <Abouter
      title="WHAT WE DO"
      description="Bigos Safari is defined by wilderness experiences that make the heart sing. We travel extensively, know our destinations intimately and select only those places on which we’re prepared to stake our reputation. "
      iconName="streamline-pixel:travel-wayfinding-beach-coconut-tree"
    />
    <Abouter
      title="WHERE WE GO"
      description="Drawn by an insatiable obsession with the world’s wild places – we hand-pick stellar wilderness experiences round the world, from the steppes of Asia to the jungles of South America and the intense polar landscapes of the High Arctic."
      iconName="streamline-block:travel-plane"
    />
    <Abouter
      title="TRAVEL INSPIRATION"
      description="We have created a place of inspiration that takes a lifetime of travel, distilled into a place to lose yourself in travel of all kinds, from reading about travel to planning your next escape. "
      iconName="arcticons:ctrip-travel"
    />
  </div>
  <div class="px-[10px] py-[50px] gap-[50px] flex flex-col">
    <div
      class="text-center text-[35px] font-bold leading-[26px] text-green-900"
    >
      WHAT WE OFFER
    </div>
    <div class="flex flex-col gap-[30px]">

      <Offers title = 'LUXURY AFRICAN VILLAS' description = "Our portfolio of luxury villas spans East Africa, Southern Africa, and the Indian Ocean islands. Each villa is meticulously curated to offer a blend of sophistication, privacy, and local charm. Whether you desire a serene beachside retreat or a lavish hilltop escape, our villas provide an idyllic setting for your dream vacation." image = "/africavilla.jpg"/>
      <Offers title = "HIGH END SAFARI CAMPS" description = "Our portfolio of luxury villas spans East Africa, Southern Africa, and the Indian Ocean islands. Each villa is meticulously curated to offer a blend of sophistication, privacy, and local charm. Whether you desire a serene beachside retreat or a lavish hilltop escape, our villas provide an idyllic setting for your dream vacation." image = "/safaricamp.jpg"/>
      <Offers title = "IMMERSIVE EXPERIENCES" description = "Our portfolio of luxury villas spans East Africa, Southern Africa, and the Indian Ocean islands. Each villa is meticulously curated to offer a blend of sophistication, privacy, and local charm. Whether you desire a serene beachside retreat or a lavish hilltop escape, our villas provide an idyllic setting for your dream vacation." image = "/gorilla.jpg"/>
    </div>
  </div>
</template>
