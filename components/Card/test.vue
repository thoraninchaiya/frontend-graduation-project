<template>
  <div>
    <ul class="cards">
      <li class="cards__item">
        <div class="card">
          <div class="card__image card__image--fence"></div>
          <div class="card__content">
            <div class="card__title">Flex</div>
            <p class="card__text">This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is 0 1 auto. </p>
            <button class="btn btn--block card__btn">Button</button>
          </div>
        </div>
      </li>
      <li class="cards__item">
        <div class="card">
          <div class="card__image card__image--river"></div>
          <div class="card__content">
            <div class="card__title">Flex Grow</div>
            <p class="card__text">This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up.</p>
            <button class="btn btn--block card__btn">Button</button>
          </div>
        </div>
      </li>
      <li class="cards__item">
        <div class="card">
          <div class="card__image card__image--record"></div>
          <div class="card__content">
            <div class="card__title">Flex Shrink</div>
            <p class="card__text">This defines the ability for a flex item to shrink if necessary. Negative numbers are invalid.</p>
            <button class="btn btn--block card__btn">Button</button>
          </div>
        </div>
      </li>
      <li class="cards__item">
        <div class="card">
          <div class="card__image card__image--flowers"></div>
          <div class="card__content">
            <div class="card__title">Flex Basis</div>
            <p class="card__text">This defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means "look at my width or height property."</p>
            <button class="btn btn--block card__btn">Button</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
:root{
    --gray-darker: #444444;
    --gray-dark: #696969;
    --gray: #999999;
    --gray-light: #cccccc;
    --gray-lighter: #ececec;
    --gray-lightest: lighten(--gray-lighter,4%);    
}

img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}

.btn {
  background-color: white;
  border: 1px solid --gray-light;
  color: --gray-dark;
  padding: 0.5rem;
  text-transform: lowercase;
}

.btn--block {
  display: block;
  width: 100%;
}
 
.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cards__item {
  display: flex;
  padding: 1rem;
  @media(min-width: 40rem) {
    width: 50%;
  }
  @media(min-width: 56rem) {
    width: 33.3333%;
  }
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* add */
.card:hover, .card__image{
    filter: contrast(100%);
}

.card__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
}

.card__image {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  filter: contrast(70%);
  overflow: hidden;
  position: relative;
  transition: filter 0.5s cubic-bezier(.43,.41,.22,.91);
  
  @media(min-width: 40rem) {
    ::before {
      padding-top: 66.6%;
    }
  }
}
.card__image::before{
    content: "";
	display: block;
    padding-top: 56.25%;
  }



.card__image--flowers {
  background-image: url(https://unsplash.it/800/600?image=82);
}

.card__image--river {
  background-image: url(https://unsplash.it/800/600?image=11);
}

.card__image--record {
  background-image: url(https://unsplash.it/800/600?image=39);
}

.card__image--fence {
  background-image: url(https://unsplash.it/800/600?image=59);
}

.card__title {
  color: ---gray-dark;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.card__text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}
</style>