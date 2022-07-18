const https = require('https');

const MAX_NUMBER = 85;

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  var data = ''
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    data = Buffer.from(data).toString('utf-8')
    if ( data ) {
        data = JSON.parse(data)
    }
    let parsedValue = parseData(data.data)
    let result = sortData(parsedValue)
    result = howManyNumber(result, MAX_NUMBER)
    console.log(result.length);
  });

});

function parseData(string) {
    let tmp = []
    let result = []
    tmp.push(string.match(/key\=[a-zA-Z0-9]{0,9},\sage\=[0-9]{0,3}/ig))
    for (let i = 0; i < tmp[0].length ; i++) {
        tmp[0][i] = tmp[0][i].replace(/key\=/i, '')
        tmp[0][i] = tmp[0][i].replace(/age\=/i, '')
        let item = tmp[0][i].split(', ')
        result.push({
            key: item[0],
            age: +item[1]
        })
    }
    return result
}

function sortData(listOfData) {
    return listOfData.sort((a, b) => (a.age < b.age) ? 1 : -1)
}

function howManyNumber(list, maxAge) {
    return list.filter(item=>item.age > maxAge)
}