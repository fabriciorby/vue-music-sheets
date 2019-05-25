<template>
  <div class="hello">
    <Tonal/>
    <h1>Escala de {{notas[render]}}</h1>
    <Partitura :tune="template" :key="template"/>
    <section class="opcoes">
        <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="vw">VW</option>
            <option value="audi" selected>Audi</option>
        </select>
        <button id="scale" v-on:click="render += 1">Mudar Escala</button>
        <button v-on:click="template = tune[1]">Mudar música</button>
    </section>
  </div>
</template>

<script>
import Partitura from './Partitura.vue'
import Tonal from './Tonal.vue'
import { Scale } from "tonal";
import tune from '../assets/tune.js'

const notas = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export default {
  name: 'Principal',
  components: {
    Partitura,
    Tonal
  },
  mounted: function() {
    this.template = this.tune[0].replace("nome", "Escala de " + notas[this.render]) +
                    this.getScaleTemplate(notas[this.render]);
  },
  data() {
    return {
      render: 0,
      tune: tune,
      template: "",
      notas: notas
    }
  },
  watch: {
    render: function(newRender, oldRender){
      if (newRender == 7) {
        this.render = 0;
      }
      this.template = this.tune[0].replace("nome", "Escala de " + notas[this.render]) +
                      this.getScaleTemplate(notas[this.render]);
    }
  },
  methods: {
    getScaleTemplate(tom) {
      const menorNota = notas.indexOf(tom);
      let scale = Scale.notes(tom + ' major')
      .map((t, i) => {
        if (t.endsWith("#")) {
          return "^" + t.charAt(0);
        } else if (t.endsWith("b")) {
          return "_" + t.charAt(0);
        } else {
          return t;
        }
      })
      .map((t, i) => {
        let charTom = t.length < 2 ? 0 : 1;
        if (notas.indexOf(t.charAt(charTom)) < menorNota) {
          return t.toLowerCase();
        } else {
          return t;
        }
      })
      .map(t => t + "2");
      scale.push(scale[0].toLowerCase());
      return this.getTemplate(scale);
    },
    getTemplate(scale) {
      const first = scale.slice(0, 4);
      const last = scale.slice(4, 8);
      const template = ["|", first, "|", last, "|]"].flatMap(t => t).join(" ");
      return template;
    }
  }
}
</script>

<style scoped>

h1 {
    margin-bottom: 0;
}

.opcoes {
    margin: 15px;
}

</style>
