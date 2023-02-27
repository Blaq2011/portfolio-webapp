import numpy as np
# plt.use('TkAgg')
import pandas as pd

#from scipy.stats import norm

def read_csv(file_name, select_dialog):
    if not file_name == "" and not file_name == None:
        data = pd.read_csv(file_name)#,  sep='\\t',lineterminator='\\r', engine='python', header='infer')
        cols = data.select_dtypes([np.number]).columns
        xaxis, yaxis, grouped_values = select_dialog(cols.tolist())
        print("columns selected are : ", xaxis, yaxis, grouped_values)
        return Chart(data, xaxis, yaxis, grouped_values)
        
        
    else:
        return None

           
def quantile_ci(self,values, q ):
    ## simple method from
    ##  W.J. Conover (1999) Practical Nonparametric Statistics, 3rd Edition
 
    z = 1.96 #norm.ppf((1.0 + percent/100.0)/2)
    val = np.sort(values)
    n = val.size
    w = z*np.sqrt(n*q*(1.0-q))
    ni = int(max(np.ceil(n*q - w), 0))
    nj = int(min(np.ceil(n*q + w), n-1))
    # print(ni, nj)
    #print(z)
    return np.array([val[ni], val[nj]])

class Curve(object):

    def __init__(self, percent=0, x=[], y=[],
                 err_low=[], err_high=[]):
        self.percent = percent
        self.x = x
        self.y = y
        self.err_low = err_low
        self.err_high = err_high
        
    def __str__(self):
        out = []
        out.append("Curve object:")
        out.append("%f%% percent" % (self.percent,))
        for i in range(len(self.x)):
            out.append("x, y:\t%f\t%f" % 
                       (self.x[i], self.y[i]))
            
            
class Chart(object):

    def __init__(self, data, xaxis, yaxis, grouped_values):
        self.data = data  # the original data which we do not modify
        self.xaxis = xaxis
        self.yaxis = yaxis
        self.grouped_values = grouped_values
        self.xstart = 0.0
        self.xend = 0.0 
        self.order = 0
        self.percentiles = [5, 50, 95]
        
        self._clear()  # this creates and resets all attributes we calculate later
        
    def _clear(self):
        if isinstance(self.data, pd.DataFrame):
            df = self.data.copy()
            cond = df[self.xaxis].notna() & df[self.yaxis].notna()
            self.df = df[cond]

        else:
            self.data = None
            self.df = None
        
        self.polynomials = {}
        self.poly_curves = {}
        self.quantile_curves = {}            
            
            

    def analyze(self):
        
        self._clear()
        if not isinstance(self.data, pd.DataFrame):
            return
            
                


        self.df[self.grouped_values] = np.round(self.df[self.xaxis])  # Rounding values on the x axis 
        group = self.df.groupby(by=[self.grouped_values])
        coeff = []
        
        for percent in self.percentiles:
            quantile = group.quantile(percent / 100.0)  # Grouping the rounded values
            x = np.array(quantile.index)
            y = np.array(quantile[self.yaxis])
            
       
            # try:    
            model = np.polyfit(x, y, self.order)  # Creating a polynomial figure to fit in data
            y_poly = np.polyval(model, x)  # Getting polynomial y coordinates for specific x values
            coeff.append(model)

            df_err = group[self.yaxis].apply(lambda x: quantile_ci(self,x, percent / 100.0))
    
            err = np.array(df_err)
            y_low = np.array([x[0] for x in err])
            y_high = np.array([x[1] for x in err])
            
            self.quantile_curves[percent] = [x, y, y - y_low, y_high - y]
            self.polynomials[percent] = model
            self.poly_curves[percent] = [x, y_poly]
            # except IndexError:
            #         print("IndexError")
            
        return coeff

    def get_quantile_curve(self, percent):
        x, y, err_low, err_high = self.quantile_curves[percent]
        return Curve(percent, x, y, err_low, err_high)

    def get_poly_curve(self, percent):
        x, y = self.poly_curves[percent]
        return Curve(percent, x, y)
    
    # def get_polynomial(self, percent):
    #     return self.polynomials[percent]
    
    def set_range(self, xstart, xend):
        self.xstart, self.xend = xstart, xend
        self.analyze()
    
    def set_order(self, order):
        self.order = order
        self.analyze()
    
    def set_percentiles(self, percentiles):
        self.percentiles = percentiles
        self.analyze()