<script setup lang="ts">
import { NFC, NfcTag } from "@awesome-cordova-plugins/nfc"
import { onMounted } from "vue";
import { ref } from 'vue'
const rawData = ref<string>("reading")
  const regex = /[dD][bB]-\d{6}-\d+/;
const BatchNo = ref<string>("BatchNo")

onMounted(async () => {
  NFC.readerMode(NFC.FLAG_READER_NFC_A | NFC.FLAG_READER_NFC_V)
    .subscribe(
      (tag: NfcTag) => {
        console.log('GOT TAG')
        console.log("tag. >>", tag.id);
        console.log(tag.ndefMessage)
        console.log(JSON.stringify(tag))
        if (tag.ndefMessage)
          rawData.value = NFC.bytesToString(tag.ndefMessage[0].payload)
        const BatchNoMatch = rawData.value.match(regex)
        if (BatchNoMatch)
        BatchNo.value = BatchNoMatch[0]
      }
    )

})


</script>

<template>
  Test Page
  1
  <div>
    {{ rawData }}
  </div>
  <div class="pt-5">
    {{ BatchNo }}
  </div>
  
</template>