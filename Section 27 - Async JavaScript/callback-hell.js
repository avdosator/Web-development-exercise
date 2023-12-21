// Like this background would be set to last color
setTimeout(() => {
    document.body.style.backgroundColor = 'red';
}, 1000);

setTimeout(() => {
    document.body.style.backgroundColor = 'orange';
}, 1000);

setTimeout(() => {
    document.body.style.backgroundColor = 'yellow';
}, 1000);

// If we want one function to execute after another, we need nesting

/* setTimeout(() => {
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
        document.body.style.backgroundColor = 'orange';
        setTimeout(() => {
            document.body.style.backgroundColor = 'green';
            setTimeout(() => {
                document.body.style.backgroundColor = 'blue';
                setTimeout(() => {
                    document.body.style.backgroundColor = 'violet';
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000); */

// So we could now extract this to function so we could reuse it later
// We use callback (doNext) for delayed action
// this is common pattern but nesting makes code ugly and error prone

const delayedColorChange = (color, delay, doNext) => {
    setTimeout(() => {
        document.body.style.backgroundColor = color;
        if (doNext && doNext());
    }, delay)
}

delayedColorChange('red', 1000, () => {
    delayedColorChange('orange', 1000, () => {
        delayedColorChange('green', 1000, () => {
            delayedColorChange('blue', 1000, () => {
                delayedColorChange('violet', 1000)
            })
        })
    })
})