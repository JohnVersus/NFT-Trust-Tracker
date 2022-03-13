let searchinputwordonevm = async () => {
  document.getElementById("data").innerHTML = null;
  console.log("searching evm");
  const options = { q: searchinput.value, chain: chain, filter: "name" };
  const NFTs = await Moralis.Web3API.token.searchNFTs(options);
  console.log(NFTs);

  if (NFTs.result.length > 0) {
    console.log("looking for metadata");
    maxlength = "";
    if (NFTs.result.length > 20) {
      maxlength = 20;
    } else {
      maxlength = NFTs.result.length;
    }
    for (let i = 0; i < maxlength; i++) {
      // let nfthash = NFTs[i].mint;
      // console.log(nfthash);
      try {
        //   const options = {
        //     network: "mainnet",
        //     address: nfthash,
        //   };
        // const metadata = await Moralis.Web3API.nft.getNFTMetadata(options);
        let uridata = await fetch(NFTs.result[i].token_uri)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            let nftContract = NFTs.result[i].minter_address;
            let nftid = NFTs.result[i].token_id;
            let nfthash = nftContract + "/" + nftid;
            let imgpath = data.image;
            imgpath = fixURL(imgpath);
            console.log("loading");
            let creator = nftContract;
            let UrlScore = checkimageUrl(imgpath);
            console.log(creator, imgpath, UrlScore, nfthash);
            addOutputImg(creator, imgpath, UrlScore, nfthash);
            console.log(nfthash);
          })
          .catch((err) => {
            // Do something for an error here
          });
      } catch (ex) {
        // execution continues here when an error was thrown. You can also inspect the `ex`ception object
      }
    }
  }
};
