<template>
  <div>
    <div class="header">
      <h1 class="header__logo">
        <a href="#">
          <div class="mastercard">
            <div class="mastercard__part red"></div>
            <div class="mastercard__part orange"></div>
            <div class="mastercard__copy">
              <span class="js-letters">priceless</span>
            </div>
          </div>
        </a>
      </h1>

      <div class="nav">
        <a class="nav__item" href="#">Cities</a>
        <a class="nav__item" href="#">Courses</a>
        <a class="nav__item" href="#">Surprises</a>
        <a class="nav__item" href="#">Sign In</a>
      </div>
    </div>

    <div class="hero">
      <div class="hero__cover">
        <div class="hero__image"></div>
      </div>

      <div class="hero__strap">
        <h2 class="hero__title">
          <span class="js-letters">Shop the year's</span>
          <span class="js-letters">most exciting</span>
          <span class="js-letters">design fair</span>
        </h2>
        <h3 class="hero__subtitle">New York City</h3>
        <a class="button" href="#">Take Me There</a>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
export default {
  name: 'Index',
  layout: 'NoNavbar',
  head() {
    return {
      script: [
        { src: 'https://code.jquery.com/jquery-2.2.4.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenMax.min.js' }
      ],
      title: 'Home'
    }
  },
  mounted() {
    var Intro = function() {
      this.$title = $('.hero__title');
      this.$subtitle = $('.hero__subtitle');
      this.$button = $('.hero .button');
      this.$logoPartRed = $('.mastercard__part.red');
      this.$logoPartOrange = $('.mastercard__part.orange');
      this.$strings = $('.js-letters');
      this.partSize = 25;
      this.$nav = $('.nav');
      this.w = $(window).width();
      this.coverW = this.w - this.$title.width();

      this.init();
    }

    Intro.prototype = {

      init: function() {
        var _this = this;
        TweenMax.set(this.$nav, {opacity: 0});
        TweenMax.set(this.$logoPartRed, {x: this.partSize / 2});
        TweenMax.set(this.$logoPartOrange, {x: - this.partSize / 2});
        TweenMax.set(this.$subtitle, {y: 10, opacity: 0});
        TweenMax.set(this.$button, {y: 10, opacity: 0});

        this.logoAnim();

        this.$strings.each(function(){
          _this.manageLetters($(this));
        });
      },

      logoAnim: function() {
        var logoTween = new TimelineMax({
          repeat: 4,
          yoyo: true,
          onComplete: this.introAnim.bind(this)
        });

        logoTween
          .to(this.$logoPartRed, 0.5, {
            x: this.partSize / 6,
            ease: Power1.easeInOut
          })
          .to(this.$logoPartOrange, 0.5, {
            x: -this.partSize / 6,
            ease: Power1.easeInOut
          }, '-=0.5')
        ;
      },

      introAnim: function() {
        var introTween = new TimelineMax();
        var $cover = $('.hero__cover');

        introTween
          .staggerTo($(this.$strings[0]).find('.letter'), 0.4, {
            yPercent: -40,
            opacity: 1,
            ease: Back.easeOut
          }, 0.02666)
          .to($cover, 1.8, {
            webkitClipPath:'circle('+ this.coverW +' at 0 0)',
            ease: Power3.easeOut
          }, '-=0.3')
          .staggerTo($(this.$strings[1]).find('.letter'), 0.5, {
            yPercent: -40,
            opacity: 1,
            ease: Back.easeOut
          }, 0.025, '-=1.2')
          .staggerTo($(this.$strings[2]).find('.letter'), 0.5, {
            yPercent: -40,
            opacity: 1,
            ease: Back.easeOut
          }, 0.025, '-=0.9')
          .staggerTo($(this.$strings[3]).find('.letter'), 0.5, {
            yPercent: -40,
            opacity: 1,
            ease: Back.easeOut
          }, 0.025, '-=0.7')
          .to(this.$subtitle, 0.5, {
            opacity: 1,
            y: 0,
            ease: Back.easeOut
          }, '-=0.4')
          .to(this.$button, 0.5, {
            opacity: 1,
            y: 0,
            ease: Back.easeOut
          }, '-=0.3')
          .to(this.$nav, 1.4, {
            opacity: 1
          }, '-=0.2')
        ;
      },

      manageLetters: function($el) {
        var text = $el.text();
        var letters = this.splitString(text);
        var lettersLength = letters.length;
        var final = "";

        for (var i = 0; i < lettersLength; i++) {
          final += "<span class='letter'>" + letters[i] + "</span>";
        }

        $el.html(final);
      },

      splitString: function(str){
        str = str.trim();
        var length = str.length;
        let retArr = [];
        for(var i = 0; i < length; i++){
          if(str[i] === ' '){
            retArr[retArr.length - 1] += '&nbsp;';
            continue;
          }
          retArr.push(str[i]);
        }
        return retArr;
      }

    }

    var intro = new Intro();
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import url(https://fonts.googleapis.com/css?family=Poppins:400);
@import url(https://fonts.googleapis.com/css?family=Raleway:100,200);

%flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

* {
  box-sizing: border-box;
}
$easing: cubic-bezier(0.52, 0.01, 0.16, 1);
$red: #e40019;
$orange: #f39019;
$dark: #1d1d1b;
$light: #f5f2ed;
$part-size: 25px;
$side-padding: 40px;

body {
  margin: 0;
  height: 100vh;
  min-height: 500px;
  background-color: $dark;
  color: $light;
}

a {
  color: $light;
  text-decoration: none;
}

.button {
  position: relative;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid $light;
  padding: 8px 30px;
}

.mastercard {
  @extend %flex-center;
}

.mastercard__part {
  width: $part-size;
  height: $part-size;
  border-radius: 50%;

  &.red {
    background-color: $red;
    transform: translateX($part-size / 6);
  }

  &.orange {
    will-change: transform;
    background-color: lighten($orange, 10%);
    transform: translateX(-$part-size / 6);
    mix-blend-mode: color-dodge;
  }
}

.mastercard__copy {
  overflow: hidden;
  padding-left: 0.2em;

  .letter {
    opacity: 0;
    transform: translateY(40%);
  }

  span {
    display: inline-block;
  }
}

.header {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  padding: $side-padding;
}

.header__logo {
  margin: 0;
  font-size: 1.1em;
  font-weight: normal;
  letter-spacing: 0.1em;
}

.nav {
  margin-left: auto;
  font-size: 1em;
}

.nav__item {
  margin-left: 40px;
}

.hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  font-family: 'Raleway', sans-serif;
  font-weight: 100;
  letter-spacing: 0.05em;
}

.hero__cover {
  will-change: background-position;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  -webkit-clip-path: circle(0 at 0 0);
}

.hero__image {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(https://dreamypixel.com/wp-content/uploads/2017/08/dark-mountains-1.jpg);
  background-size: cover;
  background-position: -50px bottom;
  transition: background-position 2s $easing;
}

.hero__strap {
  position: relative;
  z-index: 5;
  padding: $side-padding $side-padding * 2;
}

.hero__title {
  font-weight: 100;
  margin: 0;
  font-size: 4em;

  & > span {
    display: block;
  }

  .letter {
    display: inline-block;
    opacity: 0;
    transform: translateY(40%);
  }

  .hero__subtitle {
    display: inline-block;
  }
}
</style>
