const dotenv = require('dotenv');
dotenv.config();
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const config = require('../../config');
const colours = require('../colours');

const getRows = async (season) => {
    try {
        const doc = new GoogleSpreadsheet('1Khj2u55fpyr7pjKxJKu8HQzmj6UD5x2fTAxpsme0wcM');
        await promisify(doc.useServiceAccountAuth)(config);
        const info = await promisify(doc.getInfo)();

        const sheet = info.worksheets.reduce((acc, worksheet, i) => {
            if (worksheet.title.toLowerCase() === season.toLowerCase()) {
                acc = worksheet;
            }
            return acc;
        }, {});

        const rows = await promisify(sheet.getRows)({
            "offset": 1,
            "limit": 300
        });        
        return rows;

    } catch (err) {
        console.log('accessSpreadsheet error', err);
    }
}

const updateSpreadsheet = async (rows, reqBody) => {
    try {
        rows.forEach(async row => {
            if (row.position === reqBody.position) {
                Object.keys(reqBody).forEach(key => {
                    if (reqBody.removePlant) {
                        // remove all values, then put position value back so it still renders as an empty spot on the grid next time round
                        row[key] = '';
                        row.position = reqBody.position;
                    } else if (reqBody[key]) {
                        // e.g. if (reqBody.colour) {row.colour = reqBody.colour};
                        row[key] = reqBody[key]
                    }
                });
                await row.save();
            }
        })
        return 
        
    } catch (err) {
        console.log('updateSpreadsheet error', err);
    }
}

const getPlantData = rows => {
    try {
        const values = rows.reduce((acc, row) => {
            if (row.position) {
                acc.push({
                    isDecking: `${row.position}`.includes('17') || `${row.position}`.includes('18') || `${row.position}`.includes('19'),
                    position: row.position,
                    commonName: row.commonname,
                    latinName: row.latinname,
                    perennialAnnual: `${row.perennialannual}`.substr(0, 1),
                    plantedDate: row.planteddate,
                    floweringPeriod: row.floweringperiod,
                    colour: row.colour,
                    image: row.image,
                    link: row.link,
                    isFilled: !!row.filled,
                    notes: row.notes
                });
            }
            return acc;
        }, []);
        values.forEach(value => {
            if (value.position === 'R5') {
            }
        })
        return values;
    } catch (err) {
        console.log('getPlantData error', err);
    }
}

module.exports = async (req, res, seasonName) => {
    try {
        const seasonPath = req.path.substr(1); // e.g. 'summer19'
        const rows = await getRows(seasonPath);
        let gridItems;
        if (req.method === "POST") {
            await updateSpreadsheet(rows, req.body);
            const updatedRows = await getRows(seasonPath)
            gridItems = await getPlantData(updatedRows);
        } else {
            gridItems = await getPlantData(rows);
        }
        return res.render('landing', { gridItems, seasonName, seasonPath, colours });
    } catch (err) {
        console.log('render error', err);
    };
};