from xml.etree import ElementTree as ET

class export_xml():
    
    def build_simple_xml(self, coeff, xstart, xend):#, to_file=True):
        chart = ET.Element("chart")
        chart.set("id", "2000")
        chart.set("name", "NT")
        chart.set("type", "Polynomial")
        chart.set("xstart", str(xstart))
        chart.set("xend", str(xend))
        chart.set("reference", "astraia chart calculator")
        chart.set("dnaXtitle", "213")
        chart.set("xtable", "Exam")
        chart.set("ytable", "Fetus")
        chart.set("xcolumn", "Fetus.CRL")
        chart.set("ycolumn", "Fetus.NT")



        data_median = ET.SubElement(chart, "data")
        n = len(coeff[1])
        for i in range(n):
            key = "c%d" % (n-1-i,)
            data_median.set(key, str(coeff[1][i]))
            
            
        data5 = ET.SubElement(chart, "data")
        n = len(coeff[0])
        for i in range(n):
            key = "c%d" % (n-1-i,)
            data5.set(key, str(coeff[0][i]))
            
        data95 = ET.SubElement(chart, "data")
        n = len(coeff[2])
        for i in range(n):
            key = "c%d" % (n-1-i,)
            data95.set(key, str(coeff[2][i]))


        
        

        curve50 = ET.SubElement(chart, "Curve")
        curve50_dict = {"n" : "1" ,"sd" : "0" }
        
        for key in curve50_dict:
            curve50.set(key, curve50_dict[key])
       
        
        curve5 = ET.SubElement(chart, "Curve")
        curve5_dict = {"n" : "2" , "label" : "5%" , "sd" : "0" }
        
        for key in curve5_dict:
            curve5.set(key, curve5_dict[key])
       
        
        curve95 = ET.SubElement(chart, "Curve")
        curve95_dict = {"n" : "3" , "label" : "95%" , "sd" : "0" }
        
        for key in curve5_dict:
            curve95.set(key, curve95_dict[key])
       
        

        
        

        
        tree = ET.ElementTree(chart)
        # ET.indent(tree, space="  ", level=0)
        #if to_file:
        tree.write("simple_example.xml")
        # else:
        #     return tree.tostring(encoding='utf-8' )     # mgoogle how to return a string






if __name__ == "__main__":
    export_xml().build_simple_xml()
    
        # [1.1, 0.6, 0.67] = 1.1*x^2 + 0.6*x + 0.67