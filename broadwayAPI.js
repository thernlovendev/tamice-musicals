const axios = require('axios');
const BroadwayURL = 'http://3.212.194.130:3000';
const moment = require('moment');

const BroadwayInstance = axios.create({
    baseURL: BroadwayURL,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});

const broadwayAPICredentaisl = {
    username: '62741',
    password: '0N2VtPrb'
}

const broadWayAPIsTypes = {
    showBasic: 'showBasic',
    showDetails: 'showDetails',
    showPricesAvailability: 'showPricesAvailability',
    PerformancesPOHPricesAvailability: 'PerformancesPOHPricesAvailability'
}

const callBroadway = async ({ xml }) => {
    try {
        const payload = { xml };
        const { data } = await BroadwayInstance.post('/api/xml', payload);
        return { data }
    } catch (error) {
        return { error: error.message }
    }
}

const broadwayXmlAPIs = {

    showBasic: () => {
        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                <soapenv:Header>
                    <tem:AuthHeader>
                        <tem:username>${broadwayAPICredentaisl.username}</tem:username>
                        <!--Optional:-->
                        <tem:password>${broadwayAPICredentaisl.password}</tem:password>
                    </tem:AuthHeader>
                </soapenv:Header>
                <soapenv:Body>
                    <tem:ShowBasics>
                        <!--Optional:-->
                        <tem:SaleTypesCode>F</tem:SaleTypesCode>
                        <!--Optional:-->
                        <tem:ShowCityCode>NYCA</tem:ShowCityCode>
                        <tem:ShowAddedDate>2010-01-01</tem:ShowAddedDate>
                    </tem:ShowBasics>
                </soapenv:Body>
            </soapenv:Envelope>`
    },
    showDetails: () => {
        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                <soapenv:Header>
                    <tem:AuthHeader>
                        <tem:username>${broadwayAPICredentaisl.username}</tem:username>
                        <!--Optional:-->
                        <tem:password>${broadwayAPICredentaisl.password}</tem:password>
                    </tem:AuthHeader>
                </soapenv:Header>
                <soapenv:Body>
                    <tem:ShowDetails>
                        <tem:SaleTypesCode>F</tem:SaleTypesCode>
                        <tem:LastChangeDate>1980-01-01</tem:LastChangeDate>
                        <tem:ShowCodes>CHICAGO</tem:ShowCodes>
                        <tem:ShowCityCode>NYCA</tem:ShowCityCode>
                    </tem:ShowDetails>
                </soapenv:Body>
                </soapenv:Envelope>
                `
    },
    showPricesAvailability: () => {
        const dateBegins = moment().add('3', 'days').format('YYYY-MM-DD');
        const dateEnds = moment(dateBegins).add(1, 'days').format('YYYY-MM-DD');
        console.log("===", { dateBegins, dateEnds })

        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header>
      <tem:AuthHeader>
        <tem:username>${broadwayAPICredentaisl.username}</tem:username>
            <!--Optional:-->
        <tem:password>${broadwayAPICredentaisl.password}</tem:password>
      </tem:AuthHeader>
   </soapenv:Header>
   <soapenv:Body>
      <tem:PerformancesPOHPricesAvailability>
         <!--Optional:-->
         <tem:SaleTypesCode>F</tem:SaleTypesCode>
         <!--Optional:-->
         <tem:ShowCityCode>NYCA</tem:ShowCityCode>
         <tem:DateBegins>${dateBegins}</tem:DateBegins>
         <tem:DateEnds>${dateEnds}</tem:DateEnds>
         <!--Optional:-->
         <tem:OneShowCode>phantom</tem:OneShowCode>
         <!--Optional:-->
         <tem:AvailabilityType>F</tem:AvailabilityType>
         <!--Optional:-->
         <tem:BestSeatsOnly>1</tem:BestSeatsOnly>
         <tem:LastChangeDate>2000-01-01</tem:LastChangeDate>
      </tem:PerformancesPOHPricesAvailability>
   </soapenv:Body>
</soapenv:Envelope>
`
    },
    PerformancesPOHPricesAvailability: () => {
        return `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
            <soapenv:Header>
            <tem:AuthHeader>
                <tem:username>${broadwayAPICredentaisl.username}</tem:username>
                <!--Optional:-->
                <tem:password>${broadwayAPICredentaisl.password}</tem:password>
            </tem:AuthHeader>
            </soapenv:Header>
            <soapenv:Body>
            <tem:PerformancesPOHPricesAvailability>
                <!--Optional:-->
                <tem:SaleTypesCode>F</tem:SaleTypesCode>
                <!--Optional:-->
                <tem:ShowCityCode>NYCA</tem:ShowCityCode>
                <tem:DateBegins>2014-09-04</tem:DateBegins>
                <tem:DateEnds>2014-09-04</tem:DateEnds>
                <!--Optional:-->
                <tem:OneShowCode>phantom</tem:OneShowCode>
                <!--Optional:-->
                <tem:AvailabilityType>F</tem:AvailabilityType>
                <!--Optional:-->
                <tem:BestSeatsOnly>1</tem:BestSeatsOnly>
                <tem:LastChangeDate>2000-01-01</tem:LastChangeDate>
            </tem:PerformancesPOHPricesAvailability>
            </soapenv:Body>
        </soapenv:Envelope>
        `;
    },
}



module.exports = { callBroadway, broadwayXmlAPIs, broadWayAPIsTypes }