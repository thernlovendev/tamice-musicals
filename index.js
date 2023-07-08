const { xml, showDetails } = require('./data.json');
const { convertXmlToJson, } = require('./helperFunctions');
const { broadWayAPIsTypes, broadwayXmlAPIs, callBroadway } = require('./broadwayAPI')

const getShowBasic = async () => {
    try {
        const { data: apiData } = await callBroadway({ xml: broadwayXmlAPIs.showBasic() });
        const data = await convertXmlToJson(apiData.xml, broadWayAPIsTypes.showBasic);
        return data;
    } catch (error) {
        throw error;
    }
}

const getShowDetails = async () => {
    try {
        const { data: apiData } = await callBroadway({ xml: broadwayXmlAPIs.showDetails() });
        const data = await convertXmlToJson(apiData.xml, broadWayAPIsTypes.showDetails);
        return data;
    } catch (error) {
        throw error;
    }
}

const getShowPricesAvailability = async () => {
    try {
        console.log("=broadwayXmlAPIs.showPricesAvailability()", broadwayXmlAPIs.showPricesAvailability()
        )
        const { data: apiData } = await callBroadway({ xml: broadwayXmlAPIs.showPricesAvailability() });
        const data = await convertXmlToJson(apiData.xml, broadWayAPIsTypes.showPricesAvailability);
        console.log('----apiData', data)
        // return data;
    } catch (error) {
        console.log("=rr", error)
        throw error;
    }
}

// getShowDetails()

// getShowBasic()

getShowPricesAvailability()