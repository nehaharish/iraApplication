<template>
  <v-container class="my-5 px-5 beneficiaries">
    <p class="grey--text subtitle-2 mb-7">BENEFICIARIES</p>
    <p class="subtitle-1 font-weight-bold">Primary Beneficiaries</p>
    <v-row v-for="item in rows" :key="item.id">
      <v-col cols="auto">
        <label
          >Full Name
          <v-text-field
            v-model="beneInfo.firstName[item.id]"
            solo
            dense
          ></v-text-field>
        </label>
      </v-col>
      <v-col cols="auto">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <label>
              Date of Birth
              <v-text-field
                v-model="beneInfo.dob[item.id]"
                prepend-inner-icon="mdi-calendar-month-outline"
                readonly
                label="MM/DD/YYYY"
                solo
                dense
                v-bind="attrs"
                v-on="on"
                class="calendar"
              ></v-text-field>
            </label>
          </template>
          <v-date-picker
            v-model="beneInfo.dob[item.id]"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="mt-6" cols="2">
        <v-select label="SSN" :items="select" solo dense></v-select>
      </v-col>
      <v-col class="mt-6 relationship-class" cols="2">
        <v-text-field
          label="Optional"
          solo
          dense
          v-model="ssnInfo[item.id]"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="relationship-class">
        <label>
          Relationship
          <v-select
            label="Select"
            :items="relationshipItems"
            v-model="beneInfo.relationship[item.id]"
            solo
            dense
          ></v-select
        ></label>
      </v-col>
      <v-col cols="1" class="mt-6 px-0 bene-percent-class">
        <v-text-field
          v-model="beneInfo.beneficiaryPercent[item.id]"
          suffix="%"
          label="0"
          solo
          dense
        ></v-text-field>
      </v-col>
      <v-col
        v-if="hasAllInputsFilled[item.id]"
        @click="removeRow(item.id)"
        cols="1"
        class="mt-6 px-0 bene-percent-class"
      >
        <v-btn icon color="red">
          <v-icon size="20">close</v-icon>
        </v-btn>
      </v-col>
      <v-col
        v-if="hasAllInputsFilled[item.id] && beneInfo.checkIcon[item.id]"
        @click="addRow(item.id)"
        cols="1"
        class="mt-6 px-0 bene-percent-class"
      >
        <v-btn icon color="green">
          <v-icon size="20">check</v-icon>
        </v-btn>
      </v-col>
    </v-row>
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
export default {
  name: "Beneficiaries",
  data() {
    return {
      menu: false,
      select: ["SSN"],
      beneInfo: {
        firstName: [],
        dob: [],
        relationship: [],
        beneficiaryPercent: [],
        checkIcon: [true],
      },
      relationshipItems: ["Trust"],
      rows: [{ id: 0 }],
      ssnInfo: [],
      switch1: false,
      primaryTotal: "0%",
    };
  },
  computed: {
    /**
     * computed property to keeps track of whether to show  or hide icons for each row
     */
    hasAllInputsFilled() {
      let tempObj = {};
      for (let item of this.rows) {
        tempObj[item.id] = this.hasAllInputsInRowFilled(item.id);
      }
      return tempObj;
    },
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
    /**
     * check if all the inputs in a particular row are filled
     * if true, update check and cancel icon and return true else false
     */
    hasAllInputsInRowFilled(id) {
      if (
        this.beneInfo.firstName[id] &&
        this.beneInfo.relationship[id] &&
        this.beneInfo.dob[id] &&
        this.beneInfo.beneficiaryPercent[id]
      ) {
        this.showIcon();
        return true;
      } else return false;
    },
    /**
     * Show check icon when all inputs are filled
     */
    showIcon() {
      if (this.rows.length > 1) {
        this.beneInfo.checkIcon.push(true);
      }
    },
    /**
     * function to add new row when check icon is clicked
     */
    addRow(id) {
      this.getPrimaryTotal();
      if (parseInt(this.primaryTotal) < 100) this.rows.push({ id: id + 1 });
      this.beneInfo.checkIcon[id] = false;
    },
    /**
     * function to remove specific row when cancel icon is clicked
     */
    removeRow(id) {
      this.rows.splice(id, 1);
      for (let i = 0; i < this.rows.length; i++) {
        this.rows[i].id = i;
      }
      for (let item in this.beneInfo) {
        this.beneInfo[item].splice(id, 1);
      }
      this.getPrimaryTotal();
    },
    /**
     * function to calculate total primary beneficiaries percent
     */
    getPrimaryTotal() {
      let total = 0;
      if (!this.beneInfo.beneficiaryPercent.length)
        return (this.primaryTotal = `0%`);
      this.beneInfo.beneficiaryPercent.forEach((item) => {
        total += parseInt(item);
      });
      return (this.primaryTotal = `${total}%`);
    },
  },
};
</script>
<style>
.beneficiaries label,
.v-input,
.v-label {
  font-size: 14px !important;
}
.calendar .v-label {
  font-size: 12px !important;
}

.bene-percent-class {
  max-width: 6.333333%;
}
.relationship-class {
  max-width: 11.666666%;
}
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
.bene-percent-class .v-text-field__suffix {
  color: lightgray;
}
</style>
