let chain = "";
let marketChain = "";

let searchinputdataonevm = async () => {
  document.getElementById("data").innerHTML = null;
  console.log("searching evm");
  const options = {
    chain: chain,
    address: searchinput.value,
  };
  const nftBalance = await Moralis.Web3API.account.getNFTs(options);
  console.log(nftBalance);
  if (nftBalance.result.length > 0) {
    console.log("looking for metadata");
    maxlength = "";
    if (nftBalance.result.length > 20) {
      maxlength = 20;
    } else {
      maxlength = nftBalance.result.length;
    }

    for (let i = 0; i < maxlength; i++) {
      // let nfthash = nftBalance[i].mint;
      // console.log(nfthash);
      try {
        //   const options = {
        //     network: "mainnet",
        //     address: nfthash,
        //   };
        // const metadata = await Moralis.Web3API.nft.getNFTMetadata(options);
        let uridata = await fetch(nftBalance.result[i].token_uri)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            let nftContract = nftBalance.result[i].token_address;
            let nftid = nftBalance.result[i].token_id;
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
          .catch((ex) => {
            // Do something for an error here
          });
      } catch (ex) {
        // execution continues here when an error was thrown. You can also inspect the `ex`ception object
      }
    }
  }
};

let addOutputImg = (creator, img, UrlScore, nfthash) => {
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
                  href="https://opensea.io/assets/${marketChain}/${nfthash}"
                  target="_blank"
                  ><i
                    data-toggle="tooltip"
                    class="fa fa-external-link"
                    style="color: rgb(121, 142, 166); font-weight: bold"
                    title="Buy on Opensea.io"
                  ></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
};
