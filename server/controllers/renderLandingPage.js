const dotenv = require('dotenv');
dotenv.config();
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const config = require('../../config');

module.exports = async (req, res, seasonName) => {
    try {
        const seasonPath = req.path.substr(1); // e.g. 'summer19'
        if (req.method === "POST") {
            console.log('==================');
            console.log('req.body', req.body);
            console.log('==================');
            
            await updateSpreadsheet(req.body);
        }
        const gridItems = await accessSpreadsheet(seasonPath);
        return res.render('landing', { gridItems, seasonName, seasonPath });
    } catch (err) {
        console.log('==================');
        console.log('render error', err);
        console.log('==================');        
    };
};

//TODO dry out this and accessSS func
async function updateSpreadsheet(reqBody) {
    try {
        const doc = new GoogleSpreadsheet('1Khj2u55fpyr7pjKxJKu8HQzmj6UD5x2fTAxpsme0wcM');
        await promisify(doc.useServiceAccountAuth)(config);
        const info = await promisify(doc.getInfo)();

        // const sheet = info.worksheets.reduce((acc, worksheet, i) => {
        //     if (worksheet.title.toLowerCase() === season.toLowerCase()) {
        //         acc = worksheet;
        //     }
        //     return acc;
        // }, {});
        const sheet = info.worksheets.reduce((acc, worksheet, i) => {
            if (worksheet.title === 'SUMMER19A') { //TODO
                acc = worksheet;
            }
            return acc;
        }, {});

        const rows = await promisify(sheet.getRows)({
            "offset": 1,
            "limit": 300
        });

        rows.forEach(row => {
            if (row.position === reqBody.position) {
                if (reqBody.colour) {
                    row.colour = reqBody.colour;
                }
                if (reqBody.commonName) {
                    row.commonname = reqBody.commonName;
                }
                if (reqBody.latinName) {
                    row.latinname = reqBody.latinName;
                }
                if (reqBody.perennialAnnual) {
                    row.perennialannual = reqBody.perennialAnnual;
                }
                if (reqBody.plantedDate) {
                    row.planteddate = reqBody.plantedDate;
                }
                if (reqBody.image) {
                    row.image = reqBody.image;
                }
                if (reqBody.link) {
                    row.link = reqBody.link;
                }
                if (reqBody.notes) {
                    row.notes = reqBody.notes;
                }
                row.save();
            }
        })

    } catch (err) {
        console.log('==================');
        console.log('updateSpreadsheet error', err);
        console.log('==================');    
    }

}

async function accessSpreadsheet(season) {
    try {
        const doc = new GoogleSpreadsheet('1Khj2u55fpyr7pjKxJKu8HQzmj6UD5x2fTAxpsme0wcM');
        await promisify(doc.useServiceAccountAuth)(config);
        const info = await promisify(doc.getInfo)();

        // const sheet = info.worksheets.reduce((acc, worksheet, i) => {
        //     if (worksheet.title.toLowerCase() === season.toLowerCase()) {
        //         acc = worksheet;
        //     }
        //     return acc;
        // }, {});
        const sheet = info.worksheets.reduce((acc, worksheet, i) => {
            if (worksheet.title === 'SUMMER19A') {
                acc = worksheet;
            }
            return acc;
        }, {});

        const rows = await promisify(sheet.getRows)({
            "offset": 1,
            "limit": 300
        });

        const values = rows.reduce((acc, row) => {
            if (row.position) {
                acc.push({
                    isDecking: `${row.position}`.includes('17') || `${row.position}`.includes('18') || `${row.position}`.includes('19'),
                    position: row.position,
                    commonName: row.commonname,
                    latinName: row.latinname,
                    perennialAnnual: `${row.perennialannual}`.substr(0,1),
                    plantedDate: row.planteddate,
                    floweringPeriod: row.floweringperiod,
                    colour: row.colour,
                    image: row.image,
                    link: row.link,
                    notes: row.notes
                });
            }
            return acc;
        }, []);

        return values;
    } catch (err) {
        console.log('==================');
        console.log('accessSpreadsheet error', err);
        console.log('==================');
    }
}