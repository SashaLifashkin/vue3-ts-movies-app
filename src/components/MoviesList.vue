<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Movie } from '../interfaces/interfaces'
import MovieListCard from './MovieListCard.vue'
import { splitIntoChunks } from '../functions/function'

type Props = {
  moviesList: Movie[];
  selectedMovieId: number;
  isPortrait: boolean;
  isLaptop: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'movieSelect', movieId: number): void
}>()

const shift = ref<number>(0)
const moviesCountOnScreen = ref<number>(6)
const liWidth = 144
const shiftStep = 1

const moviesPagesArray = ref<Movie[][]>(splitIntoChunks(props.moviesList, moviesCountOnScreen.value))
const totalPages = ref<number>(Math.ceil(props.moviesList.length / moviesCountOnScreen.value))
const currentPage = ref<number>(0)
const moviesPagesList = ref<Movie[]>(moviesPagesArray.value[currentPage.value])

watch(
  () => currentPage.value,
  (page: number) => {
    if (page < totalPages.value) {
      moviesPagesList.value = [...moviesPagesList.value, ...moviesPagesArray.value[page]]

      if (page === totalPages.value - 1) {
        moviesCountOnScreen.value++
        next(liWidth, moviesCountOnScreen.value, moviesPagesList.value.length, moviesCountOnScreen.value)

        return
      }

      next(liWidth, moviesCountOnScreen.value, moviesPagesList.value.length, moviesCountOnScreen.value)
    }
  }
)

// const moviesOnScreen = computed<Movie[]>({
//   get: () => moviesPagesList.value,
//   set: (moviesPagesArray: Movie[]) => {
//     moviesPagesList.value = [...moviesPagesList.value, ...moviesPagesArray]
//   }
// })
// watch(
//   () => currentPage.value,
//   (page: number) => {
//     moviesOnScreen.value = moviesPagesArray.value[page]
//   }
// )

const onAddNewPage = (): void => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prev = (widthItem: number, step: number): void => {
  const shiftOfStep = widthItem * step

  if (shift.value === 0) {
    return
  } else {
    shift.value = Math.min(shift.value + shiftOfStep, 0)
  }
}

const next = (widthItem: number, step: number, itemsListLength: number, itemsOnScreen: number): void => {
  const maxShift = widthItem * (itemsListLength - itemsOnScreen)
  const shiftOfStep = widthItem * step

  if (shift.value === (-maxShift)) {
    return
  } else {
    shift.value = Math.max(shift.value - shiftOfStep, -maxShift)
  }
}

// const liRefs = ref<HTMLLIElement[]>([])
// const next = () => {
//   liRefs.value[10]?.scrollIntoView({ block: 'end', behavior: 'smooth' })
// }
</script>

<template>
  <section class="list-control">
    <button
      type="button"
      class="prev-button"
      :class="{ hide: !props.isLaptop }"
      @click="prev(liWidth, shiftStep)"
    >
      <img src="../assets/images/arrow-prev.svg" alt="Arrow-next" class="prev-button-arrow" />
    </button>
    <div class="list-pages-container">
      <div
        class="list-container"
        :style="{ '--li-viewed-movies-count': moviesCountOnScreen }"
      >
        <ul
          :style="{
            '--li-count': moviesPagesList.length,
            transition: isLaptop ? `transform ${600}ms ease` : '',
            transform: isLaptop ? `translateX(${shift}px)` : '',
          }"
          class="list"
        >
          <li
              v-for="movie in moviesPagesList"
              :key="movie.id"
              class="list-item"
              :class="{ 'is-active': props.selectedMovieId === movie.id }"
              ref="liRefs"
          >
            <MovieListCard
              :poster="movie.poster"
              :imdb-rating="movie.imdb_rating"
              :title="movie.title"
              @click="() => emit('movieSelect', movie.id)"
            />
          </li>
        </ul>
      </div>
      <div
        class="view-more"
        :class="{ hide: !props.isLaptop || currentPage >= totalPages - 1 }"
      >
        <button
          type="button"
          class="view-more-button"
          @click="onAddNewPage"
        >
          <img class="view-more-button-plus" src="../assets/images/plus_icon.svg"/>
          <p class="view-more-button-text">View more</p>
        </button>
      </div>
    </div>
    <button
      type="button"
      class="next-button"
      :class="{ hide: !props.isLaptop }"
      @click="next(liWidth, shiftStep, moviesPagesList.length, moviesCountOnScreen)"
    >
      <img src="../assets/images/arrow-next.svg" alt="Arrow-next" class="next-button-arrow" />
    </button>
  </section>
</template>

<style>
:root {
  --li-width: 144px;
  --li-context-width: 120px;
  --li-viewed-count: 6;
}

@media (min-width: 1152px) {
  .list-control {
    position: absolute;
    width: 1108px;
    height: 290px;
    left: calc(50% - 1108px/2);
    bottom: 60px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 16px;
  }

  .list-pages-container {
    width: calc((var(--li-viewed-count) + 1) * var(--li-width));
    height: 290px;
    display: flex;
    flex-direction: row;
  }

  .list-container {
    width: calc(var(--li-viewed-movies-count) * var(--li-width));
    overflow: hidden;
  }

  .list {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: calc(var(--li-count) * var(--li-width));
    height: 100%;
    list-style: none;
  }

  .list-item {
    display: flex;
    justify-content: center;
    height: 100%;
    width: var(--li-width);
  }

  .list-item-context {
    cursor: pointer;
  }

  .is-active .list-item-context {
    transform: scale(1.18);
    transform-origin: center center;
  }

  .view-more {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: var(--li-width);
    height: 235px;
    align-self: flex-end;
  }

  .view-more-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 68px;
    height: 50px;
    gap: 8px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .view-more-button-plus {
    width: 24px;
    height: 24px;
  }

  .view-more-button-text {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
  }

  .prev-button, .next-button {
    width: 34px;
    height: 34px;
    align-self: center;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(47px);
  }

  .prev-button-arrow, .next-button-arrow {
    position: absolute;
    width: 20px;
    height: 20px;
    left: calc(50% - 20px/2);
    top: calc(50% - 20px/2);
  }
}

@media (min-width: 900px) and (max-width: 1152px) {
  .list-control {
    width: 40%;
    height: 100%;
    overflow-y: auto;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    padding: 40px 40px 0 16px;
    list-style: none;
  }
}

@media (min-width: 400px) and (max-width: 900px) {
  /* стили для портретной ориентации планшета (iPad) */
  .list-control {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .list {
    /* display: flex;
    flex-wrap: wrap; */
    /* margin-bottom: -16px; */
    /* margin-right: -14px; */
    /* height: auto; */
    padding: 40px 16px 0 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    list-style: none;
    gap: 16px 14px;
  }
}
</style>
