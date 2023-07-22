const xml2js = require('xml2js');

const generateKeyPair = (dataObject) => {
    const objectKeys = Object.keys(dataObject);
    const result = {};
    objectKeys.forEach(key => result[key] = dataObject[key][0]?.trim() || '')
    return result;
}

const jsonFormator = {
    showBasic: (data) => {
        const Table = data[0]['ShowBasicsResponse'][0]['ShowBasicsResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['Table'] || [];
        return Table.map(row => generateKeyPair(row));
    },
    showDetails: (data) => {
        const Table = data[0]['ShowDetailsResponse'][0]['ShowDetailsResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['Table'] || [];
        return Table.map(row => generateKeyPair(row));
    },
    showPricesAvailability: (data) => {
        const Table = data[0]['PerformancesPOHPricesAvailabilityResponse'][0]['PerformancesPOHPricesAvailabilityResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['Table'] || [];
        return Table.map(row => generateKeyPair(row));
    },
    PerformancesPOHPricesAvailability: (data) => {
        const Table = data[0]['PerformancesPOHPricesAvailabilityResponse'][0]['PerformancesPOHPricesAvailabilityResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['Table'] || [];
        return Table.map(row => generateKeyPair(row));
    },
}

const convertXmlToJson = (xml, type) => {
    return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser();
        parser.parseString(xml, (err, result) => {
            if (err) {
                console.error(err);
                reject(err)
            } else {
                const data = result['s:Envelope']['s:Body'] || [];
                const formatedData = jsonFormator[type](data);
                resolve(formatedData)
            }
        });
    })
}

module.exports = { convertXmlToJson };