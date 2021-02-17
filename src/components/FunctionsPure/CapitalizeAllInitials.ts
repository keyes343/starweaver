export const capitalizeAllInitials = (sentence:string) => {
    let newSentence = '';
    let wordsArr:string[] = sentence.split(' ')
    let len = wordsArr.length;
    wordsArr.forEach((word,i)=>{
        let newWord = word.charAt(0).toUpperCase() + word.slice(1)
        if(i<len-1){
            newSentence += newWord+' '
        }else newSentence += newWord;
    });
    return newSentence;
}