function CheckError(err) {
    if (err != undefined) {
        throw(err)
    }
}

var [sealed, err] = Vault.SealStatus()
CheckError(err)
log.Info("Sealed: ", sealed)

if (sealed) {
    log.Info("Unsealing...")
    var err = Vault.Unseal(VAULT_UNSEAL_KEY)
    CheckError(err)

    var [sealed, err] = Vault.SealStatus()
    CheckError(err)
    log.Info("Sealed: ", sealed)
}

var err = Vault.Set("secret", "/prod/db", {"password": "test"})
CheckError(err)

var [res, err] = Vault.Get("secret", "/prod/db")
CheckError(err)
log.Info(res)

var res = Vault.MustGetKey("secret", "/prod/db", "password")
log.Info(res)

// var err = Vault.Seal()
// CheckError(err)
