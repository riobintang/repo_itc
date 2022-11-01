function subtractHours(numOfHours, date = new Date()) {
    const dateCopy = new Date(date.getTime());
  
    dateCopy.setHours(dateCopy.getHours() - numOfHours);
  
    return dateCopy;
}

module.exports = subtractHours;