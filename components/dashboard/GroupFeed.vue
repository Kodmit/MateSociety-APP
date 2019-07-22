<template>
  <div class="group_feed">
    <form class="input-form" @submit.prevent="submit">
      <div class="input-form--container">
        <div class="input-form--wrapper">
          <textarea v-model="content" cols="30" rows="10" placeholder="Ecrivez quelque chose..." />
        </div>
      </div>

      <div v-if="images.length > 0" class="images" @click="$modal.show('upload-images')">
        <div v-for="image in images" :key="image.default">
          <img :src="image.path">
        </div>
        <div id="overlay">
          <h2 class="img-title">
            éditer
          </h2>
          <i class="fal fa-edit img-icon" />
        </div>
      </div>

      <div class="input-form--tools control-group">
        <button class="kod_button light" @click="$modal.show('upload-images')">
          Photos <i class="fas fa-images" />
        </button>
        <modal height="auto" width="450px" name="upload-images">
          <div id="vue-upload-multiple-image" style="display: flex; justify-content: center;">
            <upload-multiple-image
              :data-images="images"
              drag-text="Ajoutez une image"
              browse-text="Parcourir"
              primary-text="Image principale"
              mark-is-primary-text="Définir comme image principale"
              popup-text="Description de l'image"
              drop-text="Glissez une image"
              max-image="3"
              class="image-container2"
              @upload-success="uploadImageSuccess"
              @data-change="dataChange"
              @before-remove="beforeRemove"
              @edit-image="editImage"
            />
          </div>
          <span class="button-modal-ok" @click="$modal.hide('upload-images')">
            <i class="far fa-check" />
          </span>
        </modal>

        <button type="submit" class="kod_button primary" style="float: right">
          Publier <i class="fas fa-paper-plane" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'GroupFeed',
  data() {
    return {
      images: [],
      content: ''
    }
  },
  mounted() {
    console.log(this.images)
  },
  methods: {
    uploadImageSuccess(formData, index, fileList) {
      this.images = fileList
      console.log('data', formData, index, fileList)
      // Upload image api
      // axios.post('http://your-url-upload', { data: formData }).then(response => {
      //   console.log(response)
      // })
    },
    dataChange(data) {
      console.log(data)
    },
    beforeRemove(index, done, fileList) {
      this.images = fileList
      const r = confirm('Voulez-vous supprimer l\'image ?')
      if (r === true) {
        done()
      }
    },
    editImage(formData, index, fileList) {
      this.images = fileList
    },
    submit() {
      // const self = this
      const formData = new FormData()
      formData.content = this.content

      this.images.forEach(function (image) {
        console.log(image.default)
        const imageData = new FormData()
        imageData.set('by_default', image.default)
        imageData.set('highlight', image.highlight)
        imageData.set('name', image.name)
        imageData.set('path', image.path)
        console.log(imageData)
        // self.$axios.post('/image_objects')
      })

      console.log(formData)
    }
  }
}
</script>

<style lang="scss">
  $gutter: 15px;
  $b-line-height: 38px;

  .group_feed {
    .button-modal-ok {
      background-color: #3be400;
      margin: 0 auto 15px auto;
      width: 103px;
      display: block;
      text-align: center;
      cursor: pointer;
      border: 0;
      color: #fff;
      border-radius: 3px;
      padding: 10px;
      font-size: 15px;
    }
  }

  #vue-upload-multiple-image {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 35px;

    .centered {
      top: 50%;
      position: absolute;
      display: block;
    }

    .image-list {
      border: 1px solid #D6D6D6 !important;
      width: 405px !important;
      height: 300px !important;
    }

    .preview-image {
      height: 80%;
      padding: 5px;
      text-align: center;
      border-radius: 15px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

      .image-container {
        border: none !important;

        .show-img {
          max-height: 220px;
          max-width: 390px;
          display: block;
          vertical-align: middle;
        }

        .position-relative .text-center {
          width: 100%;
        }
      }

    h1, h2 {
      font-weight: normal;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      display: inline-block;
      margin: 0 10px;
    }

    a {
      color: #42b983;
    }
  }

  .input-form {
    width: 500px;
    border: 1px solid #7ce7ff;
    border-radius: 3px;
    overflow: hidden;

    &--container {
      padding: $gutter;
    }

    &--wrapper {
      width: 100%;
      height: 50px;

      textarea {
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
        resize: none;

        &:focus {
          outline: none;
        }
      }
    }
  }
  $overlay: #000000;
  .images {
    border-top: 1px solid #7ce7ff;
    display: inline-flex;
    width: 100%;
    position: relative;
    color: white;
    overflow: hidden;

    #overlay {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: rgba($overlay, .85);
      width: 100%;
      height: 100%;
      position: absolute;
      top: auto;
      bottom: 0;
      opacity: 0;
      transform: translateY(100%);
      transition: transform 0.5s ease, opacity 0.5s ease;
    }

    .img-title {
      font-weight: 300;
      font-size: 20px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .img-title,
    .img-icon {
      margin: 0;
    }

    &:hover {
      img {
        transform: scale(2);
        transition: transform 0.5s;
      }
      #overlay {
        opacity: 1;
        transform: translateY(0px);
      }
    }

    img {
      max-width: 150px;
      max-height: 100px;
      vertical-align: top;
      padding: 5px;
    }
  }

  .files {
    border-top: 1px solid #7ce7ff;
    padding: 5px 10px;
    color: #0B7FC7;
    font-family: 'Noto Sans HK', sans-serif;
    font-size: 15px;
  }
  .control-group {
    border-top: 1px solid #7ce7ff;
    padding: 5px;
  }
</style>
