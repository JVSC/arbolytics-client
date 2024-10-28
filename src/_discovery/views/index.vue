<script setup lang="ts">
//@ts-expect-error
import { NSelect, NTooltip } from 'naive-ui';
import { useQuery, useQueryClient } from 'vue-query';
import { getUFs, getCounties } from '../../common/use-cases/ibge';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const selectedUf = ref('');
const selectedCountyId = ref('');
const queryClient = useQueryClient();
const router = useRouter();

//@ts-expect-error
const { data: ufList } = useQuery({ queryKey: 'get_ufs', queryFn: getUFs });
//@ts-expect-error
const { data: countyList } = useQuery({
  queryKey: 'get_county_list',
  queryFn: async () => {
    if (!selectedUf.value) return [];
    return getCounties(selectedUf.value);
  },
});

watch([selectedUf], () => {
  selectedCountyId.value = '';
  queryClient.invalidateQueries(['get_county_list']);
});

watch([selectedCountyId], () => {
  if (!selectedCountyId.value) return;
  router.push({ name: '_county-county_id', params: { countyId: selectedCountyId.value } });
});
</script>

<template lang="pug">
.w-ful.h-full.flex.flex-col.bg-neutral-50.divide-y
  .w-ful.h-20.flex.px-6.py-2
  .w-ful.flex.flex-1.overflow-hidden.divide-x
    .w-80.h-full.flex.flex-col.px-4.gap-4.py-6
      .flex.flex-col.gap-2
        p.font-extrabold.text-gray-500 Estado:
        n-select(filterable v-model:value='selectedUf' size='large' :options='ufList' placeholder='Selecione um estado' clearable)

      .flex.flex-col.gap-2(:class="{ 'opacity-30': !selectedUf }")
        p.font-extrabold.text-gray-500 Municipio:
        n-select(filterable v-model:value='selectedCountyId' size='large' :disabled='!selectedUf' placeholder='Selecione um municipio' :options='countyList' clearable)
    .flex-1.h-full.overflow-hidden
      router-view
  .w-ful.h-20.flex.px-6.py-2
</template>
