<script setup lang="ts">
  const props = defineProps<{
    selectedMovie: boolean,
    poster: string,
    imdbRating: number,
    title: string,
  }>()
</script>

<template>
  <figure
    class="list-item-context movie-card"
    :class="{ 'is-active': props.selectedMovie }"
  >
    <img
      :src="props.poster"
      alt="Film poster"
      class="movie-card-poster"
    />
    <div class="movie-card-imdb">
      <img src="../assets/images/imdb-star.svg" alt="movie-card-imdb-star" />
      <span>{{ ` ${props.imdbRating}` }}</span>
      <span class="movie-card-max-raiting">/10</span>
    </div>
    <div class="movie-card-title">{{ props.title }}</div>
  </figure>
</template>

<style>
</style>