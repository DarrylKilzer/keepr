<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-xs-6">
        <h1 class="capitalize">Hello, {{user.name}}!</h1>
      </div>
      <div class="col-xs-6">
        <p class="logout pull-right">
          <button class="logout" @click="logout(user)">Logout</button>
        </p>
      </div>
    </div>
    <h2>Your Vaults</h2>
    <div class="row">
      <div v-for="vault in vaults">
        <div class="col-xs-6 col-sm-2">
          <router-link :to="'/vaults/'+vault._id">
            <button @click="activeVault(vault._id)" class="btn vault">{{vault.title}}</button>
          </router-link>
          <button @click="removeVault(vault)" class="btn-small">Remove</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Create a new vault</h3>
        <form @submit.prevent="createVault">
          <div class="form-group">
            <input type="text" class="form-control-small input-lg" v-model="title" placeholder="Vault Name" required>
          </div>
          <div class="form-group">
            <textarea rows="4" cols="50" class="form-control-small input-lg" v-model="description" placeholder="Description"></textarea>
          </div>
          <button class="btn btn vault" type="submit">Add Vault</button>
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
    },
    removeVault(vault){
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

<style scoped>
.capitalize {
  text-transform: capitalize;
  color: #fe0096;
}

h1 {
  font-family: helvetica;
  font-size: 30px;
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
  font-size: 25px;
  color: #000;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fe0096;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 100%;
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