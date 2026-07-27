const ExcelJS = require("exceljs");
const {test, expect} = require("@playwright/test");
const path = require("path");

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


test("Upload Download Excel Validation", async({page})=>
{
        await page.goto(
        "https://rahulshettyacademy.com/upload-download-test"
    );

    // Path relative to the current test file
    const filePath = path.join(__dirname, "downloads", "download.xlsx");

    // Start waiting for download BEFORE clicking
    const downloadPromise = page.waitForEvent("download");

    await page.getByRole("button", { name: "Download" }).click();

    const download = await downloadPromise;

    // Save downloaded file
    await download.saveAs(filePath);

    // Update Excel
    await writeExcel(
        "Apple",
        "Iphone",
        filePath,
        "Sheet1"
    );

    // Upload modified Excel
    await page.locator("#fileinput").setInputFiles(filePath);
    await page.pause();
});