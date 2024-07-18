const TronWeb = require("tronweb");

const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });

async function create() {
  const newAccount = tronWeb.address.fromPrivateKey(
    "CE5981FA227FD18E6F87F580378DE4E2AD260E86CF71192E266D64DAD6AABB1B"
  );
  console.log(newAccount);
}

create();
