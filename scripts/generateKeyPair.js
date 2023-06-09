const crypto = require("crypto");
const { writeFileSync } = require("fs");

function generate(filename) {
  const keypairs = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  writeFileSync(filename, keypairs.privateKey);
}

generate("access_token_secret_prod.pem");
generate("refresh_token_secret_prod.pem");
generate("access_token_secret_dev.pem");
generate("refresh_token_secret_dev.pem");
