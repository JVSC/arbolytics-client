<script setup lang="ts">
import { ref, watch } from 'vue';
import Plotly from 'plotly.js-dist-min';
import { useQuery } from 'vue-query';
//@ts-expect-error
import { NRadioGroup, NRadioButton, NSpace, NButton, NH3 } from 'naive-ui';
const chart = ref(null);
const props = defineProps({ traceId: String });
import axios from 'axios';
//@ts-expect-error
const chartTypes = ref([
  { value: 'scatter', label: 'Serie temporal' },
  { value: 'pie', label: 'Setores' },
]);

function useTraceDataQuery() {
  return useQuery('trace_data', async () => {
    const { data } = await axios.get(`http://localhost:5000/${props.traceId}`);
    return data;
  });
}

function useSimilarityTraceDataQuery() {
  return useQuery('similarity_trace_data', async () => {
    const { data } = await axios.get(`http://localhost:5000/${props.traceId}/similarity`);
    return data;
  });
}

const { data: similarityTraceData } = useSimilarityTraceDataQuery();
const { data: traceData } = useTraceDataQuery();

function plotSimilarityChart() {
  if (!chart.value) return;
  const scatterChartData = {
    name: props.traceId,
    type: 'scatter',
    x: traceData.value.data.label,
    y: traceData.value.data.value,
    line: { shape: 'spline', smoothing: 1.3 },
  };
  const plotData = [scatterChartData];
  similarityTraceData.value.forEach((similarTrace: any) => {
    plotData.push({
      name: similarTrace.id,
      type: 'scatter',
      x: similarTrace.labels,
      y: similarTrace.values,
      line: { shape: 'spline', smoothing: 1.3 },
    });
  });
  //@ts-expect-error
  Plotly.newPlot(chart.value, plotData, {}, { displayModeBar: false });
}

function plotProximityChart() {
  if (!chart.value) return;
  const scatterChartData = {
    name: props.traceId,
    type: 'scatter',
    x: traceData.value.data.label,
    y: traceData.value.data.value,
    line: { shape: 'spline', smoothing: 1.3 },
  };
  const plotData = [scatterChartData];
  const reduced = similarityTraceData.value.reduce((acc: { [x: string]: any }, similarTrace: any) => {
    if (!acc?.distance && acc.distance !== 0)
      acc = {
        name: similarTrace.id,
        type: 'scatter',
        x: similarTrace.labels,
        y: similarTrace.values,
        distance: similarTrace.distance,
        line: { shape: 'spline', smoothing: 1.3 },
      };
    if (acc?.distance >= similarTrace.distance)
      acc = {
        name: similarTrace.id,
        type: 'scatter',
        x: similarTrace.labels,
        y: similarTrace.values,
        distance: similarTrace.distance,
        line: { shape: 'spline', smoothing: 1.3 },
      };
    return acc;
  }, {});

  plotData.push(reduced);
  //@ts-expect-error
  Plotly.newPlot(chart.value, plotData, {}, { displayModeBar: false });
}

watch(traceData, () => {
  plotChart(traceData.value.data.label, traceData.value.data.value);
});
function plotChart(x: Array<string>, y: Array<number>) {
  if (!chart.value) return;
  const scatterChartData = {
    name: props.traceId,
    type: 'scatter',
    x,
    y,
    line: { shape: 'spline', smoothing: 1.3 },
  };
  //@ts-expect-error
  Plotly.newPlot(chart.value, [scatterChartData], {}, { displayModeBar: false });
}
</script>

<template lang="pug">
n-space(vertical)
  n-h3 {{ traceId }}
  p Lorem ipsum dolor sit amet, consect
  n-space
    n-button(@click="plotSimilarityChart") Comparar todos
    n-button(@click="plotProximityChart") Ver o mais similar
div(ref='chart')
</template>
