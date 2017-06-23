let Vaults = require('../models/vault')
let Keeps = require('../models/keep')

export default {
  getKeepsByVaultId: {
    path: '/vaults/:vaultId/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return vault and associated keeps'
      Vaults.findById(req.params.vaultId)
        .then(vault => {
          Lists.find({ vaultId: req.params.vaultId })
            .then(keeps => {
              vault.keeps = keeps
              res.send(handleResponse(action, vault.keeps))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getKeepsByUserId: {
    path: '/userkeeps/',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return user associated keeps'
      Keeps.find({ userId: req.session.uid })
        .then(keeps => {
          keeps = keeps
          res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getKeeps: {
    path: '/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find keeps'
      Keeps.find()
        .then(keeps => {
          var publicKeeps = []
          for (var i = 0; i < keeps.length; i++) {
            var keep = keeps[i]
            if (keep.private == false) {
              publicKeeps.push(keep)
            }
          }
          publicKeeps.push({ name: "keep" })
          res.send(handleResponse(action, publicKeeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}
        // {creatorId: req.session.uid}