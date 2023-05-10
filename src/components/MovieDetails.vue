<script setup lang="ts">
import type { Movie } from '../interfaces/interfaces'
import { hoursAndMinutes, getPersons } from '../functions/function'

const props = defineProps<{
  selectedMovie: Movie,
  isMovieTabDetail: boolean,
  isHideButtonClick: boolean,
  isPortrait: boolean,
}>()
const emit = defineEmits<{ (e: 'movieDetailHide'): void }>()

// const movieTag = ref<HTMLDivElement | null>(null)
// const onMovieButtonClick = () => {
//   nextTick(() => {
//     if (movieTag.value?.classList.contains('movie-resize-hide')) {
//       movieTag.value?.classList.remove('movie-resize-hide')
//     }

//     movieTag.value?.classList.add('movie-hide-click')
//   })
// }
</script>

<template>
  <section
    class="movie"
    :class="{
      'movie-show': isPortrait && props.isMovieTabDetail,
      'movie-hide-click': isPortrait && props.isHideButtonClick,
    }"
    ref="movieTag"
  >
    <button
      type="button"
      class="movie-details-hide"
      :class="{ hide: !isPortrait }"
      @click="emit('movieDetailHide')"
    >
      <img src="../assets/images/vector-left.svg" alt="Hide button"/>
    </button>
    <div class="movie-details-block">
      <figure
        class="movie-image"
        :style="{
          backgroundImage: `linear-gradient(180deg, rgba(22, 22, 22, 0) 47.99%, #161616 100%), url(${props.selectedMovie.bg_picture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }"
      ></figure>
      <div class="movie-main-info">
        <div class="movie-details">
          <button
            type="button"
            class="movie-details-trailer"
          >
            <img src="../assets/images/play.svg" alt="play-button"/>
            <span>Watch trailer</span>
          </button>
          <div class="movie-details-name">
              <span>{{ props.selectedMovie.title }}</span>
              <span class="movie-details-release">
                {{ `(${props.selectedMovie.release_year})` }}
              </span>
          </div>
          <div class="movie-details-description">
            {{ props.selectedMovie.description }}
          </div>
          <div class="movie-details-genres">
            <span class="genres">
              {{ props.selectedMovie.genres.map(genre => genre.title).join(', ') }}
            </span>
            <span class="genres-delimiter">|</span>
            <span class="movie-details-mpa-rating">
              {{ props.selectedMovie.mpa_rating }}
            </span>
            <span class="genres-delimiter">|</span>
            <span class="movie-details-duration">
              {{ hoursAndMinutes(props.selectedMovie.duration) }}
            </span>
          </div>
          <div class="movie-details-imdb">
            <p class="movie-details-imdb-text">IMDb rating</p>
            <img src="../assets/images/imdb-star.svg" alt="imdb-star" />
            <span class="movie-details-imdb-rating">
              {{ ` ${props.selectedMovie.imdb_rating}` }}
            </span>
            <span class="movie-details-imdb-max-raiting">/10</span>
          </div>
        </div>
        <div class="movie-details-persons">
          <div v-if="props.selectedMovie.directors.length" class="movie-details-director">
            <span class="position">{{ 'Direstors: ' }}</span>
            <span class="persons">{{ getPersons(props.selectedMovie.directors) }}</span>
          </div>
          <div v-if="props.selectedMovie.writers.length" class="movie-details-writers">
            <span class="position">{{ 'Writers: ' }}</span>
            <span class="persons">{{ getPersons(props.selectedMovie.writers) }}</span>
          </div>
          <div v-if="props.selectedMovie.stars.length" class="movie-details-stars">
            <span class="position">{{ 'Stars: ' }}</span>
            <span class="persons">{{ getPersons(props.selectedMovie.stars) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@media (min-width: 1152px) {
  .movie {
    width: 100%;
    height: 100%;
  }

  .movie-details-block {
    width: 100%;
    height: 100%;
    background: #161616;
  }

  .movie-image {
    width: 100%;
    height: 100%;
  }

  .movie-main-info {
    position: absolute;
    width: 1240px;
    height: 276px;
    left: calc(50% - 1240px/2);
    top: 242px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .movie-details {
    grid-column: 1 / 2;
    display: grid;
    grid-template-rows: minmax(54px, max-content) minmax(50px, max-content) minmax(66px, max-content) minmax(22px, max-content) minmax(42px, max-content);
    /* grid-template-rows: minmax(54px, 1fr) minmax(160px, 1fr) minmax(62px, 1fr); */
    padding: 0 18px 0 18px;
  }

  .movie-details-imdb {
    grid-row: 1 / 2;
    width: 96px;
    height: 54px;
  }

  .movie-details-imdb-text {
    width: 96px;
    height: 22px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #E2E2E2;
  }

  .movie-details-imdb img {
    width: 20px;
    height: 20px;
  }

  .movie-details-imdb-rating {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    color: #FFFFFF;
  }

  .movie-details-imdb-max-raiting {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #E2E2E2;
  }

  .movie-details-name {
    grid-row: 2 / 3;
    font-family: 'Krona One';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 50px;
    color: #FFFFFF;
  }

  .movie-details-release {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    color: #FFFFFF;
    margin-left: 8px;
  }

  .movie-details-description {
    grid-row: 3 / 4;
    margin-top: 12px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #FFFFFF;
  }

  .movie-details-genres {
    grid-row: 4 / 5;
    margin-top: 12px;
  }

  .movie-details-genres :not(:last-child) {
    margin-right: 20px;
  }

  .genres, .movie-details-mpa-rating, .movie-details-duration {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #FFFFFF;
  }

  .genres-delimiter {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #A6A6A6;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .movie-details-trailer {
    grid-row: 5 / 6;
    width: 160px;
    height: 42px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    background: #DA1617;
    box-shadow: 2px 2px 4px rgba(61, 61, 61, 0.05);
    border-radius: 2px;
    border: none;
  }

  .movie-details-trailer span {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
  }

  .movie-details-trailer img {
    width: 14px;
    height: 14px;
  }

  /* section for movie-details-people */
  .movie-details-persons {
    grid-column: 2 / 3;
    align-self: end;
    justify-self: end;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: start;
    width: max-content;
    height: max-content;
    /* width: 320px;
    height: 104px; */
    margin-bottom: 34px;
  }

  .movie-details-persons :not(:first-child) {
    margin-top: 8px;
  }

  .movie-details-director,
  .movie-details-writers,
  .movie-details-stars {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #E2E2E2;
  }

  .position {
    color: #E2E2E2;
  }

  .persons {
    color:#FFFFFF;
  }
}

@media (min-width: 900px) and (max-width: 1151px) {
  /* стили для горизонтальной ориентации планшета (iPad) */
  .movie {
    position: relative;
    width: 60%;
    height: 100%;
  }

  .movie-details-block {
    width: 100%;
    height: 100%;
    background: #161616;
  }

  .movie-image {
    width: 100%;
    height: 50%;
    min-height: 390px;
  }

  .movie-main-info {
    position: absolute;
    left: 0;
    bottom: 72px;
    display: grid;
    grid-template-rows: 1fr minmax(84px, max-content);
    padding: 8px 18px 0 18px;
  }

  .movie-details {
    grid-row: 1 / 2;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    /* grid-template-columns: repeat(12, 54px); */
    grid-template-rows: minmax(40px, max-content) minmax(54px, max-content) minmax(22px, max-content);
  }

  .movie-details-name {
    grid-row: 1 / 2;
    grid-column: 1 / 8;
    font-family: 'Krona One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 40px;
    color: #FFFFFF;
  }

  .movie-details-release {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    color: #FFFFFF;
    margin-left: 8px;
  }

  .movie-details-description {
    grid-row: 2 / 3;
    grid-column: 1 / 10;
    align-self: end;
    justify-self: end;
    margin-top: 34px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #FFFFFF;
  }

  .movie-details-genres {
    grid-row: 3 / 4;
    grid-column: 1 / 8;
    margin-top: 12px;
  }

  .movie-details-genres :not(:last-child) {
    margin-right: 20px;
  }

  .genres,
  .movie-details-mpa-rating,
  .movie-details-duration {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #FFFFFF;
  }

  .genres-delimiter {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #A6A6A6;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .movie-details-trailer {
    grid-column: 9 / 13;
    grid-row: 1 / 2;
    justify-self: end;
    width: 180px;
    height: 48px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #DA1617;
    box-shadow: 2px 2px 4px rgba(61, 61, 61, 0.05);
    border-radius: 2px;
    border: none;
  }

  .movie-details-trailer span {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
  }

  .movie-details-imdb {
    grid-row: 2 / 3;
    grid-column: 10 / 13;
    justify-self: end;
    width: 100px;
    height: 54px;
    margin-top: 30px;
  }

  .movie-details-imdb-text {
    width: 96px;
    height: 22px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #E2E2E2;
  }

  .movie-details-imdb-text img {
    width: 20px;
    height: 20px;
  }

  .movie-details-imdb-rating {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    color: #FFFFFF;
  }

  .movie-details-imdb-max-raiting {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #E2E2E2;
  }

  /* section for movie-details-people */
  .movie-details-persons {
    grid-row: 2 / 3;
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: start;
    width: max-content;
    height: max-content;
    /* width: 320px;
    height: 104px; */
    margin-bottom: 34px;
  }

  .movie-details-persons :not(:first-child) {
    margin-top: 8px;
  }

  .movie-details-director,
  .movie-details-writers,
  .movie-details-stars {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #E2E2E2;
  }

  .position {
    color: #E2E2E2;
  }

  .persons {
    color:#FFFFFF;
  }
}

@media (min-width: 400px) and (max-width: 899px) {
  /* стили для портретной ориентации планшета (iPad) */
  .movie {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .movie-show {
    transform: translateX(0);
    transition: transform 0.5s ease 0.3s;
  }

  .movie-hide-click {
    transform: translateX(-100%);
    transition: transform 0.5s ease 0.3s;
  }

  .movie-details-hide {
    position: absolute;
    top: 30px;
    left: 18px;
    display: block;
    width: 32px;
    height: 32px;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  .movie-details-block {
    width: 100%;
    height: 100%;
    background: #161616;
  }

  .movie-image {
    height: 65%;
    max-height: 785px;
  }

  .movie-main-info {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 45%;
    display: grid;
    grid-template-rows: 1fr minmax(84px, max-content);
    padding: 0 24px 0 24px;
  }

  .movie-details {
    grid-row: 1 / 2;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    /* grid-template-columns: repeat(12, 69px); */
    grid-template-rows: minmax(50px, max-content) minmax(66px, max-content) minmax(24px, max-content);
  }

  .movie-details-name {
    grid-row: 1 / 2;
    grid-column: 1 / 8;
    font-family: 'Krona One';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 50px;
    color: #FFFFFF;
  }

  .movie-details-release {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    color: #FFFFFF;
    margin-left: 8px;
  }

  .movie-details-description {
    grid-row: 2 / 3;
    grid-column: 1 / 10;
    align-self: end;
    justify-self: end;
    margin-top: 34px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #FFFFFF;
  }

  .movie-details-genres {
    grid-row: 3 / 4;
    grid-column: 1 / 8;
    margin-top: 16px;
  }

  .movie-details-genres :not(:last-child) {
    margin-right: 20px;
  }

  .genres,
  .movie-details-mpa-rating,
  .movie-details-duration {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #FFFFFF;
  }

  .genres-delimiter {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #A6A6A6;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .movie-details-trailer {
    grid-column: 9 / 13;
    grid-row: 1 / 2;
    justify-self: end;
    width: 180px;
    height: 48px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #DA1617;
    box-shadow: 2px 2px 4px rgba(61, 61, 61, 0.05);
    border-radius: 2px;
    border: none;
  }

  .movie-details-trailer span {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
  }

  .movie-details-imdb {
    grid-row: 2 / 3;
    grid-column: 10 / 13;
    justify-self: end;
    width: 100px;
    height: 54px;
    margin-top: 30px;
  }

  .movie-details-imdb-text {
    width: 96px;
    height: 22px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #E2E2E2;
  }

  .movie-details-imdb-text img {
    width: 20px;
    height: 20px;
  }

  .movie-details-imdb-rating {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 33px;
    color: #FFFFFF;
  }

  .movie-details-imdb-max-raiting {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #E2E2E2;
  }

  /* section for movie-details-people */
  .movie-details-persons {
    grid-row: 2 / 3;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: start;
    width: max-content;
    height: max-content;
    margin-bottom: 132px;
  }

  .movie-details-persons :not(:first-child) {
    margin-top: 8px;
  }

  .movie-details-director,
  .movie-details-writers,
  .movie-details-stars {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #E2E2E2;
  }

  .position {
    color: #E2E2E2;
  }

  .persons {
    color:#FFFFFF;
  }
}
</style>
