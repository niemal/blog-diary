import fs from 'fs'
import path from 'path'

const entriesDirectory = path.join(process.cwd(), 'diary-entries')

const stamp = (date) => {
    if (date === undefined) return '';
    return date.getDate().toString() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
};

const monthStamp = (date) => {
    if (date === undefined) return '';
    return date.getMonth() + '/' + date.getFullYear();
};

const buildMonths = (entries) => {
    let months = [];
    for (let k = 0; k < entries.length; k++) {
        let entry = entries[k];
        let dateEntry = new Date(entry[0]);

        let exists = -1;
        for (let  i = 0; i < months.length; i++) {
            let dateMonth = new Date(months[i][1], months[i][0], 1);
            if (monthStamp(dateMonth) === monthStamp(dateEntry)) {
                exists = i;
                break;
            } 
        }

        if (exists < 0) {
            let days = [];
            let iterDay = new Date(dateEntry.getFullYear(), dateEntry.getMonth(), 1);
            let now = new Date();
            let future = false;

            while (iterDay.getMonth() === dateEntry.getMonth()) {
                if (iterDay > now)
                    future = true;
                else
                    future = false;
                
                if (iterDay.getDate() === dateEntry.getDate())
                    days.push([iterDay.getDate(), entry[1], future]);
                else
                    days.push([iterDay.getDate(), [], future]);
                iterDay.setDate(iterDay.getDate() + 1);
            }
            months.push([dateEntry.getMonth(), dateEntry.getFullYear(), days]);
        } else {
            for (let i = 0; i < months[exists][2].length; i++) {
                if (months[exists][2][i][0] === dateEntry.getDate()) {
                    months[exists][2][i][1] = entry[1];
                    break;
                }
            }
        }
    }

    if (months.length === 0) {
        let now = new Date();
        let future = false;
        let days = [];
        
        let iterDay = new Date(now.getFullYear(), now.getMonth(), 1);
        while (iterDay.getMonth() === now.getMonth()) {
            if (iterDay > now)
                future = true;
            else
                future = false;

            days.push([iterDay.getDate(), [], future]);
            iterDay.setDate(iterDay.getDate() + 1);
        }
        months.push([now.getMonth(), now.getFullYear(), days]);
    }

    return months;
};

export function getDiaryEntries() {
    let entries = [];
    let fileNames = fs.readdirSync(entriesDirectory);
  
    let tmpDay = [];
    let tmpDate = {};
    fileNames.forEach(name => {
        let fullPath = `${entriesDirectory}/${name}`;
        const lines = fs.readFileSync(fullPath, 'UTF-8').split(/\r?\n/);
        let date = fs.statSync(fullPath).birthtime;

        let dayStamp = stamp(date);
        if (!tmpDay.includes(dayStamp) || tmpDate[dayStamp] < date) {
            tmpDate[dayStamp] = date;
            entries.push([date.getTime(), lines]);
        }
    });

    return {
        entries: buildMonths(entries.sort((a, b) => b[0] - a[0])),
        today: stamp(new Date(entries[0][0])) === stamp(new Date()),
        todaysEntry: stamp(new Date(entries[0][0])) === stamp(new Date()) ? [stamp(new Date(entries[0][0])), entries[0][1]] : null
    };
};