export const ITEMS_PER_PAGE = 10;
export const HOSTURL = window.location.origin;
export const discountedPrice = (item)=>{
    return Math.round(item.price * (1-item.discountPercentage/100));
}