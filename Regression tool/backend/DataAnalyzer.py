# DataAnalyzer.py
import pandas as pd
import numpy as np
import csv
# from sklearn.metrics import r2_score




# filepath = r"C:\Users\Evans.Siaw\Evans.Siaw\evans\evans\Downloads\FMFAudit\FMFAudit.csv"

# data = pd.read_csv(filepath,  low_memory=False) #, sep = '\t' ,engine = 'python')

async def dataFrame_creator(fileData):
    global data
    # if not fileData == "" and not fileData == None:
    #     data = pd.DataFrame(fileData["data"][1:],columns = [items for items in fileData["data"][0]]) #pd.read_csv(rf"C:\Users\Evans.Siaw\Evans.Siaw\evans\evans\Downloads\IVD performance report 2022 data sets\{filepath}", sep = '\t', low_memory=False) #, sep = '\t' ,engine = 'python')
    
    # print(list(data.columns))
    
    with open("out.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(fileData["data"])

    data = pd.read_csv(r"out.csv",  low_memory=False)
    print(data)
    return 

#column filtering and column list for front end combobox
async def get_columns():
    # cols= list(data.columns) #filtering and processing columns
    cols = data.select_dtypes([np.number]).columns.values.tolist()
    return cols

#===========Building up the the quantiles for errorbars starts===========

def quantile_ci(values, q ):
    ## simple method from
    ##  W.J. Conover (1999) Practical Nonparametric Statistics, 3rd Edition
 
    z = 1.96 #norm.ppf((1.0 + percent/100.0)/2)
    val = np.sort(values)
    n = val.size
    w = z*np.sqrt(n*q*(1.0-q))
    ni = int(max(np.ceil(n*q - w), 0))
    nj = int(min(np.ceil(n*q + w), n-1))
    # print(ni, nj)
    # # print(z)
    # print(val)
    # print([val[ni-1], val[nj]])
    return np.array([val[ni], val[nj]])       
#===========Building up the the quantiles for errorbars ends===========



#===============main processing function for the data  starts ==================


async def data_analyze(xaxis, yaxis, grouped_values, percentiles, order ):
    coeff = {}
    poly_curves = {}
    quantile_curves = {}

    
    # models.Chart(df, xaxis, yaxis, grouped_values)
    #coeff = models.Chart.analyze
    #print(coeff)
    df = data.copy()
    #filtering and grouping the dataframe according to the rounded x values
    cond = df[xaxis].notna() & df[yaxis].notna()
    df = df[cond]
    df = df.sort_values(by = [xaxis])
    # a = df2[xaxis].head()
    df[grouped_values] = np.round(df[xaxis])
    group = df.groupby(by= [grouped_values] ) #Grouping the rounded values
    
    xsize = group.size()
    xsize_values =  np.array(xsize.values)
    
    print("LIne reached")
    
    
    
    for percent in percentiles:
        quantile = group.quantile(percent / 100.0)  #creating values for each confidence level
        x = np.array(quantile.index)
        y = np.array(quantile[yaxis])
        
      
        # try:    
        model = np.polyfit(x, y, order)  # Creating a polynomial model to fit in data
       
        y_poly = np.polyval(model, x)  # Getting polynomial y coordinates for specific x values
        # model2 = np.polyfit(x, y, 1)
        # y_poly2 = np.polyval(model2, x)
        
    
        df_err = group[yaxis].apply(lambda x: quantile_ci(x, percent / 100.0))
        
     
        err = np.array(df_err)
        y_low = np.array([x[0] for x in err])
        y_high = np.array([x[1] for x in err])
        
      
        
        quantile_curves[percent] = [x, y,y - y_low, y_high - y]
    
        coeff[percent] = model
        poly_curves[percent] = [x, y_poly]
    # print(df_err)
    outpoly = []
    outquantile = []
    outerrorbars = []
    outcoeff = []
 
    

   
       
    for keys, values in poly_curves.items():
        # print(keys, " is ", values[1])
        outpoly.append((keys,{"xaxis":list(values[0]),"ypoly": list(values[1])})) #,"ypoly":y_poly[i]

        
    for keys, values in quantile_curves.items():
        # print(keys, " is ", values[1])
        outquantile.append((keys,{"y": list(values[1])})) #,"ypoly":y_poly[i]
        outerrorbars.append((keys,{"y_low":list(values[2]),"y_high": list(values[3])}))
        
    for keys, values in coeff.items():
        # print(keys, " is ", values[0])
        outcoeff.append((keys,{"coeff":list(values)})) #,"ypoly":y_poly[i] 
            

         
    # print(polynomials )
    # print("END///////")
    # print(poly_curves )
    # print("END///////")
    print(outcoeff )

    # print(order," R2 score is : ", r2_score(y, y_poly))
    # print(coeff.items())
    print(xsize)
    print(xsize_values)
    

    # df_n = df2.groupby(by=grouped_values )[yaxis].size()
    # x = group.head().index.to_numpy()
    
    # y = group.head().to_numpy()
    # weights = df_n.to_numpy()
    # poly = np.polyfit(x, y, 2, w=weights)
    # y_poly = np.polyval(poly, x),
    
    
    
    retur_data = { "outpoly" : outpoly, "outquantile" : outquantile, "outerrorbars": outerrorbars, "outcoeff": outcoeff, "outxsize": [{"xsize":xsize_values.tolist()}]} 
    return retur_data 
    
    #==========main processing function for the data  ends================
