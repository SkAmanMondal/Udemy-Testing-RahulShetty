const excelJs = require('exceljs');

async function printingEverything(){
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile("download.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber)=>{
        row.eachCell((cell, colNumber)=>{
            console.log(cell.value);
        })
    })
}

async function printingTheDesireQuerdinates(){
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile("download.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber)=>{
        row.eachCell((cell, colNumber)=>{
            
            if(cell.value === "Apple"){
                console.log(rowNumber, colNumber); //It will print the "Apple" querdinates iif found
            }
        })
    })
}

async function findAndReplaceValue(){
    let fullCell;
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile("download.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber)=>{
        row.eachCell((cell, colNumber)=>{
            
            if(cell.value === "Apple"){

                fullCell = cell;
                
            }
        })
    })
    
    if(fullCell){
        fullCell.value = "Banana"; //chnaging value
        await workbook.xlsx.writeFile("download.xlsx"); // saving value
        console.log("Cell Value Changed");
    }else{
        console.log("Cell not found");
    }
}

// printingEverything();
// printingTheDesireQuerdinates();
findAndReplaceValue();
