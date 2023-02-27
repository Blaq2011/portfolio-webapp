from xml.etree import ElementTree as ET

class export_xml():
    

    
    def build_simple_xml(coeff, xaxis, yaxis,xstart, xend):#, to_file=True):
        chart = ET.Element("chart")
    
        chart.set("ycolumn", f"Fetus.{yaxis}")
        chart.set("xcolumn", f"Fetus.{xaxis}")
        chart.set("ytable", "Fetus")
        chart.set("xtable", "Exam")
        chart.set("dnaXtitle", "213")
        chart.set("reference", "astraia chart calculator")
        chart.set("xend", str(xend))
        chart.set("xstart", str(xstart))
        chart.set("type", "Polynomial")
        chart.set("name", f"{yaxis}")
        chart.set("id", "2000")


        def dataChartCreator(coefficientIndex):
            data = ET.SubElement(chart, "data")
            n = len(coeff[0][coefficientIndex])
            for i in range(n):
                key = "c%d" % (n-1-i,)
                data.set(key, str(coeff[0][coefficientIndex][i]))
            return data
         
        def curveChartCreator(curve_dict):    
            curve = ET.SubElement(chart, "curve")
            for key in curve_dict:
                curve.set(key, curve5_dict[key])
             
            return curve


                 
        curve5_dict = {"n" : "2" , "label" : "5%" , "sd" : "0" }
        curve50_dict = {"n" : "1" ,"sd" : "0" }
        curve95_dict = {"n" : "3" , "label" : "95%" , "sd" : "0" }


        dataChartCreator(0) #data5 
        dataChartCreator(1) #data50
        dataChartCreator(2) #data95
        
        curveChartCreator(curve5_dict) #curve5 
        curveChartCreator(curve50_dict)  #curve50 
        curveChartCreator(curve95_dict)  #curve95 
        

        
        
        
        tree = ET.ElementTree(chart)
        tree.write("ChartXml.xml")




if __name__ == "__main__":
    export_xml().build_simple_xml()
    
        # [1.1, 0.6, 0.67] = 1.1*x^2 + 0.6*x + 0.67