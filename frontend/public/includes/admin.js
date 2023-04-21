let admin = {
    item : `
        <div class="create admin">
            <div class="container">

                <div class="filesModal">
                    <div class="closeMintModal">
                        <span>X</span>
                    </div>
                    <div class="filesModalWrap">
                    

                    </div>
                    <div class="mintWrap">
                        <button class="mint btn--submit btn--box approve_request">Create canister and mint!</button>
                    </div>
                </div>

                <h1>Admin panel</h1>
                <div class="create__inner create__inner--box">
                    <a class="create__inner-link" style="width: 260px; margin-left: 0; margin-bottom: 30px;">
                        Market single nfts requests
                    </a>

                    <div class='single_market_requests'>

                    </div>

                    <a class="create__inner-link" style="width: 260px; margin-left: 0; margin-bottom: 30px;">
                        Market single nfts
                    </a>

                    <div class="admin_nft_single_canisters">
    
                    </div>

                    <a class="create__inner-link" style="width: 260px; margin-left: 0; margin-bottom: 30px;">
                        Launchpad requests
                    </a>
                   
                    <div class='admin_requests'>

                    </div>

                    <a class="create__inner-link" style="width: 260px; margin-left: 0; margin-bottom: 30px;">
                        launchpad NFT
                    </a>

                    <div class="admin_nft_canisters">
                
                    </div>

                    <div class="admin_service"> 
                        <button class="getAllNfts">Get all tokens</button>
                        <button class="getMyNfts">Get my tokens</button>
                        <button class="getLauncpads">Get launchpads</button>
                        <button style="opacity: .5; pointer-events: none;" class="removeContract">Remove contract data</button>
                    </div>

                    

                    
                </div>
            </div>
        </div>
    `,
    zapas: `
    <a class="create__inner-link" style="width: 260px; margin-left: 0; margin-bottom: 30px;">
                        CALLS
                    </a>

                    <div class=calls>

                        <div class="getUri">
                            <p>Get URI</p>
                            <input class="key" type="text" placeholder="Canister id">
                            <input class="value" type="text" placeholder="NFT id">
                            <button>Get URI</button>
                        <div>


                    </div>
    `
}

export default admin;