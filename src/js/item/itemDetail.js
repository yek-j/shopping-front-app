export const movePrimaryItem = (imglist) => {
    if(imglist[0].isPrimary === true) return imglist;
    const primaryImg = imglist.find(img => img.isPrimary === true);
    
    const otherImg = arr.filter(img => img.isPrimary !== true);
    console.log([primaryImg, ...otherImg]);
    return [primaryImg, ...otherImg];
}

export const getCurrentPrice = (price, amount) => {
    return price * amount;
}