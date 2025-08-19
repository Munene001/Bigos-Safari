<script setup lang="ts">
import Container from "~/components/Container.vue";
</script>

<template>
  <div
    class="bg-[url('/public/wood.jpg')] bg-cover bg-center w-full flex flex-col font-sinco"
  >
    <div
      class="text-white flex flex-col text-center h-[300px] justify-center bg-gradient-to-b from-black/20 to-black/10 font-[Sans-serif] px-[20px] font-sinco"
    >
      <div class="text-[74px] font-semibold font-serif">Contact</div>
      <div class="text-[25px] font-bold">
        We know you have many question about us so please, let us know !
      </div>
    </div>
    <div
      class="flex flex-col gap-[20px] items-center py-[20px] md:grid md:grid-cols-3 md:px-[50px]"
    >
      <Container
        title="Location"
        description=" Lenana Road 22 street"
        desc=" Kilimani, Nairobi"
        iconity="mingcute:location-fill"
      />
      <Container
        title="Mail"
        description="info@bigossafari.co.ke"
        desc="info@example.mail.com"
        iconity="ic:baseline-mail"
      />
      <Container
        title="Phone number"
        description="+254715067768"
        desc="+254712345678"
        iconity="mingcute:phone-line"
      />
    </div>
    <div
      class="text-white bg-gradient-to-b from-black/20 to-black-10 h-[80px] text-[24px] font-bold self-center align-self-center"
    >
      Reach Us
    </div>

    <div
      class="flex flex-col items-center pb-[100px] md:flex md:flex-row w-[100%] md:px-[20px] font-[Sans-serif]"
    >
      <div class="md:w-[40%] w-[93%] md:h-[536px] h-[400px]">
        <iframe
          title="Lenana road, 22 street Kilimani, Nairobi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.1323030037765!2d36.791776573848246!3d-1.288768098698983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10bb1f9d8fe9%3A0x9e0bf302b6b1348c!2sLenana%20Rd%2C%20Nairobi!5e1!3m2!1sen!2ske!4v1750329613335!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div
        class="flex flex-col px-[10px] py-[20px] bg-gray-100 md:border md:border-black md:py-[20px] md:px-[40px] gap-[28px] md:w-[60%] w-[93%] md:h-[536px]"
      >
        <div class="flex flex-col gap-[8px]">
          <div class="text-[24px] leading-[31px] font-semibold">
            Inquire from us
          </div>
        </div>
        <div>
          <form class="grid">
            <div class="md:flex md:flex-row md:gap-[60px]">
                <div>
            <label
              class="flex items-start text-[17px] leading-[25px] font-medium"
              >FirstName</label
            >
            <input
              class="w-full md:w-[300px] h-[42px] border border-black mb-[15px] mt-[1px] p-[4px] box-border"
              type="text"
              placeholder=""
            />
            </div>
            <div>
            <label
              class="flex  items-start text-[17px] leading-[25px] font-medium"
              >LastName</label
            >
            <input
              class="w-full
              md:w-[300px] 
               h-[42px] border border-black mb-[15px] mt-[1px] p-[4px] box-border"
              type="text"
              placeholder=""
            />
            </div>
            </div>
            <div class="md:flex md:flex-row md:gap-[60px]">
                <div>
            <label
              class="flex items-start text-[17px] leading-[25px] font-medium p-[4px] box-border"
              >Phone Number</label
            >
            <input
              class=" md:w-[300px] w-full h-[42px] border border-black mb-[15px] mt-[1px] p-[4px]"
              type="phone"
              placeholder=""
            />
            </div>
            <div>
            <label
              class="flex items-start text-[17px] leading-[25px] font-medium p-[4px] box-border"
              >Email</label
            >
            <input
              class=" md:w-[300px] w-full h-[42px] border border-black mb-[15px] mt-[1px] p-[4px]"
              type="email"
              placeholder=""
            />
            </div>
            </div>
            <label
              class="flex items-start text-[17px] leading-[25px] font-medium mt-[1px] p-[4px] box-border"
              >Message</label
            >
            <textarea
              class="  h-[102px] md:h-[160px] md:w-[91%] border border-black mb-[15px] mt-[1px] p-[4px] box-border"
            ></textarea>
            <button
              class="block bg-[#4A3620] text-white font-medium w-[50%] h-[38px] md:h-[50px] mx-auto hover:bg-transparent border-2 border-black-500;"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
