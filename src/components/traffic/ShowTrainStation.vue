<template>
  <div id="wrapper">
    <v-row>
      <v-col cols="12" md="5" class="wrapper">
        <h2>Zuglinie</h2>
        <v-select
            v-model="vehicle"
            :items="allVehicle"
            label="Vekehrslinie"
            hint="Wähle eine Vekehrslinie"
            @change="setTimeline"
            attach
            :menu-props="{
              bottom: true,
              offsetY: true,
              offsetOverflow: true,
              rounded: true,
            }"
        ></v-select>
        <v-row v-if="vehicle !== ''">
          <v-col cols="12">
            <ul>
              <li v-for="item in timetable" :key="item.station" :class="item.class">
                <p @click="stationName = item.station"> {{item.station}} <!--||  <span v-for="freight in item.freight" :class="freight.class" :key="freight.name">{{freight.name}}&nbsp;</span>--></p>
              </li>
            </ul>
            <v-divider></v-divider>
            <br>
            <h4>Die Strecke dauert etwa:</h4>
            <p>{{timetableDuration}}</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="12" md="6" class="wrapper">
        <h2>Station</h2>
        <v-row v-if="stationName !== ''">
          <v-col cols="12">
            <ul>
              <li>
                <p>Bahnhof "{{ stationName }}"</p>
              </li>
              <li v-for="station in stations" :key="station.id" :class="station.class !== '' ? station.class : 'freightBlock'">
                <p v-if="station.class!=='freightBlock'"> {{station.freight}} <br> {{station.amount}} || <span :class="{'freightBlock': !station.amountMax}">{{station.max}}</span></p>
                <p v-else :class="station.amountMax"> {{station.freight}} <br> {{station.amount}} || <span :class="station.amountMax">{{station.max}}</span></p>
              </li>
            </ul>
            <v-divider></v-divider>
            <br>
            <h4>Infos zum Bahnhof: </h4>
            <p>{{ stationDescription }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {getPrepared} from "@/store/function";

export default {
  name: "AdminView",
  components: {
  },
  watch: {
    allTimetable() {
      this.setVehicle();
      this.setTimeline();
    },
    stationName() {
      this.setStations();
    }
  },
  data() {
    return {
      isActive: true,
      allVehicle: [],
      vehicle: '',
      timetable: [],
      timetableDuration: '',
      stationName: '',
      stationDescription: '',
      stations: [],
    };
  },
  computed: {
    allTraffic() {
      return this.$store.state.traffic.allTraffic;
    },
    allTimetable() {
      return this.$store.state.traffic.allTimetable;
    },
    allStations() {
      return this.$store.state.traffic.allStations;
    },
  },
  mounted() {
    this.setVehicle();
    this.setTimeline();
  },
  methods: {
    async setStations() {
      let prepared = getPrepared();
      this.stations = [];
      await prepared.collection('traffic').doc(this.stationName).collection('stations').get().then(querySnapshot => {
        let getData = querySnapshot.docs.map(doc => doc.data());
        getData.forEach(e => {
          this.stations.push({
            id: e.name + Math.random(),
            freight: e.name,
            class: e.class,
            amount: e.amount.transport === '' ? '-':e.amount.transport,
            max: e.amount.available === '' ? '-':e.amount.available,
            amountMax: e.amount.transport === e.amount.available
          })
        })
      });
      this.allTraffic.forEach(f => {
        if (this.stationName === f.name) {
          this.stationDescription = f.description;
        }
      })
    },
    setVehicle() {
      this.allTimetable.forEach(e => {
        this.allVehicle.push({
          text: e.name,
          value: e.name
        })
      })
    },

    setTimeline() {
      this.timetable = [];
      this.allTimetable.forEach(e => {
        if (this.vehicle === e.name) {
          e.station.forEach(f => {
            let body = {
              station: f,
              class: '',
            }
            let freightIn = false;
            let freightOut = false;
            let freightInOut = false;

            this.allStations.forEach(g => {
              if (g.name === f) {
                g.stations.forEach(h => {
                  if (!freightIn) {
                    freightIn = h.class === 'freightIn';
                  }
                  if (!freightOut) {
                    freightOut = h.class === 'freightOut';
                  }
                  freightInOut = freightIn && freightOut;
                })
              }
            })
            if (freightIn) {
              body.class = 'freightIn';
            }
            if (freightOut) {
              body.class = 'freightOut';
            }
            if (freightInOut) {
              body.class = 'freightInOut';
            }
            this.timetableDuration = e.duration;
            this.timetable.push(body)

          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/variables.scss";

#wrapper {
  background-color: $background-box;
  border-radius: 20px;
  width: 90%;
  margin: auto;
  padding: 10px 20px;
}
.wrapper {
  background-color: $background-box;
  border-radius: 20px;
  margin: 10px 0;
  padding: 10px 20px;
}
.row {
  /**width: 95%;*/
  margin: auto;
}
p {
  margin: 0;
  cursor: pointer;
}
ul {
  padding: 25px 30px;
  display: block;
  vertical-align: top;
  width: 100%;
}
ul li {
  list-style: none!important;
  line-height: 15px;
  padding-left: 30px;
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
}
ul li:before {
  content: " ";
  top: 27px;
  bottom: 0;
  left: -4px;
  position: absolute;
  width: 4px;
  height: 100%;
  background-color: $line;
}
ul li:last-child:before{
  display: none;
}
ul li:after {
  content: " ";
  top: 50%;
  bottom: 0;
  left: -9px;
  position: absolute;
  width: 15px;
  height: 15px;
  margin-top: -10px;
  background-color: $line;
  -webkit-border-radius: 50%!important;
  -moz-border-radius: 50%!important;
  -ms-border-radius: 50%!important;
  border-radius: 50%!important;
  border: 3px solid $line;
}
ul li.freightInOut:after{
  background-color: $inOut;
}
ul li.freightBlock:after{
  background-color: $block;
}
.freightBlock{
  color: $output;
}
.in{
  color: $input;
}
.out{
  color: $output;
}
ul li.freightIn:after{
  background-color: $input;
}
ul li.freightOut:after{
  background-color: $output;
}
</style>