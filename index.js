const { xml, showDetails } = require('./data.json');
const { convertXmlToJson, } = require('./helperFunctions');
const { broadWayAPIsTypes, broadwayXmlAPIs, callBroadway } = require('./broadwayAPI')
const database = require('./sqlConnection');

const getShowBasic = async () => {
    try {
        const { data: apiData } = await callBroadway({ xml: broadwayXmlAPIs.showBasic() });
        const data = await convertXmlToJson(apiData.xml, broadWayAPIsTypes.showBasic);
        // console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}

const getShowDetails = async () => {
    try {
        const { data: apiData } = await callBroadway({ xml: broadwayXmlAPIs.showDetails() });
        const data = await convertXmlToJson(apiData.xml, broadWayAPIsTypes.showDetails);
        console.log(data);
        return data
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

const fetchMusicalsAndInsertToTickets = async () => {
    let data = await getShowBasic()
    // console.log(data);

    data.forEach(element => {
        let query = `INSERT INTO tickets (title_en, title_kr, ticket_template, ticket_type, status, currency, product_code, additional_price_type, additional_price_amount, additional_price_image, show_in_schedule_page, announcement, company_id, city_id, deleted_at, created_at, updated_at, out_of_stock_alert_adult, out_of_stock_alert_child) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?, ?,?,?,?,?,?,?);`;
    
        // Creating queries
        database.query(query, [element.ShowCode, element.ShowCode, '', 'Musicals','', '', '', '', '0', null, '0', '', '1', '33', null, null, null, null, null], (err, rows) => {
            if (err) throw err;
            console.log("Row inserted with id = " + rows.insertId);
        });
    });
    
};

const fetchSeatAndUpdateToTickets = async () => {
    try {
        const { data: apiData } = await callBroadway({ xml: broadwayXmlAPIs.PerformancesPOHPricesAvailability() });
        console.log(apiData);
        // const data = await convertXmlToJson(apiData.xml, broadWayAPIsTypes.PerformancesPOHPricesAvailability);
        // return data
    } catch (error) {
        throw error;
    }
}

getShowDetails()

// getShowBasic()

// getShowPricesAvailability()

// fetchMusicalsAndInsertToTickets()

// fetchSeatAndUpdateToTickets()