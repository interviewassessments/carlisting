export const generateRandomImage = (imagesArray: string[]) => {
    const randomNum = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[randomNum];
}