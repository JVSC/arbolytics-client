<script setup lang="ts">
import { ref, watch } from 'vue';
const chart = ref(null);
import { useRoute } from 'vue-router';
import Plotly from 'plotly.js-dist-min';
import { useQuery, useQueryClient } from 'vue-query';
import { getCNESUnits } from '../../../common/use-cases/demas';
import LoadingAnimation from '../../../common/assets/file-searching-ani.gif';
const route = useRoute();
const queryClient = useQueryClient();
const { isLoading } = useQuery({
  queryKey: 'units_list',
  queryFn: async () => {
    return getCNESUnits({ countyCode: `${route.params.countyId}`, limit: 65, offset: 0 });
  },
  onSuccess(data: any) {
    if (!chart.value) return;

    const randomDataIndex = Math.round(Math.random() * (data.length - 1));
    const randomData = data[randomDataIndex];
    Plotly.newPlot(chart.value, data, {
      autosize: true,
      height: 900,
      hovermode: 'closest',
      //@ts-expect-error
      map: {
        bearing: 0,
        style: 'light',
        pitch: 0,
        zoom: 11.7,
        center: {
          lat: randomData.lat[0],
          lon: randomData.lon[0],
        },
      },
    });
  },
});

watch([route], () => {
  queryClient.invalidateQueries(['units_list']);
});
</script>
<template lang="pug">

//n-modal(v-model:show="chartIndexDialog")
  n-card(
    @close='chartIndexDialog = false'
    closable
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
    title="Detalhamento"
    style="width: 800px"
  )
    geo-point-detail(:trace-id='selectedChartTraceId')

.w-full.h-full.bg-white.relative.flex.justify-center.items-center.relative
  .w-full.h-full.absolute.z-50.items-center.justify-center.flex.scale-150.bg-neutral-50(v-if="isLoading")
    img(:src='LoadingAnimation')
  div.w-full.h-full.relative(ref='chart')
</template>
