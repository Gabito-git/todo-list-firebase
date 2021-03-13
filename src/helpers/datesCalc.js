

const datesCalc = ( date ) => {
    
    const dateArr = date.split('/');
    const dateNumArr = dateArr.map( d => parseInt( d ) );

    return dateNumArr[0]*30 + dateNumArr[1];
}

export default datesCalc
