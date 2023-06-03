import { ref, type Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { labelList } from '@/api/labelApi'

export interface Ilabel {
  value: number
  text: string
}

export const useLabesStore = defineStore('labels', () => {
  const labels: Ref<Ilabel[]> = ref([])

  const labelcpd = computed(() => {
    return labels
  })

  const setAllLabels = () => {
    labelList({
      offset: '0',
      limit: '100'
    }).then((res) => {
      if (res) {
        labels.value = res.data.map((item) => ({
          value: item.id,
          text: item.name
        }))

        console.log(labels.value , '标签');
        
      }
    })
  }

  return { labels, labelcpd, setAllLabels }
})
