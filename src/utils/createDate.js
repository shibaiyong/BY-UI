let dates = {

  yearsArr:[],
  monthsArr:[],
  datesArr:[],
  newYear(startY,endY){
    this.yearsArr = []
    let k = 0
    var startY = startY*1
    var endY = endY*1
    while(startY <= endY){
      k++;
      this.yearsArr.push({id:k,name:startY++})
    }
    return this.yearsArr

  },
  newMonth(startM,endM){
    this.monthsArr = []
    let k = 0
    let val = ''
    while(startM <= endM){
      k++;
      val = startM > 9 ? startM : '0'+startM
      this.monthsArr.push({id:k, name:val})
      startM++
    }

    return this.monthsArr

  },
  newDate(startD,endD){
    this.datesArr = []
    let k = 0
    let val = ''
    while(startD <= endD){
      k++;
      val = startD > 9 ? startD : '0'+startD
      this.datesArr.push({id:k, name:val})
      startD++
    }

    return this.datesArr

  }
}

export default dates