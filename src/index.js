const activityWrapper = document.querySelector('.activity-wrapper')

const btnDaily = document.querySelector('.btn-daily')
const btnWeekly = document.querySelector('.btn-weekly')
const btnMonthly = document.querySelector('.btn-monthly')

const hoursElem = document.getElementsByClassName('hours')
const preHoursElem = document.getElementsByClassName('prev-hours')

const loadJSON = async () => {
    try {
        const result = await fetch('http://127.0.0.1:5500/data.json')
        const data = await result.json()
        
        displayData(data)

    } catch (error) {
        console.log(error)
    }
} 

const displayData = (data) => {
    
    let array = []

    data.forEach(activity => {
        const title = activity.title.toLowerCase().replace(' ', '-')
        const daily_h = activity.timeframes.daily.current
        const daily_p = activity.timeframes.daily.previous
        const weekly_h = activity.timeframes.weekly.current
        const weekly_p = activity.timeframes.weekly.previous
        const monthly_h = activity.timeframes.monthly.current
        const monthly_p = activity.timeframes.monthly.previous

        let el = `
        <div class="card activity">
            <div class="card-header header-${title}">
            <img src="./images/icon-${title}.svg" alt="${title}">
            </div>
            <div class="card-body">
            <div class="title-wrapper">
                <p class="title">${activity.title}</p>
                <span class="option-btn">
                <img src="./images/icon-ellipsis.svg"/>
                </span>
            </div>
            <div class="hours-wrapper">
                <p class="hours" 
                    daily-h="${daily_h}"
                    weekly-h="${weekly_h}"
                    monthly-h="${monthly_h}"
                    >${daily_h}hrs
                </p>
                <p class="prev-hours"
                    daily-p="${daily_p}"
                    weekly-p="${weekly_p}"
                    monthly-p="${monthly_p}"
                    >Yesterday - ${daily_p}hrs</p>
            </div>
            </div>
        </div>
        `
        array.push(el)
    });

    activityWrapper.innerHTML = array.join(' ')
}

const changeData = (name) => {
    for(let el of hoursElem) {
        const hours = el.getAttribute(`${name}-h`) // attribute name (hours)
        el.innerText = hours + 'hrs'
    }

   // set dynamic text (yesterday, lastweek, lastmonth)
    let txt = 'Yesterday' // default

    if(name === 'weekly')  txt = 'Last Week'
    if(name === 'monthly') txt = 'Last Month'

    for(let el of preHoursElem) {
        const hours = el.getAttribute(`${name}-p`) // attribute name (prev-hours)
        el.innerText = `${txt} - ${hours}hrs`
    }

    // active button
    setButton(name)

}

const setButton = (name) => {
    document.querySelector('.b-active').classList.remove('b-active')
    if(name === 'daily')   btnDaily.classList.add('b-active')
    if(name === 'weekly')  btnWeekly.classList.add('b-active')
    if(name === 'monthly') btnMonthly.classList.add('b-active')
}

loadJSON()

btnDaily.addEventListener('click', () => changeData('daily'))
btnWeekly.addEventListener('click', () => changeData('weekly'))
btnMonthly.addEventListener('click', () => changeData('monthly'))