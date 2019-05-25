<template>
  <div class="hello">

  </div>
</template>

<script>
import { transpose, Scale } from "tonal";

export default {
  mounted: function() {
    console.log(transpose("C4", "3M"));
    console.log(Scale.notes("C major"));
  },
  name: "Tonal",
  data() {
    return {}
  },
  methods: {
  }
};
</script>

<style>
.hello {
  text-align: center;
}

#abc-source {
  width: 460px;
  height: 160px;
  padding: 6px;
}

.listener-output {
  border: 1px solid #888888;
  padding: 6px;
  border-radius: 4px;
  width: 460px;
  margin-bottom: 20px;
  margin: auto;
}

.abc-string {
  border: 1px solid #e9ef96;
  padding: 2px;
  height: 24px;
  width: 60px;
  background: #fbf4b8;
}

pre {
  border: 1px solid #888888;
  padding: 6px;
  border-radius: 4px;
  width: 460px;
}

#midi {
  width: 756px;
  margin: auto;
}

.label {
  font-weight: bold;
}
</style>