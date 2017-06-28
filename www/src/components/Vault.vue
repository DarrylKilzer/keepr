<template>
  <div class="vault">
    <div class="row">
      <div class="col-xs-6">
      </div>
      <div class="col-xs-6">
        <p class="logout pull-right">
          <router-link :to="'/dashboard'">
            <button class="logout">Dashboard</button>
          </router-link>
          <button class="logout" @click="logout(user)">Logout</button>
        </p>
      </div>
    </div>
    <h1>{{vault.title}}</h1>
    <h2 class="header">Keeps</h2>
    <div class="row">
      <div v-for="keep in keeps">
        <div class="col-xs-6 col-sm-2">
          {{keep.title}} {{keep.description}}
          <img style="width: 200px" :src="keep.imgUrl">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Create a new keep</h3>
        <form @submit.prevent="createKeep">
          <div class="form-group">
            <input type="text" class="form-control-small input-lg" v-model="title" placeholder="Keep Name" required>
          </div>
          <div class="form-group">
            <textarea rows="4" cols="50" class="form-control-small input-lg" v-model="body" placeholder="Body"></textarea>
          </div>
          <button class="btn vault" type="submit">Add Keep</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Keeps from './Keeps'
export default {
  name: 'vault',
  data() {
    return {
      title: '',
      imageURL: 'sadas',
      body: '',
      tags: '',
      articleURL: 'asda',
      creatorId: this.$store.state.user._id,
      private: false,
      activeVault: this.$store.state.activeVault
    }
  },
  mounted() {
    this.$store.dispatch('getKeepsByVaultId', this.activeVault._id)
  },
  computed: {
    keeps() {
      return this.$store.state.keeps
    },
    vault() {
      return this.$store.state.activeVault
    }
  },
  methods: {
    createKeep() {
      this.$store.dispatch('createKeep', { title: this.title, imageURL: this.imageURL, body: this.body, tags: this.tags, articleURL: this.articleURL, creatorId: this.creatorId, private: this.private })
    },
    logout() {
      this.$store.dispatch('logout', this.user)
    }
  },
  components: {
    Keeps
  }
}
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
  color: #fe0096;
}

h1 {
  font-family: helvetica;
  font-size: 30px;
  color: #fe0096;
}

h2 {
  font-family: helvetica;
  font-size: 20px;
  color: #fe0096;
}

h3 {
  font-family: helvetica;
  font-size: 18px;
  color: #fe0096;
}

a {
  color: #fe0096;
  font-size: 14px;
  font-weight: bold;
}

p.logout {
  margin-top: 25px;
  color: #fe0096;
}

button.vault {
  font-size: 18px;
  color: #000;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fe0096;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 10%;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

button.vault:hover {
  background-color: #9a9a9a;
  color: #fff;
}

button.logout {
  font-size: 16px;
  color: black;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fe0096;
  border-radius: 5px;
  border: 0px;
  padding: 7px;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

button.logout:hover {
  background-color: #9a9a9a;
  color: #fff;
}

hr {
  border-top: 3px double #8c8b8b;
}
</style>