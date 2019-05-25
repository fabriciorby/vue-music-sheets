<template>
  <div class="hello">
    <Tonal/>
    <Partitura :tune="template" :key="template"/>
    <p>Escala atual: {{notas[render]}}</p>
    <button id="scale" v-on:click="render += 1">Mudar Escala</button>
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
    this.template = this.tune + this.getScaleTemplate(notas[this.render]);
  },
  data() {
    return {
      render: 0,
      tune: tune[0],
      template: "",
      notas: notas
    }
  },
  watch: {
    render: function(newRender, oldRender){
      if (newRender == 7) {
        this.render = 0;
      }
      this.template = this.tune + this.getScaleTemplate(notas[this.render])
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
      let template = ["|", first, "|", last, "|]"];
      return template.flatMap(t => t).join(" ");
    }
  }
}
</script>

<style scoped>

</style>
