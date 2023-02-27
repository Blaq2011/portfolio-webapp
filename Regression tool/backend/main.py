# main.py
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
import DataAnalyzer 
from xmlReporter import export_xml
from pydantic import BaseModel


app = FastAPI()


origs = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origs,
    allow_methods = ["*"],
    allow_headers = ["*"]     
)

#============Getting and post filename to file reader in Data Analyser file starts============
class selectedFile(BaseModel):  #saves the column selected
    fileData: dict

async def read_csv(fileData):
    file = {}
    for keys, values in fileData.items():
        # print(keys, " is ", values)
        file = values
    await DataAnalyzer.dataFrame_creator(file)
    # print(file["data"])
    return 

@app.post("/filepath-collector/")
async def filepath_collector(File: selectedFile):
    await read_csv(File.dict())
    # print(File.dict())
    return File

#============Getting and post filename to file reader in Data Analyser file starts============

@app.get("/column-data/") #automatically sends available numeric columns from out data set to the frontend
async def column_data():
    cols= await DataAnalyzer.get_columns()
    return {"cols": cols}


#==========processing selected column and posting for data processing start==========
class selectedColumns(BaseModel):  #saves the column selected
    xcolumnselected: str 
    ycolumnselected: str
    
async def coo(v):
    global colSel
    colSel = []
    for keys, values in v.items():
        print(keys, " is ", values)
        colSel.append(values) 
    print("colsel = ", colSel) 
    return colSel

@app.post("/submit-columns/")
async def submit_columns(SelectedCols : selectedColumns):
    await coo(SelectedCols.dict())
    return SelectedCols    
#============processing selected column and posting for data processing end============



#===========posting prepared data to frontend starts===========
@app.get("/get-data/")
async def get_data():
    firstorder = await DataAnalyzer.data_analyze(colSel[0], colSel[1], f"{colSel[0]} rounded", [5,50, 95], 1)
    secondorder = await DataAnalyzer.data_analyze(colSel[0], colSel[1], f"{colSel[0]} rounded", [5,50, 95], 2)
    thirdorder = await DataAnalyzer.data_analyze(colSel[0], colSel[1], f"{colSel[0]} rounded", [5,50, 95], 3)
    fourthorder = await DataAnalyzer.data_analyze(colSel[0], colSel[1], f"{colSel[0]} rounded", [5,50, 95], 4)
    return {
        "firstorder":firstorder, 
        "secondorder":secondorder, 
        "thirdorder":thirdorder,
        "fourthorder":fourthorder
        }


#============posting prepared data to frontend ends===============

class selectedOrderExport(BaseModel):  #saves the column selected
    selected: list
    xstart: int
    xend: int
    


async def xml_creator(c):
    coeff = []
    
    for keys, values in c.items():
        # print(keys, " is ", values)
        coeff.append(values) 

    
    xstart = coeff[-2]
    xend = coeff[-1]
    print("coeff = ", coeff,"xstart = ", xstart,"xend = ", xend  )
    xmlfile = export_xml.build_simple_xml(coeff, colSel[0], colSel[1], xstart, xend) #1 and 2 at the end are xstart and xend respectively(Test)
    print("Exported")
    return xmlfile


@app.post("/graph-export/")
async def graph_export(SelectedCoeff : selectedOrderExport):
    await xml_creator(SelectedCoeff.dict())
    # print(SelectedCoeff)
    return SelectedCoeff    
#============processing selected column and posting for data processing end============

    
# @app.get("/Xml-table/") #automatically sends available numeric columns from out data set to the frontend
# async def xml_table():
   






































