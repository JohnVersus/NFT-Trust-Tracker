if (document.getElementById("NFTSearch") != null) {
  document.getElementById("NFTSearch").onclick = () => {
    if (sol.checked) {
      console.log("1");
      searchinputdataonsol();
    } else if (eth.checked) {
      if (searchinput.value.startsWith("0x")) {
        chain = "eth";
        marketChain = "ethereum";
        searchinputdataonevm();
      } else {
        chain = "eth";
        marketChain = "ethereum";
        searchinputwordonevm();
      }
    } else if (poly.checked) {
      if (searchinput.value.startsWith("0x")) {
        chain = "matic";
        marketChain = "matic";
        searchinputdataonevm();
      } else {
        chain = "matic";
        marketChain = "matic";
        searchinputwordonevm();
      }
    }
  };
}

let checkimageUrl = (url) => {
  if (
    url.includes("ipfs") ||
    url.includes("arweave") ||
    url.includes("storj") ||
    url.includes("sia")
  ) {
    return "A";
  }
  if (url.includes("ipns")) {
    return "B";
  }
};

let validateDstor = (UrlScore) => {
  if (UrlScore == "A" || UrlScore == "B") {
    return "";
  } else {
    return "Hide";
  }
};
let validateNoEdits = (UrlScore) => {
  if (UrlScore == "A") {
    return "";
  } else {
    return "Hide";
  }
};
let validateEdits = (UrlScore) => {
  if (UrlScore == null || UrlScore == "B") {
    return "";
  } else {
    return "Hide";
  }
};
let validateCstor = (UrlScore) => {
  if (UrlScore == null) {
    return "";
  } else {
    return "Hide";
  }
};

let fixURL = (url) => {
  if (url.startsWith("ipfs://ipfs/")) {
    return "https://ipfs.io/ipfs/" + url.split("ipfs://ipfs/").slice(-1);
  } else if (url.startsWith("ipfs")) {
    return "https://ipfs.io/ipfs/" + url.split("ipfs://").slice(-1);
  } else {
    return url + "?format=json";
  }
};
