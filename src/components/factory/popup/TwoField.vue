<template>
  <v-dialog
      transition="dialog-top-transition"
      max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          :color="color"
          v-bind="attrs"
          v-on="on"
          x-small
          icon
          style="margin-top: -4px"
      ><v-icon>mdi-pencil</v-icon></v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            :color="color"
            dark
        >Bearbeitung für: {{name}}</v-toolbar>
        <v-card-text>
          <br>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                  v-model="newNeed"
                  label="Stromverbrauch"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                  v-model="newProduce"
                  label="Stromproduktion"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              :color="color"
              @click="dialog.value = false"
          >Schließen und Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
name: "SingleField",
  props: [
    'name',
    'produce',
    'need',
    'color'
  ],
  emits: [
    'changeValue'
  ],
  watch: {
    need() {
      this.newNeed = this.need;
    },
    produce() {
      this.newProduce = this.produce;
    }
  },
  data() {
    return {
      newNeed: this.need,
      newProduce: this.produce,
    };
  },
  methods: {
    save(event) {
      let power = {
        usage: this.newNeed,
        production: this.newProduce
      }
      this.$emit('changeValue', power);
      this.dialog.value = false;
    }
  },
}
</script>

<style scoped>

</style>