<template>
  <div class="keeps">
    <h2 class="header">Keeps</h2>
    <div class="row">
      <div v-for="keep in keeps">
        <div class="col-xs-6 col-sm-2">
          <router-link :to="'/keeps/'+keep._id"><!--not needed-->
            {{keep.title}}
            {{keep.description}}
          </router-link>
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
export default {
  name: 'dashboard',
  data() {
    return {
      title: '',
      description: '',
      creatorId: this.$store.state.user._id
    }
  },
  created() {
    this.$store.dispatch('getVaults')
  },
  computed: {
    vaults() {
      return this.$store.state.vaults
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
    }
  }
}
</script>