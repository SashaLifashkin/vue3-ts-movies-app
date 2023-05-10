<script setup lang="ts">
  const props = defineProps<{
    poster: string,
    imdbRating: number,
    title: string,
  }>()
</script>

<template>
  <figure class="list-item-context">
    <img
      :src="props.poster"
      alt="Film poster"
      class="poster"
    />
    <div class="imdb">
      <img src="../assets/images/imdb-star.svg" alt="imdb-star" />
      <span>{{ ` ${props.imdbRating}` }}</span>
      <span class="max-raiting">/10</span>
    </div>
    <div class="title">{{ props.title }}</div>
  </figure>
</template>

<style>
@media (min-width: 1152px) {
  /* стили для ноутбука */
  .list-item-context {
    width: 120px;
    height: 235px;
    align-self: flex-end;
  }

  .poster {
    width: 120px;
    height: 170px;
    background-color: rgba(22, 22, 22, 0.2);
  }

  .imdb {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
  }

  .imdb img {
    width: 12px;
    height: 12px;
  }

  .max-raiting {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #E2E2E2;
  }

  .title {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
  }
}

@media (min-width: 900px) and (max-width: 1152px) {
  /* стили для горизонтальной ориентации планшета (iPad) */
  .list-item-context {
    max-width: 190px;
    /* max-height: 245px; */
    height: max-content;
  }

  .poster {
    /* width: 190px; */
    width: 100%;
    height: 215px;
    object-fit: cover;
    object-position: center;
  }

  .imdb {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
  }

  .imdb img {
    width: 16px;
    height: 16px;
  }

  .max-raiting {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    /* grey */
    color: #E2E2E2;
  }

  .title {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    /* white */
    color: #FFFFFF;
  }
}

@media (min-width: 400px) and (max-width: 900px) {
  /* стили для портретной ориентации планшета (iPad) */
  .list-item-context {
    width: 100%;
    /* height: 245px; */
  }

  .poster {
    width: 100%;
    height: 215px;
    object-fit: cover;
    object-position: center;
  }

  .imdb {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
  }

  .imdb img {
    width: 16px;
    height: 16px;
  }

  .max-raiting {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #E2E2E2;
  }

  .title {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
  }
}
</style>