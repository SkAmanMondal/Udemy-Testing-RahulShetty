const ExcelJS = require("exceljs");

// 1. Read Excel
async function readExcel(path, sheetName) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);

    const worksheet = workbook.getWorksheet(sheetName);

    return { workbook, worksheet };
}


// 2. Search value
function searchValue(worksheet, value) {
    let foundCell;

    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            if (cell.value === value) {
                foundCell = cell;
            }
        });
    });

    return foundCell;
}


// 3. Write / Replace value
async function writeExcel(value, replaceValue, path, sheetName) {

    const { workbook, worksheet } = await readExcel(path, sheetName);

    const cell = searchValue(worksheet, value);

    if (cell) {
        cell.value = replaceValue;
        await workbook.xlsx.writeFile(path);
        console.log(`Value Changed`);
    } else {
        console.log(`${value} not found`);
    }
}


// Only call this
writeExcel("Banana", "Apple", "download.xlsx", "Sheet1");