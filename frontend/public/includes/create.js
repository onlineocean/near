let create = {
    item : `
    <div class="create">
        <div class="container">
            <div class="create__inner">
                <a href="/" class="create__inner-link">
                    <img src="assets/img/right-arrow.svg" alt="">
                    Back
                </a>
                <div class="create__flexbox">
                    <div class="create__inner-title">Create collectible</div>
                    <div class="create__inner-subtitle">Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one collectible multiple times</div>
                    <div class="create__group">
                        <a href="/create_single" class="create__group-item">
                            <div class="card__img">
                                <img class="card" src="assets/img/single.png" alt="">
                            </div>
                            <div class="create__group-title">Single</div>
                        </a>
                        <a href="/create_multiply" class="create__group-item">
                            <div class="card__img card__img--green">
                                <img class="card" src="assets/img/multiple.png" alt="">
                            </div>
                            <div class="create__group-title create__group-title--green">Multiple</div>
                        </a>
                    </div>
                    <div class="create__inner-subtitle">We do not own your private keys and cannot access your funds without your confirmation</div>
                </div>
            </div>
        </div>
    </div>
    `,
}

export default create;