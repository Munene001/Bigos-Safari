<template>
  <div
    class="h-[87px] flex-row md:flex hidden w-full bg-green-900 font-[Sans-serif]"
  >
    <div class="flex w-[18%] items-center justify-center">Hello</div>
    <div class="w-[82%] flex items-center justify-around bg-transparent">
      <NuxtLink
        class="text-[14px] leading-[14px] text-white font-semibold no-underline"
         active-class="underline"
        to="/"
      >
        HOME
      </NuxtLink>

      <div>
        <button
          @click="toggleDiv"
          class="flex flex-row gap-[2px] text-[14px] text-white leading-[14px] font-semibold no-underline"
        >
          COUNTRIES<Icon name="ant-design:down-outlined" />
        </button>
        <div
          v-if="isVisible"
          class="flex flex-col bg-green-900 pb-[3px] z-50 gap-2 text-sm pl-2 absolute w-[150px] mt-[10px]"
        >
          <NuxtLink
            to="/kenya"
            class="border-black hover:bg-[#FFD700]  items-center text-white px-[5px] box-border"
            active-class="underline"
            >Kenya</NuxtLink
          >
          <NuxtLink
            to="/Tanzania"
            class="hover:bg-[#FFD700]  items-center text-white px-[5px] box-border"
             active-class="underline"
            >Tanzania</NuxtLink
          >
          <NuxtLink
            to="/zanzibar"
            class="hover:bg-[#FFD700] items-center text-white px-[5px] box-border"
             active-class="underline"
            >Zanzibar</NuxtLink
          >
          <NuxtLink
            to="/rwanda"
            class="border-black hover:bg-[#FFD700]  items-center text-white px-[5px] box-border"
             active-class="underline"
            >Rwanda</NuxtLink
          >
          <NuxtLink
            to="/Mauritius"
            class="hover:bg-orange-600 items-center text-white px-[5px] box-border"
             active-class="underline"
            >Mauritius</NuxtLink
          >
          <NuxtLink
            to="/Seychelles"
            class="hover:bg-[#FFD700]  items-center text-white px-[5px] box-border"
             active-class="underline"
            >Seychelles</NuxtLink
          >
          <NuxtLink
            to="Botswana"
            class="hover:bg-[#FFD700]  items-center text-white px-[5px] box-border"
             active-class="underline"
            >Botswana</NuxtLink
          >

          <NuxtLink
            to="/southafrica"
            class="hover:bg-[#FFD700]  items-center text-white px-[5px] box-border"
             active-class="underline"
            >South Africa</NuxtLink
          >
          <NuxtLink
            to="/mozambique"
            class="hover:bg-[#FFD700] items-center text-white px-[5px] box-border"
             active-class="underline"
            >Mozambique</NuxtLink
          >
          <NuxtLink
            to="/Namibia"
            class="hover:bg-[#FFD700]  items-center text-white px-[5px] box-border"
             active-class="underline"
            >Namibia</NuxtLink
          >
          <NuxtLink
            to="/maldives"
            class="hover:bg-[#FFD700] items-center text-white px-[5px] box-border"
             active-class="underline"
            >Maldives</NuxtLink
          >
        </div>
      </div>

      <NuxtLink
        class="text-[14px] leading-[14px] font-semibold no-underline f text-white"
         active-class="underline"
        to="/Itenaries"

      >
        ITENARIES
      </NuxtLink>

      <NuxtLink
        class="text-[14px] leading-[14px] font-semibold no-underline text-white"
         active-class="underline"
          
        to="/Accomodations"
      >
        ACCOMODATIONS
      </NuxtLink>
      <NuxtLink
        class="text-[14px] leading-[14px] font-semibold no-underline text-white"
         active-class="underline"
        to="/About"
      >
        ABOUT US
      </NuxtLink>
      <NuxtLink
        class="text-[14px] leading-[14px] font-semibold no-underline p-[10px] bg-[#FFD700] text-black flex items-center"
        to="/contact"
      >
        MAKE INQUIRIES
        <Icon
          name="icon-park:hand-right"
          style="color: black; margin-left: 10px; height: 24px; width: 24px"
        />
      </NuxtLink>
    </div>
  </div>

  <div
    class="flex flex-row max-w-[768px] md:hidden h-[80px] justify-between items-center px-4 box-border bg-green-900 w-full text-white font-[edgaramond]"
  >
    <div>logo</div>
    <button @click="togglePopup">
      <Icon
        name="material-symbols:menu"
        style="font-size: 28px; color: white"
      />
    </button>
  </div>
  <div
    v-if="isOpen"
    class="fixed top-0 right-0 flex flex-row w-[90%] h-[100vh] z-50 bg-green-900 text-white px-[40px] pt-[100px]"
  >
    <div class="flex flex-col gap-[3px]">
      <NuxtLink
        class="flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline border-b border-gray-400 items-center"
        to="/"
        @click="togglePopup"
      >
        HOME
      </NuxtLink>

      <div>
        <button
          @click="toggleDiv"
          class="h-[55px] flex flex-row gap-[2px] text-[18px] leading-[18px] font-semibold no-underline border-b border-gray-400 items-center"
        >
          COUNTRIES<Icon name="ant-design:down-outlined" />
        </button>
        <div v-if="isVisible" class="flex flex-col gap-2 pl-2 w-[150px]">
          <NuxtLink
            to="/kenya"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Kenya</NuxtLink
          >
          <NuxtLink
            to="Tanzania"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Tanzania</NuxtLink
          >
          <NuxtLink
            to="Zanzibar"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Zanzibar</NuxtLink
          >
          <NuxtLink
            to="Rwanda"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Rwanda</NuxtLink
          >
          <NuxtLink
            to="Mauritius"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Mauritius</NuxtLink
          >
          <NuxtLink
            to="Botswana"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Botswana</NuxtLink
          >
          <NuxtLink
            to="southafrica"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >South Africa</NuxtLink
          >
          <NuxtLink
            to="Namibia"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Namibia</NuxtLink
          >
          <NuxtLink
            to="Mozambique"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Mozambique</NuxtLink
          >
          <NuxtLink
            to="Maldives"
            class="flex h-[45px] border-b border-gray-400 items-center"
            @click="togglePopup"
            >Maldives</NuxtLink
          >
        </div>
      </div>

      <NuxtLink
        @click="togglePopup"
        class="flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline border-b border-gray-400 items-center"
        to="/itenaries"
      >
        ITENARIES
      </NuxtLink>
      <NuxtLink
        @click="togglePopup"
        class="flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline border-b border-gray-400 items-center"
        to="/accomodations"
      >
        ACCOMODATIONS
      </NuxtLink>
      <NuxtLink
        @click="togglePopup"
        class="flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline border-b border-gray-400 items-center"
        to="/about"
      >
        ABOUT US
      </NuxtLink>
      <NuxtLink
        @click="togglePopup"
        class="flex h-[55px] text-[18px] leading-[18px] font-semibold no-underline border-b border-gray-400 items-center"
        to="/contact"
      >
        CONTACT
      </NuxtLink>
    </div>
    <button @click="togglePopup" class="absolute top-[60px] right-[30px]">
      <Icon name="zondicons:close" style="font-size: 28px; color: #ffd700" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      isOpen: false,
    };
  },
  methods: {
    toggleDiv() {
      this.isVisible = !this.isVisible;
    },
    togglePopup() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
