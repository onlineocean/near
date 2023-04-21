let box_multiply = {
    item : `
    <div class="create">
        <div class="container">
            <div class="create__inner create__inner--box">
                <a href="/create" class="create__inner-link">
                    <img src="assets/img/right-arrow.svg" alt="">
                    Back
                </a>
                <div class="create__box">
                    <div class="create__box-flexbox">
                        <img src="assets/img/box.svg" alt=""> 
                        <div class="create__inner-title">Create <span class="input-title"></span> NFT Collection</div>
                    </div>
                </div>
                <div class="create__box-flex">
                    <div class="create__box-descr">
                        <div class="create__box-title">
                            The name of your NFT Collection
                        </div>
                        <input class="line line-chek line__name" type="text" placeholder="Enter the name of your box" value="Abstract 3D work">
                        <div class="create__box-title">
                            The symbol of your NFT Collection
                        </div>
                        <input class="line line-chek line__symbol" type="text" placeholder="Enter the symbol of your box" value="ENFT">
                        <div class="create__box-title">
                            Description
                        </div>
                        <input class="line line-chek line__description" type="text" placeholder="Write a description of your box">
        
                        <div class="create__box-title">
                            Price
                        </div>
                        <input class="line line-chek line__price" type="text" placeholder="Write the price of your offer">
                        <div class="create__box-desc">Service fee <span>2.5%</span></div>
                        <div class="create__box-desc">You will receive <span><span class="procent">0</span> NEAR</span></div>

                        <div class="multiple">
                            <div class="create__box-title">
                                Number of copies
                            </div>
                            <input class="line multip-input" type="text" placeholder="Write the number of copies" multiple value="2">
                        </div>


                    </div>
        
                    <div class="create__box-photo">
                        <div class="create__photo-group">
                            <div>
                                <div class="create__photo-title name__work">Abstract 3D work</div>
                                
                            </div>
                            <div>
                                <div class="create__photo-text">Preview</div>
                                <a href="#" class="create__photo-like"><img src="assets/img/heart.svg" alt=""> 121</a>
                            </div>
                        </div>
                        <div class="create__photo-block">
                            <img src="" alt="" class="input__img">
                            <div class="create__block-text">
                                PNG, GIF, WEBP.<br>Max 100 MB.
                            </div>
                            <button href="create.html" class="indexPhoto__btn btn--submit btn--box btn__hide"><span>Upload</span></button>
                            <div>
                                <input class="input__turn" multiple type="file">
                            </div>
                        </div>
                        <div class="create__photo-group">
                            <div>
                                <p class="total_images">Images: <span>0</span></p>
                                <div class="create__photo-subtitle">Current bid:</div>
                                <div class="create__photo-price"><span class="jsCount"></span> NEAR</div>
                            </div>
                            <div class="mt">
                                <div class="create__photo-photo"><img src="assets/img/user.svg" alt=""></div>
                                <div class="create__photo-text auth">Not Auth</div>
                            </div>
                        </div>
                    </div>
                </div>

                <button href="create.html" class="indexPhoto__btn btn--submit btn--non"><span>Create</span></button>
            </div>
        </div>
    </div>
    `,
}

export default box_multiply