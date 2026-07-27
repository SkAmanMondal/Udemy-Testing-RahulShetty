const ExcelJs = require("exceljs");
const { test, expect } = require("@playwright/test");
const path = require("path");

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet("Sheet1");

    const output = readExcel(worksheet, searchText);

    const cell = worksheet.getCell(
        output.row + change.rowChange,
        output.column + change.colChange
    );

    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet, searchText) {
    let output = {
        row: -1,
        column: -1
    };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = {
                    row: rowNumber,
                    column: colNumber
                };
            }
        });
    });

    return output;
}

test("Upload download excel validation", async ({ page }) => {

    const textSearch = "Mango";
    const updateValue = "350";

    // tests/downloads/download.xlsx
    const filePath = path.join(
        __dirname,
        "downloads",
        "download.xlsx"
    );

    await page.goto(
        "https://rahulshettyacademy.com/upload-download-test/index.html"
    );

    // Download Excel
    const downloadPromise = page.waitForEvent("download");

    await page
        .getByRole("button", { name: "Download" })
        .click();

    const download = await downloadPromise;

    // Save inside tests/downloads
    await download.saveAs(filePath);

    // Update Mango price to 350
    await writeExcelTest(
        textSearch,
        updateValue,
        {
            rowChange: 0,
            colChange: 2
        },
        filePath
    );

    // Upload updated Excel
    await page
        .locator("#fileinput")
        .setInputFiles(filePath);

    // Find Mango row
    const desiredRow = page
        .getByRole("row")
        .filter({
            has: page.getByText(textSearch, { exact: true })
        });

    // Verify updated price
    await expect(
        desiredRow.locator("#cell-4-undefined")
    ).toContainText(updateValue);
});