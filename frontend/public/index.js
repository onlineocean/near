import * as buffer from 'buffer';
window.Buffer = buffer.Buffer;
import * as nearAPI from "near-api-js";

const { connect, keyStores } = nearAPI;




const keyStore = new keyStores.BrowserLocalStorageKeyStore();
const nearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    contractName: 'stoma.testnet',
    walletUrl: 'https://wallet.testnet.near.org',
    keyStore,
};

const near = await connect(nearConfig);



import index from "./includes/index.js";
import create from "./includes/create.js";
import box from "./includes/box.js";
import box_multiply from "./includes/box_multiply.js";
import launchpad from "./includes/launchpad.js";
import info from "./includes/info.js";
import admin from "./includes/admin.js";
import card from "./includes/card.js";
import market from "./includes/market.js";
// window.ic.plug.disconnect();
// StoicIdentity.disconnect();
let preloader = document.querySelector('.preloader');

const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');


function log(data) {console.log(data)};


function preloaderOn() {
    preloader.classList.add('active');
};

function preloaderOff() {
    preloader.classList.remove('active');
}

let principal;
let base64Arr;
let freshNFTS;

let walletConnection = null;
let contract = null;


let connectWalletBtn = document.querySelector('.connectWallet');

async function init() {

  
  walletConnection = new nearAPI.WalletConnection(near);

  if (walletConnection.isSignedIn()) {
    
    connectWalletBtn.classList.add('sessionActive');
    connectWalletBtn.innerHTML = `<span> ${walletConnection.getAccountId().substr(0, 11)} ... </span>`;
    let account = await walletConnection.account();
    log(account)
    let balance = await account.getAccountBalance();
    log(balance)

    let lave = document.querySelector('.item.icp span');
    lave.innerText = String(Number(balance.available / 10 ** 24)).substr(0, 6); 
    log(balance.available / 10 ** 24)

    // initial contract 
    contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
        viewMethods: ['nft_token', 'get_all_tokens', 'get_my_tokens', 'get_launchpad_tokens'],
        changeMethods: ['new', 'nft_mint', 'nft_transfer', 'nft_update_price', 'clear_all_storage', 'nft_purchase', 'nft_purchase_batch'],
        sender: walletConnection.getAccountId(),
    });

    log(contract)

    // await contract.new();

  } else {
    contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
        viewMethods: ['nft_token', 'get_all_tokens', 'get_my_tokens', 'get_launchpad_tokens'],
        changeMethods: ['new', 'nft_mint', 'nft_transfer', 'nft_update_price', 'clear_all_storage', 'nft_purchase', 'nft_purchase_batch'],
        sender: walletConnection.getAccountId(),
    });

    log(contract)
  }

  run();
};

init();


// let mintee = document.querySelector(".mint");
// let showee = document.querySelector('.show');


// mintee.addEventListener('click', function() {
//     mintNFT ()
// });


// showee.addEventListener('click', function() {
//     callNFT ()
// });





// async function mintNFT () {

//     const deposit = nearAPI.utils.format.parseNearAmount('0.4'); // 0.4 NEAR
//     const gas = '300000000000000'; // 300 Tgas


//     await contract.nft_purchase(
//         {
//             token_id: 'my_token_id',
//             receiver_id: 'my_receiver_id'
//         },
//         gas, // максимальное количество газа для транзакции
//         deposit // сумма депозита в yoctoNEAR
//     );
    
//     // Вызов функции nft_purchase_batch
//     await contract.nft_purchase_batch(
//         {
//             purchases: [
//                 ['my_token_id_1', 'my_receiver_id_1'],
//                 ['my_token_id_2', 'my_receiver_id_2'],
//                 ['my_token_id_3', 'my_receiver_id_3']
//             ]
//         },
//         gas, // максимальное количество газа для транзакции
//         deposit // общая сумма депозита в yoctoNEAR для всех покупок
//     );


//     await contract.nft_mint({
//       token_id: 'penselvania',
//       metadata: {
//         title: 'My Token',
//         description: 'This is my first NFT!',
//         media: 'https://example.com/my_token.png',
//         media_hash: '',
//         copies: '1',
//         collection_name: "My Collection",
//         collection_id: "my-collection",
//         status: "market"
//       },
//     }, gas, deposit);


//     await contract.nft_transfer(
//         {
//             receiver_id: receiverId,
//             token_id,
//         },
//         gas
//     );

// }


async function callNFT () {
    // Call the `nft_token` method on the contract
    // const token = await contract.nft_token({ token_id: 'pepe' });
    // console.log(token);

    const allTokens = await contract.get_all_tokens();
    console.log(allTokens);

    // const tokens = await contract.get_tokens_by_owner({ owner_id: walletConnection.getAccountId() });
    // console.log(tokens)
}



// transfer admin 
// await contract.nft_transfer({ receiver_id: receiverId, token_id: tokenId });





















function run() {
    preloaderOff();
    // log(principal.toString())
// close modals
document.addEventListener('click', async function(e) {
    if (e.target.classList.contains('getAllNfts')) {
        const tokens = await contract.get_all_tokens();
        console.log(tokens);
    }

    if (e.target.classList.contains('getMyNfts')) {
        const myTokens = await contract.get_my_tokens({ account_id: walletConnection.getAccountId() });
        console.log(myTokens);
    }

    if (e.target.classList.contains('removeContract')) {
        let peps = await contract.clear_all_storage();
        log(peps)
    }

    if (e.target.classList.contains('getLauncpads')) {
        const launchpadTokens = await contract.get_launchpad_tokens();
        log(launchpadTokens)
    }

    // close wallets modal
    walletsModal.classList.remove('active');
});





async function connectWallet() {
    const near = await connect(nearConfig);
    walletConnection = new nearAPI.WalletConnection(near);
    if (!walletConnection.isSignedIn()) {
        walletConnection.requestSignIn(nearConfig.contractName);
    } else {
      console.log(walletConnection.getAccountId())
    }
    return walletConnection;
}
// connect wallet modal

let walletsModal = document.querySelector('.walletsModal');
let logoutModal = document.querySelector('.logoutModal');
let logoutBtn = document.querySelector('.logoutModal .item.logout');
if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', function(e) {

      connectWallet()
      

        if (!this.classList.contains('sessionActive')) {
            e.preventDefault();
            e.stopPropagation();
            // walletsModal.classList.add('active');
        } else {
            e.preventDefault();
            e.stopPropagation();
            logoutModal.classList.add('active');
        }
    });
}



let appp = document.querySelector('.app');
appp.addEventListener('click', function() {
    logoutModal.classList.remove('active');
    walletsModal.classList.remove('active');
});


if (logoutBtn) {
    logoutBtn.addEventListener('click', async function() {
        walletConnection = await connectWallet();
        walletConnection.signOut();
    
        location.reload();
    });
}


if (walletsModal) {
    walletsModal.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}


//wallets buttons 
let walletsBtns = document.querySelectorAll('.walletsModal .item');
walletsBtns.forEach((el) => {
    // el.addEventListener('click', async function() {
    //     if (this.classList.contains('stoic')) {
    //         // STOIC

    //         await StoicIdentity.connect();
    //         let identity = await StoicIdentity.load();
    //         log(identity)
    //         if (identity) {
    //             let accounts = JSON.parse(await identity.accounts());
    //             console.log(accounts[0])
    //             location.reload();
    //         }
    //     }

    //     // if (this.classList.contains('plug')) {
    //     //     // PLUG


    //     //     if (!window?.ic?.plug) {
    //     //         document.location.href = "https://www.plugwallet.ooo/";
    //     //         return;
    //     //     }
    //     //     var connected = await window.ic.plug.isConnected();
    //     //     console.log("Is connected", connected);
    //     //     if (!connected) 
    //     //         connected = await window.ic.plug.requestConnect({ whitelist: ['3r36y-oqaaa-aaaap-qar6a-cai']});
    //     //     if (connected && !window.ic.plug.agent) {
    //     //         await window.ic.plug.createAgent({ whitelist: ['3r36y-oqaaa-aaaap-qar6a-cai'] })
    //     //     }
    //     //     if(connected && window.ic.plug.agent) {
    //     //         // const requestBalanceResponse = await window.ic?.plug?.requestBalance();
    //     //         // const balance = requestBalanceResponse[0]?.value;
    //     //         // const { accountId, principalId } = window.ic.plug.sessionManager.sessionData;
    //     //         // log(connected)
    //     //         // log(window.ic.plug.agent)
    //     //         // identity = window.ic.plug.agent;
    //     //         // 

    //     //         const principal = await window.ic.plug.agent.getPrincipal();
    //     //         actor = await window.ic.plug.createActor({
    //     //             canisterId: '3r36y-oqaaa-aaaap-qar6a-cai',
    //     //             interfaceFactory: idlFactory,
    //     //         });
    //     //         location.reload();
                
    //     //         // log(principal.toText());
    //     //         log(actor)

    //     //         // log(await actor.whoami().toString())
    //     //         // state.wallet.id = principalId;
    //     //         // state.wallet.connected = true
    //     //         // localStorage.setItem('wallet', state.wallet.id)
    //     //         // localStorage.setItem('walletConnected', state.wallet.connected)
    //     //         // router.push({ name: 'Register' })
    //     //     }
    //     // }
    // });
});


viewNft();

async function viewNft() {
    if (walletConnection.getAccountId()) {
        let fetchResult;
        let launchResult;
        // получаем сингл нфт с маркета проверяем какие наши и выводим в кошелек
        // await fetch('https://icp-control.com/getAllCanisterInfo', {
        //     method: "POST"
        // }).then(function(response) {
        //     return response.json();
        // }).then(function(data) {
        //     console.log(data.status);
        //     fetchResult = data.status;
        // });
    
        // получаем вообще все нфт с лаунча и проверяем
        // await fetch('https://icp-control.com/getFullLaunchNfts', {
        //     method: "POST"
        // }).then(function(response) {
        //     return response.json();
        // }).then(function(data) {
        //     console.log(data.status);
        //     launchResult = data.status;
        // });
    
        const myTokens = await contract.get_my_tokens({ account_id: walletConnection.getAccountId() });
        console.log(myTokens);
    
        let walletNftWrap = document.querySelector('.logoutModal .nfts_items');
        walletNftWrap.innerHTML = "";
        // let canArrIds = [];
        myTokens.forEach((el) => {
            let metadata = el[1].metadata;
            if (!metadata.media.startsWith('https')) {
                metadata.media = 'https://icp-control.com/' + metadata.media;
            }
            // if (el.owner == principal.toString()) {
            //     // canArrIds.push(el.canistersArrayId);
                let item = `
                    <a href="/card" descr="${metadata.description}" price="${el.price}" owner="${el.owner}" name="${metadata.title}" src="${metadata.media}" symbol="" canName="-" canArrNum="">
                        <div class="nft_item">
                            <div class="img">
                                <img src="${metadata.media}" alt="">
                            </div>
                            <span>${metadata.title.toLowerCase().substr(0,7)}...</span>
                        </div>
                    </a>
                    
                `;
                walletNftWrap.innerHTML += item;
    
        });
    }


    // launchResult.forEach((el) => {
    //     if (el.owner == principal.toString()) {
    //         let item = `
    //             <a href="/card" descr="" price="" owner="${el.owner}" name="${el.collectname} - ${el.orderer}" src="https://icp-control.com/${el.src}" symbol="" canName="-" canArrNum="${el.canistersArrayId}">
    //                 <div class="nft_item">
    //                     <div class="img">
    //                         <img src="https://icp-control.com/${el.src}" alt="">
    //                     </div>
    //                     <span>${el.collectname} - ${el.orderer}</span>
    //                 </div>
    //             </a>
                
    //         `;
    //         walletNftWrap.innerHTML += item;
    //     }
    // });

    let linksToCard = document.querySelectorAll('.logoutModal .nfts_items a');
    linksToCard.forEach((el) => {
        el.addEventListener('click', function() {
            
            let obj = {
                description : this.getAttribute('descr'),
                price : this.getAttribute('price'),
                owner : this.getAttribute('owner'),
                name : this.getAttribute('name'),
                src : this.getAttribute('src'),
                symbol : this.getAttribute('symbol'),
                canName : this.getAttribute('canName'),
                canArrNum : this.getAttribute('canArrNum')
            };

            localStorage.setItem('cardItem', JSON.stringify(obj));

        
        });
    });

};





// setInterval(async function() {
//     identity = await StoicIdentity.load();
//     log(identity)
// }, 3500);

// setTimeout(() => {
//     async function pe() {
//         let id = await actor.whoami();
//         log(id.toString());
//         log(Number(await actor.requestsSize()));
//         log('test')
//     };
//     pe();
// }, 8000);




// DOWNLOAD GET-PAGE 
let app = document.querySelector('.app');

let preloadBlock = document.querySelector('.preloadBlock');

function getPage() {
    let route = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    if (route !== "") {
        switch(true) {
            case route == 'create'          : load(create);createEnterPage();            ;break;
            case route == 'create_single'   : load(box);createNFTPageSingle();defaultFormCode();                  ;break;
            case route == 'create_multiply' : load(box_multiply);createNFTPageMultiply();defaultFormCode();         ;break;
            case route == 'launchpad'       : load(launchpad);createLaunchpadPage();     ;break;
            case route == 'info'            : load(info); createInfoPage();              ;break;
            case route == 'admin'           : load(admin);adminPage()                    ;break;
            case route == 'card'            : load(card); createCardPage();              ;break;
            case route == 'market'          : load(market); createMarketPage(); defaultFromMarket();         ;break;
        }
    } else {
        load(index);
        createIndexPage();
    }
};
getPage();



function load(page) {
    app.innerHTML = page.item;
    preloadBlock.remove();
};



// FOLLOWING LINKS
let allLinks = document.querySelectorAll('a');
if (allLinks) {
    allLinks.forEach((el) => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.getAttribute('href') !== "") {
                let href = this.getAttribute('href');
                updateURL(href);
                getPage();
            }
        });
    });
}





function updateURL(route) {
    if (history.pushState) {
        var baseUrl = window.location.protocol + "//" + window.location.host;
        var newUrl = baseUrl + route;
        history.pushState(null, null, newUrl);
    }
    else {
        console.warn('History API not work');
    }
}


async function createRequestSingleNftMarket() {

    
    // let princ = principal.toString();
    let owner;
    if (!walletConnection.isSignedIn()) {
        owner = 'Not authenticated';
    } else {
        owner = walletConnection.getAccountId();
    }

    let name = document.querySelector('.line.line-chek.line__name').value;
    let symbol = document.querySelector('.line.line-chek.line__symbol').value;
    let description = document.querySelector('.line.line-chek.line__description').value;
    let price = Number(document.querySelector('.line.line-chek.line__price').value);
    let way = slugify(name); 
   

    let img = document.querySelector('.input__turn').files[0];

    log('==============')

    // log(princ);
    log(name);
    log(symbol);
    log(description);
    log(price);
    log(way);
    log(img);

    let formData = new FormData();
    formData.append('principal', owner);
    formData.append('name', name);
    formData.append('symbol', symbol);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('way', way);
    formData.append('number', 0);
    formData.append('img', img);



    fetch('https://icp-control.com/setRequestSingleNftMarket', {
        method: "POST",
        body: formData,
    }).then(function(response) {
        return response.text();
    }).then(function(data) {
        console.log(data);
    });






    // log(count);
    // log(requestsSize);
    // log(base64Arr);

    // let collect = {
    //     principal: [princ],
    //     name : [name],
    //     symbol : [symbol],
    //     description: [description],
    //     price : [price],
    //     count : [Number(count)],
    //     way : [way],
    //     numer : [requestsSize]
    // };


}

async function createRequest() {
    let owner;
    if (!walletConnection.isSignedIn()) {
        owner = 'Not authenticated';
    } else {
        owner = walletConnection.getAccountId();
    }
    let name = document.querySelector('.line.line-chek.line__name').value;
    let symbol = document.querySelector('.line.line-chek.line__symbol').value;
    let description = document.querySelector('.line.line-chek.line__description').value;
    let price = Number(document.querySelector('.line.line-chek.line__price').value);
     
    let input = document.querySelector('.input__turn').files;

    log(name);
    log(symbol);
    log(description);
    log(price);
    log(input);

    let formData = new FormData();

    formData.append('owner', owner);
    formData.append('name', name);
    formData.append('symbol', symbol);
    formData.append('description', description);
    formData.append('price', price);
    for (var i = 0; i < input.length; i++ ) {
        formData.append("file_" + i, input[i]); 
    }
    

    fetch('https://icp-control.com/setRequestLaunchpad', {
        method: "POST",
        body: formData,
    }).then(function(response) {
        return response.text();
    }).then(function(data) {
        console.log(data);
    });
    // let collect = {
    //     principal: [princ],
    //     name : [name],
    //     symbol : [symbol],
    //     description: [description],
    //     price : [price],
    //     count : [Number(count)],
    //     way : [way],
    //     numer : [requestsSize]
    // };

    // let filesPromise = [];
    // base64Arr.forEach((el, ind) => {
    //     filesPromise.push(actor.setRequestFile(`${way}_${symbol}_${ind}`, el));
    // });

    // log(filesPromise)
    // let result = await actor.setRequest(requestsSize, collect);
    // log(result);
    // const result2 = await Promise.all(filesPromise);
    // log(result2);



};










async function createMarketPage() {


    let allLinks = document.querySelectorAll('a');
    if (allLinks) {
        allLinks.forEach((el) => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.getAttribute('href') !== "") {
                    let href = this.getAttribute('href');
                    updateURL(href);
                    getPage();
                }
            });
        });
    }

   
    const tokens = await contract.get_all_tokens();
    log(tokens)

    // open filter blockchain
    let dfinityDiv = document.querySelector('.market__slide-list.blockchain .market__list');
    let dfinityDivSecond = document.querySelector('.market__slide-list.blockchain .market__list-item');
    dfinityDiv.click();
    dfinityDivSecond.click();


    let wrap = document.querySelector('.market__catalog-flex');
    wrap.innerHTML = "";
    tokens.forEach((el, ind) => {
        if (el[1].metadata.status == "market") {
            let tokenId = el[0];
            let metadata = el[1].metadata;
            let price = el[1].price;
            let owner = el[1].owner_id;

            if (!metadata.media.startsWith('http')) {
                metadata.media = "https://icp-control.com/" + metadata.media
            }
    
            let marketItem = `
            <div class="market__catalog-list">
                <div class="market__catalog-item">
                    <a href="/card" data-id="${tokenId}" class="market__catalog-link">
                        <div class="market__catalog-photo">
                            <img src="${metadata.media}" alt="">
                        </div>
                        <div class="market__catalog-purple"><span style="margin-right: 5px">${String(Number(price) / 10 ** 24).substr(0, 5)}</span>  NEAR</div>
                        <div class="market__catalog-user">
                            
                            <div class="market__catalog-conect">
                                <span>${metadata.description}...</span>
                                <span>${metadata.title}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            `
            wrap.innerHTML += marketItem;
        }

    });

    //filter price inputs 
    let filterPriceBtn = document.querySelector('.indexPhoto__btn--market');
    let filterPriceInputOne = document.querySelector('.search__input.search__input--price.search__input--price-min');
    let filterPriceInputSecond = document.querySelector('.search__input.search__input--price.search__input--price-max');
    let allItems = document.querySelectorAll('.market__catalog-list');

  
    filterPriceBtn.addEventListener('click', function() { 

        if (filterPriceInputOne.value !== "" || filterPriceInputSecond !== "") {
            // фильтруем
            allItems.forEach((el) => {
                let price = Number(el.querySelector('.market__catalog-purple span').textContent);
                if (price > filterPriceInputOne.value && price < filterPriceInputSecond.value) {
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            });
        } else {
            // показываем все айтемы
            el.style.display = "block"
        };
    });

    let linksToCard = document.querySelectorAll('a.market__catalog-link');
    linksToCard.forEach((el) => {
        el.addEventListener('click', function() {
            
            let dataId = this.getAttribute('data-id');

            localStorage.setItem('dataId', JSON.stringify(dataId));
        });
    });
};









async function createLaunchpadPage() {
    let launchpadWrap = document.querySelector('.launchpad__inner');


    // let accessList = await actor.allAccess();
    // log('access');
    // log(accessList);
    


    
    // await fetch('https://icp-control.com/getAllCanisterLaunchpad', {
    //     method: "POST"
    // }).then(function(response) {
    //     return response.json();
    // }).then(async function(data) {
        // log(data);


        // let canNumbers = [];
        // data.status.forEach((el, ind) => {
        //     // canNumbers.push(actor.getCanisterPrincipal(ind + 1));
        // });

        // let res = await Promise.all(canNumbers);
        // log('======')
        // log(data.status)
        // log(res)
        
        // launchpadWrap.innerHTML = "";
        // res.forEach(async (el, ind) => {

        //     // log('CANNUM')
        //     // log(data.status[ind].cannum)
        //     let fd = new FormData();
        //     fd.append('cannum', data.status[ind].cannum)

        //     let nfts = await fetch('https://icp-control.com/getLaunchNfts', {
        //         method: "POST",
        //         body: fd
        //     }).then(function(response) {
        //         return response.json();
        //     }).then(async function(data) {
        //         return data.status;
        //     });
            
        //     log('NFTS')
        //     log(nfts)

        //     let available = [];
        //     nfts.forEach((y) => {
        //         if (y.sold == 0) {
        //             available.push(y);
        //         }
        //     })

        //     log('available');
        //     log(available.length)
        const launchpadTokensRes = await contract.get_launchpad_tokens();

        // let finishData = [];
        launchpadTokensRes.forEach((el, ind) => {
            el[2] = 0;
            el[1].forEach((y) => {
                console.log(y[0])
                if (y[0].metadata.status !== "launchpad") {
                    el[2] += 1;
                }
            });
            // // solded
            // el[2] = el[1].length - el[2];
        });

        let ltr = launchpadTokensRes.filter((el) => el[0] !== ":");


        log('launchpadTokens')
        log(ltr)


            // let solded = el[1].length - el[2];

            // let procent = nfts.length / 100 * solded;
            launchpadWrap.innerHTML = ""
        ltr.forEach((el) => {

            log('SOLDED')
            let solded = el[2];
            log(solded)

            let procent = (solded / el[1].length) * 100;  
            log('procent')
            log(procent)

            let procentClass;
            switch(true) {
                case procent == 100 : procentClass = "aaaaaaaaaa";break;
                case procent >= 90 && procent < 100 : procentClass = "aaaaaaaaa";break;
                case procent >= 80 && procent < 90 : procentClass = "aaaaaaaa";break;
                case procent >= 70 && procent < 80 : procentClass = "aaaaaaa"; break;
                case procent >= 60 && procent < 70 : procentClass = "aaaaaa"; break;
                case procent >= 50 && procent < 60 : procentClass = "aaaaa"; break;
                case procent >= 40 && procent < 50 : procentClass = "aaaa"; break;
                case procent >= 30 && procent < 40 : procentClass = "aaa"; break;
                case procent >= 20 && procent < 30 : procentClass = "aa"; break;
                case procent >= 10 && procent < 20 : procentClass = "a"; break;
            }

        
            log(el[2])

                let item = `
                    <div class="launchpad__item">

                        <div class="launchpad__item-photo">
                            <img src="https://icp-control.com/${el[1][0][0].metadata.media}" alt="">
                        </div>
                        <div class="launchpad__group">
                            <div class="launchpad__item-title">${el[1][0][0].metadata.collection_name}</div>
                            <div class="launchpad__item-text">
                                <p>${el[1][0][0].metadata.description}</p>
                            </div>
                            <div class="launchpad__item-line">
                                <div class="line__title">
                                    ${el[1].length - solded} NFT Left
                                </div>
                                <div class="line ${procentClass}"></div>
                                <div class="line__group">
                                    <div class="line__text">${el[2]} NFT</div>
                                    <div class="line__text">${el[1].length} NFT</div>
                                </div>
                            </div>
                            <a href="/info" class="launchpad__item-btn" data-key="${el[0]}">View</a>
                        </div>
                    </div>
                `;
                launchpadWrap.innerHTML += item;
            
            // let load = document.querySelector('.lds-ring');
            // load.remove();


        }); 



            
            


        // });
        
    // });
    // console.log(accessList)

    // accessList.forEach(async (x) => {
        
    //     // log(x[1].id[0])
    //     // log(x[1].canister[0])
    //     // log(x[1].count[0])

    //     let count = Number(x[1].count[0]);
    //     let canister = x[1].canister[0];

    //     // let name = await ;
    //     log('PRPRPRPR')
    //     // log(name)
    //     // let firstNFT = await ;

    //     let name_firstNft = await Promise.all([actor.name(Number(x[1].id[0])), actor.tokenURI(Number(x[1].id[0]), 2)]);
        

        
    //     let item = `
    //     <div class="launchpad__item">
    //         <div class="launchpad__item-photo">
    //             <img src="${name_firstNft[1][0]}" alt="">
    //         </div>
    //         <div class="launchpad__group">
    //             <div class="launchpad__item-title">${name_firstNft[0]}</div>
    //             <div class="launchpad__item-text">
    //                 <p>${canister}</p>
    //             </div>
    //             <div class="launchpad__item-line">
    //                 <div class="line__title">
    //                     ${count} NFT
    //                 </div>
    //                 <div class="line"></div>
    //                 <div class="line__group">
    //                     <div class="line__text">0 NFT</div>
    //                     <div class="line__text">${count} NFT</div>
    //                 </div>
    //             </div>
    //             <a href="/info" class="launchpad__item-btn" canisterId="${x[1].id[0]}" nftcount="${count}" canisterName="${canister}" collectName="${name_firstNft[0]}">View</a>
    //         </div>
    //     </div>
    //     `;

    //     launchpadWrap.innerHTML += item;
    
    document.addEventListener('click', function(event) {

        console.log(event.target)
    
        if (event.target.classList.contains('launchpad__item-btn')) {
            
            let dataKey = event.target.getAttribute('data-key');
    
            localStorage.setItem('dataKey', JSON.stringify(dataKey));
        }
    
        if (event.target.classList.contains('project__item')) {
            
            event.preventDefault()
            console.log('SASE')
            let dataKey = event.target.getAttribute('data-key');
    
            localStorage.setItem('dataKey', JSON.stringify(dataKey));
        }
    });
    
    // });

    // let allLaunchpadItemsBtns = document.querySelectorAll('.launchpad__item a');

    // log("=====")
    // log(allLaunchpadItemsBtns)
    // allLaunchpadItemsBtns.forEach((el) => {
    //     el.addEventListener('mouseenter', function() {
    //         let canid = this.getAttribute('canisterId');
    //         localStorage.setItem('canid', canid);
    //     });
    // });




};




async function getLaunchpadNftContainer(canister_number) {

    // let firstTokenURI = await 
 
};






async function createInfoPage() {
    let canObj = JSON.parse(localStorage.getItem('dataKey'));
    log(canObj);
    // getLaunchpadNftContainer(Number(canObj.canid));

    let pageImg = document.querySelector('.info__inner img');
    let pageTitle = document.querySelector('.info__title');
    let allNfts = document.querySelector('.line__text.all');
    let availableDiv = document.querySelector('span.available');
    let sellPrice = document.querySelector('.info__group-text span');

    const launchpadTokensRes = await contract.get_launchpad_tokens();

    log('++++++++++')
    log(launchpadTokensRes)

    launchpadTokensRes.forEach((el, ind) => {
        el[2] = 0;
        el[1].forEach((y) => {
            if (y[0].metadata.status !== "launchpad") {
                el[2] += 1;
            }
        });
        // // solded
        // el[2] = el[1].length - el[2];
    });

    let ltr = launchpadTokensRes.filter((el) => el[0] == canObj);


    log('launchpadToken')
    log(ltr)

    let available = ltr[0][1].length - ltr[0][2];

    pageTitle.innerText = `Welcome to the ${ltr[0][1][0][0].metadata.collection_name} sale`;
    allNfts.innerText = `${ltr[0][1].length} NFT`;
    availableDiv.innerText = `${available}`;
    log('PRICE ')
    // log(ltr[0][1][0][0].metadata.price)
    sellPrice.innerHTML = `${String(Number(ltr[0][1][0][0].price) / 10 ** 24).substr(0, 5)} NEAR`


    log('SOLDED')
    let solded = ltr[0][2];
    log(solded)

    let soldedDiv = document.querySelector('.info__group-text .red');
    let infoup = document.querySelector('.info__up');

    soldedDiv.innerHTML = solded;
    // infoup.innerHTML = solded + 'NFT';
    infoup.innerHTML = ""
    

    // let procent = nfts.length / 100 * solded;
    let procent = (solded / ltr[0][1].length) * 100; 

    log('procent')
    log(procent)
    let procentClass;
    switch(true) {
        case procent == 100 : procentClass = "aaaaaaaaaa";break;
        case procent >= 90 && procent < 100 : procentClass = "aaaaaaaaa";break;
        case procent >= 80 && procent < 90 : procentClass = "aaaaaaaa";break;
        case procent >= 70 && procent < 80 : procentClass = "aaaaaaa"; break;
        case procent >= 60 && procent < 70 : procentClass = "aaaaaa"; break;
        case procent >= 50 && procent < 60 : procentClass = "aaaaa"; break;
        case procent >= 40 && procent < 50 : procentClass = "aaaa"; break;
        case procent >= 30 && procent < 40 : procentClass = "aaa"; break;
        case procent >= 20 && procent < 30 : procentClass = "aa"; break;
        case procent >= 10 && procent < 20 : procentClass = "a"; break;
    }

    let infoline = document.querySelector('.info__line');
    infoline.classList.add(procentClass)


    pageImg.src = "https://icp-control.com/" + ltr[0][1][0][0].metadata.media;

    // buy btns
    let buy = document.querySelectorAll('.info__btn');


    buy.forEach((el) => {
        el.addEventListener('click', async function() {

            // log('______________________________________________')
            // log(walletConnection)

            if (!walletConnection.isSignedIn()) {
                alert('Not authenticated')
            } else {

                let dt = this.getAttribute('dt');
                if (ltr[0][1].length < dt) {
                    alert('you are trying to buy more than what is available')
                } else {
                    if (ltr[0][1].length < dt) {
                        alert('you are trying to buy more than what is available')
                    } else {
    
                        log(ltr[0][1])
                        // доступные нфт
                        let launchNfts = ltr[0][1].filter((y) => {
                            console.log(y[0])
                            return y[0].metadata.status == 'launchpad'
                        });
    
                        if (launchNfts.length < dt) {
                            alert('you are trying to buy more than what is available')
                        } else {
    
    
                            let payArr = [];
                            let price = Number(ltr[0][1][0][0].price) / 10 ** 24 * dt;
                            for(let i = 0; i < dt; i++) {
                                payArr.push([launchNfts[i][1], walletConnection.getAccountId(), "market"])
                            };
        
                            log("SEND ARRAY")
                            log(payArr)
                
                            const deposit = nearAPI.utils.format.parseNearAmount(String(price + 1));
                            const gas = '300000000000000'; 
                        
                            // Вызов функции nft_purchase_batch
                            await contract.nft_purchase_batch(
                                {
                                    purchases: payArr
                                },
                                gas,
                                deposit 
                            );
    
    
                        }
                        
    
    
    
    
    
        //                 let avaliableOrdereds = [];
        //                     let nowOwners = [];
        //                     log('availables arr')
        //                     log(available)
        //                     available.forEach((el) => {
        //                         avaliableOrdereds.push(el.orderer);
        //                         nowOwners.push(el.owner)
        //                     });
        //                     log('available orderers')
        //                     log(avaliableOrdereds)
        //                 // oplata
        //                 const result = await window.ic.plug.requestBalance();
        //                 log('BALANCE');
        //                 console.log(result);
                
        //                 const params = {
        //                     to: nowOwners[0],
        //                     amount: 2,
        //                     memo: '123451231231',
        //                 };
        //                 await window.ic.plug.requestTransfer(params).then(async (da) => {
        //                     log('ALL OK')
                
    
                            
        
                            
        //                     let countPrava = 1;
        //                     async function prava() {
        
        
        //                     // let resTransfer = await actor.transferFrom(nowOwners[countPrava - 1], Number(cannum), nowOwners[countPrava - 1], principal.toString(), Number(avaliableOrdereds[countPrava - 1]));
        //                     log('transferred the rights')
        
        //                     let da = new FormData();
        
        //                     da.append('owner', principal.toString())
        //                     da.append('cannum', cannum)
        //                     da.append('orderer', avaliableOrdereds[countPrava - 1])
        
        //                     let ress = await fetch('https://icp-control.com/updateOwnerLaunchNFT', {
        //                         method: "POST",
        //                         body: da
        //                     }).then(function(response) {
        //                         return response.json();
        //                     }).then(async function(data) {
        //                         return data.status;
        //                     });
        //                     countPrava += 1;
        
        
        
        //                         if (countPrava > dt) {
        //                             alert('payment was successful, we sent you your nft')
        //                         } else {
        //                             prava();
        //                         }
        //                     };
        //                     prava();
    
                         
        //                 }).catch((err) => {
        //                     log('ERROR')
        //                     log(err);
        //                     alert('Something went wrong while paying, please try again later.');
        //                 });
        //                 //oplata
    
    
                        
    
    
                    }
                }



            }



        });
    });
    

    

     


}









async function createIndexPage() {
    // let head = document.querySelector('head');
    // let indexHead = `
    //     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/css/splide.min.css">
    //     <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/js/splide.min.js"></script> 
    // `;    
    // head.innerHTML += indexHead;
    // log(head)
    const launchpadTokensRes = await contract.get_launchpad_tokens();

    launchpadTokensRes.forEach((el, ind) => {
        el[2] = 0;
        el[1].forEach((y) => {
            console.log(y[0])
            if (y[0].metadata.status !== "launchpad") {
                el[2] += 1;
            }
        });
    });

    let ltr = launchpadTokensRes.filter((el) => el[0] !== ":");
    log('launchpadTokens')
    log(ltr)

    let launchMainWrap = document.querySelector('.launch_list_main');
    

    ltr.forEach((x) => {
        log('xxxx')
        log(x)
        let launchItem = `
            <li class="splide__slide" >
                <div class="slider__item" >
                    <a href="/info" class="project__item" data-key="${x[0]}" style="max-height: 250px;
                    display: flex;
                    align-items: center;">
                        <img class="img" src="http://icp-control.com/${x[1][0][0].metadata.media}" alt="">
                        <div class="slider__block">${x[1][0][0].metadata.collection_name}</div>
                    </a>
                </div>
            </li>
        `
        launchMainWrap.innerHTML += launchItem;
    });



    let projectItems = document.querySelectorAll('.project__item');

    projectItems.forEach((g) => {
        g.addEventListener('click', function(event) {
            

            let dataKey = this.getAttribute('data-key');
    
            localStorage.setItem('dataKey', JSON.stringify(dataKey));
        
        });
    });




    new Splide( '#projectSlider', {
        perPage: 2,
        perMove: 1,
        arrows : true,
        gap    : '20px',
        pagination : false,
        breakpoints: {
            800: {
              perPage: 1,
            }
        }
    
    } ).mount();
    
    new Splide( '#productSlider', {
        perPage: 4,
        perMove: 1,
        arrows : true,
        gap    : '20px',
        pagination : false,
        breakpoints: {
            800: {
              perPage: 2,
            },
            540: {
                perPage: 1,
            }
        }
    
    } ).mount();
    
    new Splide( '#productSlider1', {
        perPage: 4,
        perMove: 1,
        arrows : true,
        gap    : '20px',
        pagination : false,
        breakpoints: {
            800: {
              perPage: 2,
            },
            540: {
                perPage: 1,
            }
        }
    
    } ).mount();
    
    new Splide( '#productSlider2', {
        perPage: 4,
        perMove: 1,
        arrows : true,
        gap    : '20px',
        pagination : false,
        breakpoints: {
            800: {
              perPage: 2,
            },
            540: {
                perPage: 1,
            }
        }
    
    } ).mount();

};





















function createEnterPage() {
    let allLinks = document.querySelectorAll('a');
    if (allLinks) {
        allLinks.forEach((el) => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.getAttribute('href') !== "") {
                    let href = this.getAttribute('href');
                    updateURL(href);
                    getPage();
                }
            });
        });
    }
};










async function adminPage() {
        // single nfts requests market 
        let smnWrap = document.querySelector('.single_market_requests');

        //get all requests
        fetch('https://icp-control.com/getAllRequestSingleNftMarket', {
            method: "POST",
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('errrrrrrrrr')
            console.log(data.status);

            smnWrap.innerHTML = "";
            data.status.forEach((el) => {
                let item = `
                    <div class="smn_item">
                        <div class="previw">
                            <img src="https://icp-control.com/${el.img}">
                        </div>
                        <div class="info">
                            <span class="user_principal" dt="${el.principal}">User: ${el.principal}</span>
                            <span class="name" dt="${el.name}">Name: ${el.name}</span>
                            <span class="symbol" dt="${el.symbol}">Symbol: ${el.symbol}</span>
                            <span class="description" dt="${el.description}">Description: ${el.description}</span>
                            <span class="price" dt="${el.price}">Price: ${el.price}</span>
                        </div>
                        <div class="buttons">
                            <button class="create_canister_smn">Create</button>
                            <button>Reject</button>
                        </div>
                    </div>
                `;
                smnWrap.innerHTML += item;
            });


            async function toDataURL(url) {
                const response = await fetch(url);
                const blob = await response.blob();
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
            }



            // create canister buttons 
            let allCreateCanisterBtns = document.querySelectorAll('.create_canister_smn');
            allCreateCanisterBtns.forEach((el) => {
                el.addEventListener('click', async function() {
                    let user = this.parentElement.parentElement.querySelector('.user_principal').getAttribute('dt');
                    let name = this.parentElement.parentElement.querySelector('.name').getAttribute('dt');
                    let symbol = this.parentElement.parentElement.querySelector('.symbol').getAttribute('dt');
                    let description = this.parentElement.parentElement.querySelector('.description').getAttribute('dt');
                    let price = this.parentElement.parentElement.querySelector('.price').getAttribute('dt');

                    let img = this.parentElement.parentElement.querySelector('img');
                    let imgSrc = this.parentElement.parentElement.querySelector('img').src;
                    let imguri = `${img}`
                    // create single nft market canister
                    log(user)
                    log(name)
                    log(symbol)
                    log(description)
                    log(price)
                    // log(img.src)

                    let tokenId = slugify(name + '-' + Date.now())

                    // const dataUrl = await toDataURL(imgSrc);
                    // console.log(dataUrl);
                    console.log(tokenId)

                    const deposit = nearAPI.utils.format.parseNearAmount('26.3'); // 0.4 NEAR
                    const gas = '300000000000000'; // 300 Tgas
                
                    await contract.nft_mint({
                      token_id: tokenId,
                      metadata: {
                        title: name,
                        description: description,
                        media: imgSrc,
                        media_hash: '',
                        copies: '1',
                        collection_name: "",
                        collection_id: "",
                        status: "market"
                      },
                      price: nearAPI.utils.format.parseNearAmount(String(price)),
                    }, gas, deposit);
                
                
                    await contract.nft_transfer(
                        {
                            receiver_id: user,
                            token_id: tokenId
                        },
                        gas
                    );


                    // await contract.nft_update_price(
                    //     {
                    //         token_id,
                    //         new_price: nearAPI.utils.format.parseNearAmount('2'),
                    //     },
                    //     gas
                    // );
                    
                    
                    
                    
                });
            });

        });


// single active canisters 
let singleCanistersWrap = document.querySelector('.admin_nft_single_canisters');
await fetch('https://icp-control.com/getAllCanisterInfo', {
    method: "POST"
}).then(function(response) {
    return response.json();
}).then(async function(data) {
    // log(data);
    
    // log('PEPEGA');

    let canNumbers = [];
    data.status.forEach((el, ind) => {
        // canNumbers.push(actor.getCanisterPrincipalSM(ind + 1));
    });

    let res = await Promise.all(canNumbers);
    log('======')
    log(res)
    
    singleCanistersWrap.innerHTML = "";
    res.forEach((el, ind) => {
        let item = `
            <div class="canister_item"> 
                <span>Id: ${ind + 1}</span>
                <p>Principal: ${el.toString()}</p>
                <p>Market : True</p>
            </div>
        `;
        singleCanistersWrap.innerHTML += item;
    });
    
});




        // end single nfts requests market 


       

    let allLinks = document.querySelectorAll('a');
    if (allLinks) {
        allLinks.forEach((el) => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.getAttribute('href') !== "") {
                    let href = this.getAttribute('href');
                    updateURL(href);
                    getPage();
                }
            });
        });
    }

    // TESTS
    //GET URI
    // let calls = document.querySelector('.calls');

    // let getURIEl = document.querySelector('.getUri');
    // let getUriKey = getURIEl.querySelector('input.key');
    // let getUriValue = getURIEl.querySelector('input.value');
    // let submit = getURIEl.querySelector('button');

    // submit.addEventListener('click', async function() {
    //     let key = getUriKey.value;
    //     let value = getUriValue.value;
    //     let res = await actor.tokenURI(Number(key), Number(value));
    //     log(res)
    // });

    // REQUESTS LAUNCHPAD
    let launchResult;
    await fetch('https://icp-control.com/getAllRequestLaunchpad', {
        method: "POST"
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data.status);
        launchResult = data.status;
    });
    // let result = await actor.allRequests();
    // log(JSON.parse(launchResult[0].srcs));
    
    if (launchResult.length) {
        let requestsWrap = document.querySelector('.admin_requests');
        requestsWrap.innerHTML = "";
        launchResult.forEach((el) => {
            
            let requestitem = `
            <div class="smn_item">
                <div class="previw">
                    <img srcs='${el.srcs}' src="https://icp-control.com/${JSON.parse(el.srcs)[0]}">
                </div>
                <div class="info">
                    <span class="user_principal" dt="${el.owner}">User: ${el.owner}</span>
                    <span class="name" dt="${el.name}">Name: ${el.name}</span>
                    <span class="symbol" dt="${el.symbol}">Symbol: ${el.symbol}</span>
                    <span class="description" dt="${el.description}">Description: ${el.description}</span>
                    <span class="price" dt="${el.price}">Price: ${el.price}</span>
                </div>
                <div class="buttons">
                    <button class="create_canister_launchpad">Create</button>
                    <button>All files</button>
                    <button>Reject</button>
                </div>
            </div>
            `;
            requestsWrap.innerHTML += requestitem;
        });
    }

    //CREATE LAUNCHPAD CANISTER 
    
    let approveBtn = document.querySelectorAll('.create_canister_launchpad');
    approveBtn.forEach((t) => {
        t.addEventListener('click', async function() {
           
            let user = this.parentElement.parentElement.querySelector('.user_principal').getAttribute('dt');
            let name = this.parentElement.parentElement.querySelector('.name').getAttribute('dt');
            // let symbol = this.parentElement.parentElement.querySelector('.symbol').getAttribute('dt');
            let description = this.parentElement.parentElement.querySelector('.description').getAttribute('dt');
            let price = this.parentElement.parentElement.querySelector('.price').getAttribute('dt');

            let imgSrcs = this.parentElement.parentElement.querySelector('img').getAttribute('srcs');
            let imgSrcsParsed = JSON.parse(imgSrcs);


            console.log(imgSrcsParsed)
            // create single nft market canister
            log(user)
            log(name)
            // log(symbol)
            log(description)
            log(price)
            // log(img.src)

            
            for(let i = 0; i < imgSrcsParsed.length; i++ ) {
                let tokenId = slugify(name + '-' + Date.now() + i)
                console.log(tokenId)
                const deposit = nearAPI.utils.format.parseNearAmount('2'); // 0.4 NEAR
                const gas = '300000000000000'; // 300 Tgas
                await contract.nft_mint({
                    token_id: tokenId,
                    metadata: {
                      title: name + '-#' + i,
                      description: description,
                      media: imgSrcsParsed[i],
                      media_hash: '',
                      copies: '1',
                      collection_name: name,
                      collection_id: slugify(name),
                      status: "launchpad"
                    },
                    price: nearAPI.utils.format.parseNearAmount(String(price)),
                  }, gas, deposit);
              
              
                  await contract.nft_transfer(
                      {
                          receiver_id: user,
                          token_id: tokenId,
                          status: "launchpad"
                      },
                      gas
                  );

            };



        });
    });
    

    ///// LAUNCHPAD CANISTERS 

    // single active canisters 
    let launchpadCanistersWrap = document.querySelector('.admin_nft_canisters');
    await fetch('https://icp-control.com/getAllCanisterLaunchpad', {
        method: "POST"
    }).then(function(response) {
        return response.json();
    }).then(async function(data) {
        // log(data);

        let canNumbers = [];
        data.status.forEach((el, ind) => {
            // canNumbers.push(actor.getCanisterPrincipal(ind + 1));
        });

        let res = await Promise.all(canNumbers);
        log('======')
        log(res)
        
        launchpadCanistersWrap.innerHTML = "";
        res.forEach((el, ind) => {
            let item = `
                <div class="canister_item"> 
                    <span>Id: ${ind + 1}</span>
                    <p>Principal: ${el.toString()}</p>
                    <p>Launchpad : True</p>
                </div>
            `;
            launchpadCanistersWrap.innerHTML += item;
        });
        
    });

      
    


    // <button name="${el[1].name[0]}" symbol="${el[1].symbol[0]}" class="indexPhoto__btn btn--submit btn--box approve_request"><span>Approve and create canister</span></button>
        let filesModal = document.querySelector('.filesModal');

        let closeMintModal = document.querySelector('.closeMintModal');
        if (closeMintModal) {
            closeMintModal.addEventListener('click', function() {
                filesModal.classList.remove('active');
            });
        };


        let showAllBtns = document.querySelectorAll('.show_all_files');
        if (showAllBtns) {
            showAllBtns.forEach((el) => {
                el.addEventListener('click', async function() {
                    preloaderOn();
                    let originalName = this.getAttribute('name');
                    let name = this.getAttribute('way');
                    let symbol = this.getAttribute('symbol');
                    let count = this.getAttribute('count');

                    freshName = originalName;
                    freshSymbol = symbol;
                    freshCount = count;
    
                    log(name);
                    log(symbol);
                    log(count);
    
                    let promiseArr = [];
                    for(let i = 0; i < count; i++) {
                        // promiseArr.push(actor.getRequestFile(`${name}_${symbol}_${i}`))
                    };
    
                    // freshNFTS = await Promise.all(promiseArr);
                    log(freshNFTS);
                    
                    filesModal.classList.add('active');
                    let filesModalWrap = document.querySelector('.filesModalWrap');
                    filesModalWrap.innerHTML = "";
                    freshNFTS.forEach((el) => {
                        if (el.length) {
                            let imgItem = `
                                <div class='file'>
                                    <img src="${el[0]}">
                                </div>
                            `;
                            filesModalWrap.innerHTML += imgItem;
                        };
                    });
                    preloaderOff();
                });
            });
        }


        // let allApproveBtns = document.querySelectorAll('.approve_request');
        // if (allApproveBtns) {
        //     allApproveBtns.forEach((el) => {
        //         el.addEventListener('click', async function() {
        //             let result = await actor.cycleBalance();
        //             log(result);
        //             let count = await actor.getCanistersCount();
        //             log(Number(count) + 1);
        //             await actor.createCanister(Number(count) + 1, 'FlockyTest', 'PTT').then(async () => {
        //                 let count = await actor.getCanistersCount();
        //                 let resCount = Number(count) + 1;
        //                 let res = actor.setCanistersCount(resCount);
        //                 log(res);
        //             }).catch((err) => {
        //                 log(err);
        //                 throw err;
        //             });
                    
                    
        //         });
        //     });
        // }

        let allRejectBtns = document.querySelectorAll('.reject_request');
        if (allRejectBtns) {
            allRejectBtns.forEach((el) => {
                el.addEventListener('click', async function() {
                    let numer = this.getAttribute('numer');
                    // let res = await actor.deleteRequest(Number(numer));
                    // log(res);
                    this.parentElement.parentElement.parentElement.parentElement.remove();
                });
            });
        }


        // let allP = document.querySelectorAll('.pizda');
        // if (allP) {
        //     allP.forEach((el) => {
        //         el.addEventListener('click', async function() {
        //             // let result = await actor.getCanisterPrincipal(1);
        //             // log(result.toString());
        //             // let result2 = await actor.name(1);
        //             // log(result2);
        //             // let result3 = await actor.symbol(1);
        //             // log(result3);
        //             // let r = await actor.setNftCount('mcuwn-dqaaa-aaaap-qasaa-cai', 1);
        //             // log(r)
        //             // let b = await actor.getNftCount('mcuwn-dqaaa-aaaap-qasaa-cai');
        //             // log(b)
        //             let p = await actor.tokenURI(3, 6);
        //             log(p)
        //             // let pep = await actor.setNftCount('mlx5r-vyaaa-aaaap-qasbq-cai', 6);
        //             // log(pep)
        //             // let own = await actor.transferFrom(1, '3r36y-oqaaa-aaaap-qar6a-cai', 'pzlfg-jr6tq-652ce-pa73c-eh5lb-rsqji-mk7nl-wgyjs-l5yd3-cyipe-pqe', 1);
        //             // log(own.toString());
                    
        //         });
        //     });
        // }


    // END REQUESTS
    


    // END NFT CANISTERS
};

















function createNFTPageSingle() {
    let allLinks = document.querySelectorAll('a');
    if (allLinks) {
        allLinks.forEach((el) => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.getAttribute('href') !== "") {
                    let href = this.getAttribute('href');
                    updateURL(href);
                    getPage();
                }
            });
        });
    }

    let createRequestBtn = document.querySelector('.indexPhoto__btn.btn--submit.btn--non');
    if (createRequestBtn) {
        createRequestBtn.addEventListener('click', function() {

            if (!walletConnection.isSignedIn()) {
                alert('Not authenticated');
            } else {
              console.log(walletConnection.getAccountId())
              createRequestSingleNftMarket();
              alert('Your application has been accepted, after consideration you will be contacted and you will receive a notification by email');
              location.reload();
            }

            
        });
    }


  // auth protect 
log('auth')
  let authDiv = document.querySelector('.create__photo-text.auth');
  if (authDiv) {

        if (!walletConnection.isSignedIn()) {
            authDiv.innerHTML = 'Not authenticated';
        } else {
            console.log(walletConnection.getAccountId())
            authDiv.innerHTML = walletConnection.getAccountId()
        }

    //   if (principal.toString() !== '2vxsx-fae') {
    //       authDiv.innerHTML = principal.toString().substr(0, 11) + ' ...';
    //   } else {
  
    //   }
  }


  //


}






function createNFTPageMultiply() {
    let allLinks = document.querySelectorAll('a');
    if (allLinks) {
        allLinks.forEach((el) => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.getAttribute('href') !== "") {
                    let href = this.getAttribute('href');
                    updateURL(href);
                    getPage();
                }
            });
        });
    }

    let createRequestBtn = document.querySelector('.indexPhoto__btn.btn--submit.btn--non');
    if (createRequestBtn) {
        createRequestBtn.addEventListener('click', function() {

            if (!walletConnection.isSignedIn()) {
                alert('Not authenticated');
            } else {
                console.log(walletConnection.getAccountId())
                createRequest();
                alert('Your application has been accepted, after consideration you will be contacted and you will receive a notification by email');
                location.reload();
            }

        });
    }
    

    // auth protect 
    
    let authDiv = document.querySelector('.create__photo-text.auth');
    if (authDiv) {
        if (walletConnection.isSignedIn()) {
            authDiv.innerHTML = walletConnection.getAccountId();
        }

    }


    //




// btn.addEventListener('click', () => {
// thanksModal();
// });
}










// service

let notification = document.querySelector('#notification');
let blockchain = document.querySelector('#blockchain');
let NotModal = document.querySelector('#NotModal');
let NotModal2 = document.querySelector('#NotModal2');
let flexContent = document.querySelector("#flexContent");

let clickCount = 0;
function checkClick() {
  if ( clickCount % 2 == 0 ) {
    setTimeout(function() {
        NotModal.classList.add('notification-active');
    }, 1);
    NotModal.classList.remove('nonee');
  } else {
    setTimeout(function() {
        NotModal.classList.add('nonee');
    }, 200);
    NotModal.classList.remove('notification-active');
  }

  clickCount++;
}

let clickCount2 = 0;
function checkClick2() {
  if ( clickCount2 % 2 == 0 ) {
    setTimeout(function() {
        NotModal2.classList.add('notification-active');
    }, 1);
    NotModal2.classList.remove('nonee');
}   else  {
        setTimeout(function() {
            NotModal2.classList.add('nonee');
        }, 200);
        NotModal2.classList.remove('notification-active');
    }

  clickCount2++;
}

const mediaQuery = window.matchMedia('(max-width: 992px)');
function handleTabletChange(e) {
    if (e.matches) {
        let not = document.getElementsByClassName("ddd");
        let mod = document.getElementsByClassName('notification-active');
        // for (i = 0; not.length > i; i++) {
        //     not[i].onclick = function() {
        //         let current = mod[0];
        //         if (current) {
        //             setTimeout(function() {
        //                 current.classList.remove("notification-active");
        //             }, 1);
                
        //         setTimeout(function() {
        //             current.classList.remove("notification-active");
        //             current.classList.add('nonee');
        //         }, 200);
        //     }
        //     };
        // }
    }
  }
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);

let clickCount5 = 0;
        function checkClick5() {
        if ( clickCount5 % 2 == 0 ) {
            setTimeout(function() {
                NotModal2.classList.add('notification-active');
            }, 1);
            NotModal2.classList.remove('nonee');
        }

clickCount5+=2;
}

let clickCount4 = 0;
        function checkClick4() {
        if ( clickCount4 % 2 == 0 ) {
            setTimeout(function() {
                NotModal.classList.add('notification-active');
            }, 1);
            NotModal.classList.remove('nonee');
        }

clickCount4+=2;
}



let modalItem = document.getElementsByClassName("modal__inner-item");
let borderColor = document.getElementsByClassName('borderColor');
// for (i = 0; modalItem.length > i; i++) {
//     modalItem[i].onclick = function() {
//     let currentActive = borderColor[0];
//     if (currentActive)
//       currentActive.classList.remove("borderColor");

//     if (currentActive !== this)
//       this.classList.add("borderColor");
//     };
// }

let navToggle = document.querySelector("#navToggle");

navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('burger-active');

    flexContent.classList.toggle('show');
});

navToggle.addEventListener('click', function () {
    NotModal.classList.remove('notification-active');
    NotModal2.classList.remove('notification-active');
});

let clickCount3 = 0;
function checkClick3() {
  if ( clickCount3 % 2 == 0 ) {
}   else  {
        clickCount++;
        clickCount2++;
    }

    clickCount3++;
}


// if (Splide) {


// }


// end
};




async function createCardPage() {


    const tokens = await contract.get_all_tokens();
    log(tokens)

    let ownerContainer = document.querySelector('.card__left-autor p');
    let srcContainer = document.querySelector('.card__left-img img');
    let nameContainer = document.querySelector('.card__right-title');
    let descriptionContainer = document.querySelector('.card__right-text');
    let priceContainer = document.querySelector('.card__right .price2');
    let nftContainer = document.querySelector('.nftcanister');


    let localitem = JSON.parse(localStorage.getItem('dataId'));

    let nn;
    tokens.forEach((x) => {
        if (x[0] == localitem) {
            nn = x;
        }
    });

    console.log('nn')
    console.log(nn)

    ownerContainer.innerText = `${nn[1].owner_id.substr(0,10)}...`;
    if (!nn[1].metadata.media.startsWith('http')) {
        nn[1].metadata.media = 'https://icp-control.com/' + nn[1].metadata.media;
    }
    srcContainer.src = nn[1].metadata.media;
    nameContainer.innerText = `${nn[1].metadata.title} - ${nn[1].metadata.collection_name}`;
    // nftContainer.innerText = localitem.canName;
    let price = (nn[1].price / 10 ** 24) + 0.10;
    priceContainer.innerText = `${String(price).substr(0, 5)} Near`;
    descriptionContainer.innerText = nn[1].metadata.description;


    // BUY BUTTON
    let buyButton = document.querySelector('.card__right-btn .buy__btn');


    if (nn[1].owner_id == walletConnection.account().accountId) {
        buyButton.remove();
    }



    buyButton.addEventListener('click', async function() {

        if (!walletConnection.isSignedIn()) {
            alert('Not authenticated')
        } else {

            const deposit = nearAPI.utils.format.parseNearAmount(String(price)); // 0.4 NEAR
            const gas = '300000000000000'; // 300 Tgas
        
        
            await contract.nft_purchase(
                {
                    token_id: nn[0],
                    receiver_id: walletConnection.getAccountId(),
                    status: 'market'
                },
                gas, // максимальное количество газа для транзакции
                deposit // сумма депозита в yoctoNEAR
            );

        }
 

    });
    // let owner = JSON.parse(localStorage.getItem('cardItem')).owner;
    // if (owner == principal.toString()) {
    //     buyButton.remove();
    // }
    // let canisterArrayNumber = JSON.parse(localStorage.getItem('cardItem')).canArrNum;


    // ACTIVITY RENDER 
    // let activityWrap = document.querySelector('.activity');
    // activityWrap.innerHTML = "";
    // let fData = new FormData();
    // fData.append('cannum', canisterArrayNumber);

    // fetch('https://icp-control.com/getTransa', {
    //     method: "POST",
    //     body: fData,
    // }).then(function(response) {
    //     return response.json();
    // }).then(function(data) {
    //     // log('PEPEGA EBANAYA')
    //     console.log(data.status);

    //     data.status.forEach((el) => {

         

    //         let activityItem = `
    //         <table class="card__table">
    //                 <thead>
    //                     <tr>
    //                         <th></th>
    //                         <th>
    //                             <strong>Price</strong>
    //                         </th>
    //                         <th>
    //                             <strong>From</strong>
    //                         </th>
    //                         <th>
    //                             <strong>To</strong>
    //                         </th>
                            
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     <tr>
    //                         <td class="card__table-row">
    //                             <div class="card__table-flex">
    //                                 <svg class=""  width="45" height="34" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#db4d4d">
    //                                 <path
    //                                     d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z">
    //                                 </path>
    //                             </svg> 
    //                             <strong class="red">Sale</strong>
    //                             </div>
    //                         </td>
    //                         <td class="card__table-row card__table-col">
    //                             <span class="table-price">${el.price} NEAR</span>
                               
    //                         </td>
    //                         <td class="card__table-row">
    //                             <a href="" target="_blank">${el.fromp.substr(0, 28)}...</a>
    //                         </td>
    //                         <td class="card__table-row">
    //                             <a href="" target="_blank">${el.top.substr(0, 28)}...</a>
    //                         </td>
                            
    //                     </tr>
    //                 </tbody>
    //             </table>
    //         `
    //         activityWrap.innerHTML += activityItem;

    //     });



    // });

    










  






    //////////////////

const like = document.querySelector('#like')

let clickCount1 = 0;
like.addEventListener('click', () => {
    clickCount1++;
    if (clickCount1 % 2) {
        like.querySelector('.count').textContent++;
        like.querySelector('.count').classList.add('red')
        like.querySelector('.card__svg path').classList.add('red')
    } else {
        like.querySelector('.count').textContent--;
        like.querySelector('.count').classList.remove('red')
        like.querySelector('.card__svg path').classList.remove('red')
    }

    if (clickCount1 == 3) {
        clickCount1 = 1
    }
});

new Splide( '#productSlider4', {
    perPage: 4,
    perMove: 1,
    arrows : true,
    gap    : '20px',
    pagination : false,
    breakpoints: {
        800: {
          perPage: 2,
        },
        540: {
            perPage: 1,
        }
    }

} ).mount();









};




























/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////




function defaultFormCode() {
        /* Create Card */
const cardItems = document.querySelectorAll('.create__group-item'),
backLink = document.querySelectorAll('.create__inner-link');

animate(cardItems, 'animate__rubberBand');
animate(backLink, 'animate__fadeOutLeft');

function animate(animateEl, animateName) {
animateEl.forEach(item => {
  item.querySelector('img').classList.add('animate__animated');

  item.addEventListener('mouseenter', () => {
      item.querySelector('img').classList.add(animateName);
  });

  item.addEventListener('mouseleave', () => {
      item.querySelector('img').classList.remove(animateName);
  });
});
}

let nameOfCard = '';
const inputTitle = document.querySelector('.input-title');
// const createImg = document.querySelector('.create__box-flexbox img');

cardItems.forEach(item => {
item.addEventListener('click', () => {
  nameOfCard = item.querySelector('.create__group-title').innerText
  localStorage.setItem('nameOfCard', nameOfCard);
});
});

inputTitle.textContent = localStorage.getItem('nameOfCard');
// createImg.src = `assets/img/${localStorage.getItem('nameOfCard')}.png`;

const inputs = document.querySelectorAll('.line-chek'),
btn = document.querySelector('.btn--non'),
inputsArr = Array.from(inputs),
price = document.querySelector('.line__price'),
nameOfWork = document.querySelector('.name__work'),
nameInput = document.querySelector('.line__name'),
procent = document.querySelector('.procent'),
priceCount = document.querySelector('.jsCount'),
multipleInput = document.querySelector('.multip-input');

function limitedValue(nameOfValue, count) {
if (nameOfValue.textContent.length > count) {
  nameOfValue.textContent = nameOfValue.textContent.slice(0, count) + '...'
}
}

inputs.forEach(item => {

let statusMessage = document.createElement('div');
statusMessage.innerHTML = 'Invalid value'
          statusMessage.style.cssText = `
              font-size: 12px;
              line-height: 14px;
              position: absolute;
              left: 295px;
          `;
item.addEventListener('input', () => {

  nameOfWork.textContent = nameInput.value

  if (item.value == '') {
      statusMessage.style.color = '#e85b67';
  } else {
      statusMessage.style.color = 'transparent';
  }
  limitedValue(nameOfWork, 16);

  if ((inputsArr.some(elem => elem.value == '') || (!isNaN(price.value)) == false || multipleInput.value < 2) ) {
      btn.disabled = true;
  } else {
      btn.disabled = false;
  }

  if (!isNaN(price.value) ) {
      priceCount.textContent = price.value;
      procent.textContent = price.value - price.value * 0.025;

      limitedValue(priceCount, 10);
      limitedValue(procent, 10);
  } else {
      price.value = price.value.replace(/[\D0]/, '');
  }

  item.insertAdjacentElement('afterend', statusMessage);
});
});

let statusMessageCopies = document.createElement('div');
statusMessageCopies.innerHTML = 'Copies must be more than 1'
  statusMessageCopies.style.cssText = `
              font-size: 12px;
              line-height: 14px;
              position: absolute;
              left: 202px;
          `;

multipleInput.addEventListener('input', () => {
if (!isNaN(multipleInput.value) ) {
} else {
  multipleInput.value = multipleInput.value.replace(/[\D0]/, '');
}

if ((inputsArr.some(elem => elem.value == '') || (!isNaN(price.value)) == false || multipleInput.value < 2) ) {
  btn.disabled = true;
} else {
  btn.disabled = false;
}

if (multipleInput.value < 2) {
  statusMessageCopies.style.color = '#e85b67';
} else {
  statusMessageCopies.style.color = 'transparent';
}

multipleInput.insertAdjacentElement('afterend', statusMessageCopies);
});

if ((inputsArr.some(elem => elem.value == '') ) ) {
btn.disabled = true;
} else {
btn.disabled = false;
}

const multipleBlock = document.querySelector('.multiple');


if (localStorage.getItem('nameOfCard') == 'Multiple') {
multipleBlock.classList.add('mulblock');
} else {
multipleBlock.classList.remove('mulblock');
}

const inputTurn = document.querySelector('.input__turn'),
inputImg = document.querySelector('.input__img');

function previewFile(input, inputImg) {
const files = input.files;
let totalImages = document.querySelector('.total_images span');
totalImages.innerHTML = input.files.length;
log(slugify('Top Content NFT'));
log(input.files)

base64Arr = [];

if (files) {
    const reader = new FileReader();
    // Array.from(files).forEach(file => {
    let count = 0;

    function readImage(f) {
        reader.onload = function() {
            base64Arr.push(reader.result);
            count += 1;
            if (files[count]) {
                readImage(files[count])
            } else {
                inputImg.setAttribute("src", reader.result);
                log(base64Arr);
            }
        }
        reader.readAsDataURL(f);
    }
    readImage(files[count])
        
    // });

    
    

    





}
}

inputTurn.addEventListener('input', function() {
previewFile(inputTurn, inputImg);
inputImg.style.opacity = 1;
document.querySelector('.btn__hide').style.opacity = 0;
});

function thanksModal() {
const modalThanks = document.querySelector('.modal__thanks');

modalThanks.style.display = 'block';
modalThanks.classList.add('fade');

setTimeout(function() {
  modalThanks.classList.add('fadeOut');
}, 2000);

setTimeout(function() {
  modalThanks.style.display = 'none';
  modalThanks.classList.remove('fade');
  modalThanks.classList.remove('fadeOut');
  window.location.href = 'create.html'
}, 3000);
}
}


















function defaultFromMarket() {
    const slides = document.querySelectorAll('[data-slide]');
    const slideWidth = document.querySelector('.market__slide-item--purple');
    
    slides.forEach(el => {
        el.addEventListener('click', () => {
            const clickedEL = el.closest('.market__slide-list').querySelector('.market__list')
            const arrowBackReturn = el.querySelector('.market__slide-icon--class')
            let elHeight = clickedEL.querySelector('.check-height').offsetHeight;
            if (clickedEL.classList.contains('show-list')) {
                    clickedEL.style.height = 0
                    clickedEL.classList.remove('show-list')
                    arrowBackReturn.style.transform = 'rotate(0deg)'
            } else {
                clickedEL.style.height = elHeight + 'px'
                clickedEL.classList.add('show-list')
                arrowBackReturn.style.transform = 'rotate(180deg)'
            }
        });
    });
    
    const elWidth = document.querySelector('.check-height').offsetWidth;
    const arrowReturn = document.querySelector('.market__slide-icon--abs img')
    slideWidth.addEventListener('click', () => {
        const clickedEL = slideWidth.closest('.market__slide');
        
        if (clickedEL.classList.contains('show-list')) {
            clickedEL.style.maxWidth = elWidth + 'px';
            clickedEL.classList.remove('show-list')
            arrowReturn.style.transform = 'rotate(360deg)'
        } else {
            clickedEL.style.maxWidth = 0
            clickedEL.classList.add('show-list')
            arrowReturn.style.transform = 'rotate(180deg)'
        }
    });
    
    let indexOfArr1 = 0;
    const markerItem = document.querySelectorAll('.market__list-item');
    let whichCliced = '';
    
    for (let i = 0; i < markerItem.length; i++) {
        const el = markerItem[i];
        el.addEventListener('click', () => {
            console.log(whichCliced)
            indexOfArr1 = i
            whichCliced = el.textContent;
    
            if ((whichCliced == 'Apply')) {
                const searchMin = document.querySelector('.search__input--price-min').value
                const searchMax = document.querySelector('.search__input--price-max').value
                whichCliced = searchMin + ' NEAR' + ' - ' + searchMax + ' NEAR'
            }
    
            if (el.classList.contains('show-list')) {
                el.classList.remove('marker')
                el.classList.remove('show-list')
                myCards.forEach(item => {
                    if (indexOfArr1 == Number(item.closest('.chosen-categories-item').id)) {
                        item.closest('.chosen-categories-item').remove('.chosen-categories-item')
                        myCards = document.querySelectorAll('.chosen__item-img')
                    }
                });
            } else {
                el.classList.add('marker')
                createCard();
                el.classList.add('show-list')
            }
    
            if (myCards.length > 0) {
                clearBtn.style.display = 'flex'
            } else {
                clearBtn.style.display = 'none'
            }
        });
    }
    
    let myCards = ''
    
    function createCard() {
        const element = document.createElement('div');
    
        element.classList.add('chosen-categories-item');
    
        element.innerHTML = `
            <div class="chosen__item-text">${whichCliced}</div>
            <div class="chosen__item-img">
                <img src="assets/img/delete.svg" alt="">
            </div>
        `;
    
        element.id = indexOfArr1;
    
        document.querySelector('.chosen-categories').append(element)
        myCards = document.querySelectorAll('.chosen__item-img')
    
        for (let i = 0; i < myCards.length; i++) {
            const el = myCards[i];
            el.addEventListener('click', () => {
                let deleteIndex = Number(el.closest('.chosen-categories-item').id)
                el.closest('.chosen-categories-item').remove('.chosen-categories-item')
                if (indexOfArr1 == Number(element.id)) {
                    markerItem[deleteIndex].classList.remove('show-list')
                    markerItem[deleteIndex].classList.remove('marker')
                    myCards = document.querySelectorAll('.chosen__item-img')
                }
    
                if (myCards.length > 0) {
                    clearBtn.style.display = 'flex'
                } else {
                    clearBtn.style.display = 'none'
                }
            });
            
        }
    }
    
    let clearBtn = document.querySelector('.clear');
    
    clearBtn.addEventListener('click', () => {
        myCards.forEach(el => {
            el.closest('.chosen-categories-item').remove('.chosen-categories-item')
        });
        myCards = []
    
        markerItem.forEach(el => {
            el.classList.remove('marker')
            el.classList.remove('show-list')
        });
        
        if (myCards.length > 0) {
            clearBtn.style.display = 'flex'
        } else {
            clearBtn.style.display = 'none'
        }
    });
}