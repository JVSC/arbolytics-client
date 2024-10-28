<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const chart = ref(null);
import Plotly from 'plotly.js-dist-min';
onMounted(async () => {
  if (!chart.value) return;
  Plotly.newPlot(
    chart.value,
    [
      {
        name: '',
        //@ts-expect-error
        type: 'scattermap',
        mode: 'markers',
      },
    ],
    {
      paper_bgcolor: 'rgba(0,0,0,0)', //background color of the chart container space
      map: {
        bearing: 0,
        style: 'light',
        pitch: 0,
        zoom: 14,
      },
    },
    { displayModeBar: false },
  );
});
</script>

<template lang="pug">
.w-full.h-full.overflow-auto
  div.relative(ref='chart' style='height: 100%; backgroundColor: "black"')
</template>
