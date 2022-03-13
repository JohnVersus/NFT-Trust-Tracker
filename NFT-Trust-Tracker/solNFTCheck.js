let searchinputdataonsol = async () => {
  document.getElementById("data").innerHTML = null;
  console.log("searching");
  const options = {
    network: "mainnet",
    address: searchinput.value,
  };
  const nftBalance = await Moralis.SolanaAPI.account.getNFTs(options);
  console.log(nftBalance);

  if (nftBalance.length > 0) {
    console.log("looking for metadata");
    maxlength = "";
    if (nftBalance.length > 20) {
      maxlength = 20;
    } else {
      maxlength = nftBalance.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let nfthash = nftBalance[i].mint;
      console.log(nfthash);
      try {
        const options = {
          network: "mainnet",
          address: nfthash,
        };
        const metadata = await Moralis.SolanaAPI.nft.getNFTMetadata(options);
        let uridata = await fetch(metadata.metaplex.metadataUri)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            let imgpath = data.image;
            imgpath = fixURL(imgpath);
            console.log("loading");
            let creator = data.properties.creators[0].address;
            let UrlScore = checkimageUrl(imgpath);
            console.log(creator, imgpath, UrlScore, nfthash);
            addsolOutputImg(creator, imgpath, UrlScore, nfthash);
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

// let checkimageUrl = (url) => {
//   if (
//     url.includes("ipfs") ||
//     url.includes("arweave") ||
//     url.includes("storj") ||
//     url.includes("sia")
//   ) {
//     return "A";
//   }
//   if (url.includes("ipns")) {
//     return "B";
//   }
// };

let addsolOutputImg = (creator, img, UrlScore, nfthash) => {
  document.getElementById("data").innerHTML += `
        <div class="col-sm-4 float-none">
        <div class="card shadow mb-4" style="width: 100%; height: 100%">
          <div
            class="card-header py-3"
            style="
              padding: 0.5em;
              padding-top: 0.5em;
              padding-bottom: 0.5em;
            "
          >
            <div>
              <small class="form-text text-nowrap text-truncate text-muted"
                >Creator:</small
              ><small
                class="form-text text-nowrap text-truncate text-muted"
                id="ownerAdd"
                >${creator}</small
              >
            </div>
          </div>
          <div class="card-body" style="padding: 0.5em">
            <img
              class="img-thumbnail"
              src="${img}"
              width="auto"
              height="auto"
            />
          </div>
          <div
            class="card-header py-3"
            style="height: auto; color: rgb(89, 237, 37)"
          >
            <div class="row">
              <div class="col-11 col-sm-9 col-lg-10">
                <div style="font-size: 1em; line-height: 1em">
                  <small class="form-text text-nowrap text-muted"
                    >Metadata</small
                  ><i
                    data-toggle="tooltip"
                    data-placement="bottom"
                    class="fa fa-circle ${validateDstor(UrlScore)}"
                    id="one"
                    title="Decentral"
                    style="color: rgb(41, 237, 37)"
                  ></i
                  ><i
                    data-toggle="tooltip"
                    data-placement="bottom"
                    class="fa fa-circle ${validateNoEdits(UrlScore)}"
                    id="two"
                    title="Non-Editable"
                    style="color: rgb(89, 237, 37); padding: 0.1em"
                  ></i
                  ><i
                    data-toggle="tooltip"
                    data-placement="bottom"
                    class="fa fa-circle ${validateEdits(UrlScore)}"
                    id="three"
                    title="Editable"
                    style="padding: 0.1em; color: rgb(237, 229, 37)"
                  ></i>
                  <i
                    data-toggle="tooltip"
                    data-placement="bottom"
                    class="fa fa-circle ${validateCstor(UrlScore)}"
                    id="three"
                    title="Centralized"
                    style="padding: 0.1em; color: rgb(237, 37, 73)"
                  ></i>
                </div>
              </div>
              <div
                class="col-1 col-sm-2 d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center"
              >
                <a
                  href="https://solanart.io/nft/${nfthash}"
                  target="_blank"
                  ><i
                    data-toggle="tooltip"
                    class="fa fa-external-link"
                    style="color: rgb(121, 142, 166); font-weight: bold"
                    title="Buy On Solart.io"
                  ></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
};
