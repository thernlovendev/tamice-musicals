const { xml, showDetails } = require('./data.json');
const { convertXmlToJson, } = require('./helperFunctions');
const { broadWayAPIsTypes, broadwayXmlAPIs, callBroadway } = require('./broadwayAPI')
const database = require('./sqlConnection');

const getShowBasic = async () => {
    try {
        const { data: apiData } = await callBroadway({ xml: broadwayXmlAPIs.showBasic() });
        const data = await convertXmlToJson(apiData.xml, broadWayAPIsTypes.showBasic);
        console.log(data);
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
        const data = await convertXmlToJson(apiData.xml, broadWayAPIsTypes.PerformancesPOHPricesAvailability);
        // console.log(data);
        //handle insert or update data
        data.forEach(element => {
            //check exist row
            let query_exist = `SELECT * FROM product_seats WHERE product_id = ${element.ProductId}`
            database.query(query_exist, (err, results) => {
                if (err) {
                    console.log('Error');
                    return;
                }
                if(results && results.length == 0) {
                    let query_insert = `INSERT INTO product_seats (product_id, product_code, product_date, product_time, description, price, regular_price, currency, bestseats, availability, ticket_print_date, base_price, facility_fee, supplier_fee, service_charge) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
                    // Creating queries
                    database.query(query_insert, [element.ProductId, element.ProductCode, element.ProductDate,element.ProductTime,element.Description,element.Price,element.RegularPrice,element.Currency,element.BestSeats,element.Availability,element.ETicketPrintDate,element.BasePrice,element.FacilityFee,element.SupplierFee,element.ServiceCharge], (err, rows) => {
                        if (err) throw err;
                    });
                }
            })
        });
    } catch (error) {
        throw error;
    }
}

// getShowDetails()

// getShowBasic()

// getShowPricesAvailability()

// fetchMusicalsAndInsertToTickets()

fetchSeatAndUpdateToTickets()