<template>
  <v-app>
    <div app color="white">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column ma-3 ">
          <div class="d-flex ">
            <v-icon size="30" color="primary">bar_chart</v-icon>
            <h2 class="font-weight-regular" color="black">IRA Application</h2>
          </div>
          <p class="caption">IRA Accounts provided by Fidelity Investments</p>
        </div>

        <v-stepper alt-labels flat="false" tile=false width="40%" class="ml-6">
          <v-stepper-header class="stepper">
            <v-stepper-step step="1">
              IRA Application
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2">
              Risk Assessment
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Upload ID
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <v-spacer></v-spacer>
      </div>

      <v-divider></v-divider>
    </div>

    <v-main>
      <v-container max-width="100" class="ma-0 pa-0 main-container">
        <v-row no-gutters>
          <v-col cols="2">
        <v-navigation-drawer permanent>
          <v-divider></v-divider>

          <v-list dense nav v-for="item in leftNavItems" :key="item.title">
            <v-list-item
              link
              :disabled="item.disabled"
              @click="$router.push({ path: `${item.route}` })"
            >
              <v-list-item-icon class="mr-0">
                <v-icon size="20" :color="item.color">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
          </v-col>
          <v-col>
        <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      leftNavItems: [
        {
          title: "Personal Information",
          icon: "check",
          color: "green",
          disabled: false,
          route: "/personal-info",
        },
        {
          title: "Contact Information",
          icon: "check",
          color: "green",
          disabled: false,
          route: "/contact",
        },
        {
          title: "Relationship",
          icon: "check",
          color: "green",
          disabled: false,
          route: "/relationship",
        },
        {
          title: "Beneficiaries",
          icon: "circle",
          color: "blue",
          disabled: false,
          route: "/beneficiaries",
        },
        {
          title: "Account Characteristics",
          icon: "radio_button_unchecked",
          disabled: true,
          route: "/account",
        },
        {
          title: "Review",
          icon: "radio_button_unchecked",
          disabled: true,
          route: "/review",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.main-container.container {
    max-width:100% !important;
}

.stepper {
  .v-stepper__label {
    font-size: 12px;
} 
}
.v-stepper__header {
    box-shadow: none !important;
}
</style>
