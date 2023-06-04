<template>
  <section>
    <img :src="coverHref" alt="封面" />

    <article>
      <a :href="bookHref" @click="addLooks" target="_blank"
        ><h3>{{ bookName }}</h3></a
      >

      <address>{{ author }}</address>
      {{ blurb }}
    </article>
  </section>
</template>

<script setup lang="ts">
import { looks } from '@/api/book/bookApi'
import { addBookHistory } from '@/api/userApi'
const props = defineProps({
  id: Number,
  labelId: Number,
  userId: Number,
  bookName: String,
  bookHref: String,
  coverHref: String,
  blurb: String,
  author: String
})

function addLooks() {
  if (props.id) {
    looks({ id: props.id })
    addBookHistory({ id: props.id })
  }
}
</script>

<style scoped lang="scss">
section {
  padding: 10px;
  max-height: 160px;
  overflow: hidden;

  img {
    float: left;
    width: 70px;
    height: 100px;
    margin-right: 10px;
    background-color: #c6b580;
    box-shadow: 0 6px 14px 0 rgba(158, 172, 182, 0.25);
    border-radius: 10px 0 10px 5px;
    object-fit: contain;
    // margin: ;
  }

  article {
    text-align: justify;
  }
}
</style>
