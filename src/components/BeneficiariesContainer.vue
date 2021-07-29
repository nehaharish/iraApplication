<template>
  <v-container class="my-8 px-5 beneficiaries">
    <p class="grey--text subtitle-2 mb-7">BENEFICIARIES</p>
    <p class="subtitle-1 font-weight-bold">Primary Beneficiaries</p>
    <Beneficiaries @primaryTotal="updatePrimaryTotal" />
    <v-card
      flat
      width="80%"
      class=" subtitle-2 font-weight-bold d-flex flex-row-reverse mr-15"
    >
      <v-card class="py-2 px-2" :class="getPrimaryTotalColor" flat>
        <span v-if="primaryTotal === '100%'"
          ><v-icon color="#6cd0a0">check</v-icon></span
        >
        Primary Total: {{ primaryTotal }}
      </v-card>
    </v-card>
    <v-card class="d-flex  mt-10 align-center mb-10" flat tile>
      <v-card flat class="font-weight-bold subtitle-2 mr-4"
        >Contingent Beneficiaries</v-card
      >
      <v-switch v-model="switch1" inset></v-switch>
    </v-card>
    <v-btn v-if="primaryTotal === '100%'" width="120" dark color="#008eff"
      >Next</v-btn
    >
    <button type="button" v-else class="disabled-btn" disabled>Next</button>
  </v-container>
</template>

<script>
import Beneficiaries from "./Beneficiaries.vue";
export default {
  name: "BeneficiariesContainer",
  data() {
    return {
      primaryTotal: "0%",
    };
  },
  components: {
    Beneficiaries,
  },
  computed: {
    /**
     * property to show different color and background color
     *  when primary total reach to 100% or less than 100%
     */
    getPrimaryTotalColor() {
      return {
        primaryTotalClass: this.primaryTotal === "100%",
        primaryTotalClass1: this.primaryTotal !== "100%",
      };
    },
  },
  methods: {
    updatePrimaryTotal(value) {
      this.primaryTotal = value;
    },
  },
};
</script>

<style type="SCSS">
.disabled-btn {
  color: white;
  background-color: #c7c7c7;
  width: 120px;
  height: 33px;
  border-radius: 5px;
}
.primaryTotalClass {
  background-color: #f3fdf8 !important;
  color: #6cd0a0 !important;
}
.primaryTotalClass1 {
  background-color: #fff9f1 !important;
  color: #fdba05 !important;
}
</style>
