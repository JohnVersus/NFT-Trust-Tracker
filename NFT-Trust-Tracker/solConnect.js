//Server Details
const serverUrl = "https://0g4wexcx5qtg.usemoralis.com:2053/server";
const appId = "63I9G4iDTSyWMQg3Xzh4ujTjRO8mkLEBa6CRx2xw";
Moralis.start({ serverUrl, appId });

logincheck = async () => {
  if (Moralis.User.current() != null) {
    if (document.getElementById("sollogin") != null) {
      document.getElementById("sollogin").classList.add("Hide");
      document.getElementById("logout").classList.remove("Hide");
      // checknetwork();
      useraddress.innerText = Moralis.User.current().attributes.solAccounts[0];
      useraddress.title = "Connected";
    }
  } else if (Moralis.User.current() == null) {
    if (document.getElementById("sollogin") != null) {
      document.getElementById("sollogin").classList.remove("Hide");
      document.getElementById("logout").classList.add("Hide");
      useraddress.innerText = "Connect Wallet👉";
      useraddress.title = "No Active Wallet";
    }
  }
};

logincheck();

window.ethereum.on("accountsChanged", (account) => {
  location.reload();
});

Phantomlogin = async () => {
  try {
    const user = await Moralis.authenticate({ type: "sol" });
    logincheck();
  } catch (error) {
    const code = error.code;
    const message = error.message;
    logincheck();
  }
};

logout = async () => {
  await Moralis.User.logOut();
  logincheck();
};

if (document.getElementById("sollogin") != null) {
  document.getElementById("sollogin").onclick = Phantomlogin;
}

if (document.getElementById("logout") != null) {
  document.getElementById("logout").onclick = logout;
}
