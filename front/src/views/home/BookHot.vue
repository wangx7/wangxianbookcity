<script setup lang="ts">
import { bookList } from '@/api/book/bookApi'
import { type IBookRes } from '@/api/book/types'
import bookCpt from '@/components/bookCpt.vue'
import { ref, type Ref } from 'vue'

const booksHot: Ref<IBookRes[]> = ref([])

bookList({
  offset: '0',
  limit: '12'
}).then((res) => {
  booksHot.value = res.data.data
})
</script>

<template>
  <div class="hot_book_class">
    <h3>热门书籍</h3>
    <div class="book_layout_class">
      <bookCpt class="book_class" v-for="item of booksHot" :key="item.id" v-bind="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hot_book_class {
  padding: 0 20px;
  clear: both;
  max-width: 1400px;
  margin: 0 auto;

  h3 {
    position: relative;

    &::before {
      content: ' ';
      height: 18px;
      width: 4px;
      position: absolute;
      background: #80bd77;
      border-radius: 2px;
      left: -9px;
      top: 6px;
    }
  }

  .book_layout_class {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    .book_class {
      width: 300px;
      margin: 20px;
    }
  }
}
</style>
