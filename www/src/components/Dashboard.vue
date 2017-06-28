<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-xs-6">
        <p class="logout pull-left">
          <button type="button" class="toggles" @click="toggleVaults">Vaults</button>
          <button class="toggles" @click="toggleKeeps">Your Keeps</button>
          <button class="toggles" @click="toggleAllKeeps">All Keeps</button>
        </p>
        <h1 class="capitalize">Hello, {{user.name}}!</h1>
      </div>
      <div class="col-xs-6">
        <p class="logout pull-right">
          <button class="logout" @click="logout(user)">Logout</button>
        </p>
      </div>
      <vaults v-if="this.showVaults"></vaults>
      <div v-if="this.showAllKeeps">
        <h2 class="header">Keeps</h2>
        <div class="row">
          <div v-for="keep in keeps">
            <div class="col-xs-6 col-sm-2">
              <div class="thumbnail">
                <img style="width: 200px" :src="keep.imgUrl">
                <div class="caption">
                  <h3>
                    <router-link :to="'/keeps/'+keep._id">{{keep.title}}</router-link>
                  </h3>
                  <p>{{keep.body}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vaults from './Vaults'
import Keeps from './Keeps'
export default {
  name: 'dashboard',
  data() {
    return {
      showVaults: true,
      showKeeps: false,
      showAllKeeps: false,
      title: '',
      description: '',
      creatorId: this.$store.state.user._id
    }
  },
  created() {
    this.$store.dispatch('getVaults')
    this.$store.dispatch('getKeeps')
  },
  computed: {
    vaults() {
      return this.$store.state.vaults
    },
    keeps() {
      return this.$store.state.keeps
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    createVault() {
      this.$store.dispatch('createVault', { title: this.title, description: this.description, creatorId: this.creatorId })
      this.title = ''
      this.description = ''
    },
    removeVault(vault) {
      this.$store.dispatch('removeVault', vault)
    },
    activeVault(vaultId) {
      this.$store.dispatch('getActiveVault', vaultId)
    },
    logout() {
      this.$store.dispatch('logout', this.user)
    },
    toggleVaults() {
      this.showVaults = true
      this.showAllKeeps = false
      this.showKeeps = false
    },
    toggleKeeps() {
      this.showVaults = false
      this.showAllKeeps = false
      this.showKeeps = true
    },
    toggleAllKeeps() {
      this.showVaults = false
      this.showAllKeeps = true
      this.showKeeps = false
    }
  },
  components: {
    Vaults,
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
}
</style>