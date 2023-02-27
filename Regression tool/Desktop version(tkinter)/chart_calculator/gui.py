from tkinter import *
import tkinter as tk
from tkinter import ttk
from tkinter import filedialog as fd
from tkinter.messagebox import showinfo
from chart_calculator.calculator import read_csv
from chart_calculator.xml import export_xml
from chart_calculator import plot
from chart_calculator.Config import ConfigClass
# from chart_calculator.logs import logfiles



class App(tk.Tk):
    def __init__(self, width=800, height=600):
        super().__init__() 
        
        self.chart = None
        self.orders = {'First Order' : 1,
                       'Second Order' : 2,
                       "Third Order" : 3, 
                       "Fourth Order" : 4}
        
        self.centiles = { 5: "red",
                                50: "green",
                                95: "red"}
        
        # self.xaxis, self.yaxis = " ", " "           #'"CRL (mm)", "NT (mm)"
        # self.grouped = " " #"CRL rounded"
        self.errorbars = tk.BooleanVar()
        self.firstentry = tk.IntVar()
        self.secondentry = tk.IntVar()
        self.selected_order = tk.StringVar()
        self.selected_column_xaxis = tk.StringVar()
        self.selected_column_yaxis = tk.StringVar()
        # self.grouped_column_yaxis = self.selected_column_yaxis.get() + " rounded"
        
        self.filename = " "
        
        self.resizable(False, False)  # fixed size, not resizable
        # we want to center the window, so we need the size of the screen
        screen_w = self.winfo_screenwidth()
        screen_h = self.winfo_screenheight()
        x = int((screen_w / 2) - (width / 2))
        y = int((screen_h / 2) - (height / 2))
        self.geometry("{}x{}+{}+{}".format(width, height, x, y))       
        
 
 #Opens, selects and reads the file to be used 
    def select_file(self):
        
        self.filename = fd.askopenfilename()
    
        print(self.filename)
     
        # setting an if not statement to read the file only when opened
        if not self.filename == "":
            try:
                self.chart = read_csv(self.filename, self.select_dialog)
                self.store_config()
                
            except Exception as e:
            
                msg = "Reading file\n{0}\nfailed\n\n{1}".format(self.filename, e)
                tk.messagebox.showerror("File import", msg)
            
        
        return self.filename
        

#creating a dialog to select numeric columns used for chart
    def select_dialog(self, cols):
        print(cols)
        
        # open now a dialog with  2 comboboxes, both filled with the col list and get back what the user selected
    
      #dialog
        global pop
        pop = Toplevel()
        pop.title("Select Axes")
        pop.geometry("250x200")
        
       #combo box for dialog   
        ttk.Label(pop, text="Xaxis:").pack(expand=True)
        self.selected_column_xaxis = tk.StringVar()
        self.column_combo_xaxis = ttk.Combobox(pop, textvariable=  self.selected_column_xaxis, state='readonly')
        self.column_combo_xaxis.pack(expand=False)
        self.column_combo_xaxis['values']= cols
        self.column_combo_xaxis.current([6])

        
        ttk.Label(pop, text="Yaxis:").pack(expand=True)
        self.selected_column_yaxis = tk.StringVar()
        self.column_combo_yaxis = ttk.Combobox(pop, textvariable=  self.selected_column_yaxis, state='readonly')
        self.column_combo_yaxis.pack(expand=False)
        self.column_combo_yaxis['values']= cols
        self.column_combo_yaxis.current([7])

        
        #submit button
        submit_button = ttk.Button(pop, text='Submit' , command = lambda: self.submit_dialog())
        submit_button.pack(expand=True)
        
        
        return  self.selected_column_xaxis.get() , self.selected_column_yaxis.get(), self.selected_column_yaxis.get() + " rounded"
    
               
 #Submit und refresh to update the axes selected  
    def refresh_columns(self, cols):
        return self.selected_column_xaxis.get() , self.selected_column_yaxis.get(), self.selected_column_yaxis.get() + " rounded"
    
    def submit_dialog(self):
        self.selected_column_xaxis.get() , self.selected_column_yaxis.get(), self.selected_column_yaxis.get() + " rounded"
        # pop.destroy()
        #print("Columns Selected: ", a, b, c)
        self.chart = read_csv(self.filename, self.refresh_columns)
        return self.chart
    

 #Storing the config file
    def store_config(self):
        self.coeff = self.chart.analyze()
        return ConfigClass.create_config_file(self, self.filename,self.selected_column_xaxis.get() , self.selected_column_yaxis.get(),self.firstentry.get(), self.secondentry.get(),self.errorbars.get(), self.selected_order.get()),ConfigClass.logfiles(self) 

    
    def error_prompt(self, text):  
       showinfo(
            title='Input Error',
            message= text
        )

       
       
    #Setting conditions to bind events to their respective names in the combobox
    def insert_order(self, event):
        order = self.orders[self.selected_order.get()]
        self.chart.set_order(order)
        self.store_config()
        self.plot()
       

    
    def change_range(self):
        xstart, xend = self.firstentry.get(), self.secondentry.get()
        print(xstart, xend)
        self.chart.set_range(xstart, xend)
        self.store_config()
        self.plot()
        return True
    
    # react on the errorbar checkbox
    def toggle_errorbars(self):
        self.store_config()
        self.plot()
               
                
    def export(self):

        self.coeff = self.chart.analyze()
        print(self.coeff)
        return export_xml.build_simple_xml(self, self.coeff, self.firstentry.get(), self.secondentry.get())
             
    
     
    def plot(self):
         errorbars = self.errorbars.get()
         q_curves = {}
         p_curves = {}
         for percent in self.centiles:
             q_curves[percent] = self.chart.get_quantile_curve(percent)
             p_curves[percent] = self.chart.get_poly_curve(percent)
         
         xstart, xend = self.firstentry.get(), self.secondentry.get()
         xaxis, yaxis = self.selected_column_xaxis.get() , self.selected_column_yaxis.get()
         self.graph.plot("Percentiles with fitting polynomials",
                         self.centiles,
                         q_curves, p_curves,
                         xaxis, yaxis,
                         xstart, xend,
                         errorbars=errorbars)

        

           
 #Features of the App are created here           
    def build_gui(self):
        
        
        tabControl = ttk.Notebook(self) #Notebook widget manages a collection of windows and displays one at a time.
     
       #Creating window in the App
        tab_graphs = ttk.Frame(tabControl)
        
       #Creating frames in the windows  
        self.ctrl_frame1 = ttk.Frame(tab_graphs)
        self.ctrl_frame1.pack(side=tk.LEFT, expand=True)

       #Adding created window to the Notebook for management
        tabControl.add(tab_graphs, text ='Graphs')
        tabControl.pack(expand = True, fill = tk.BOTH)
        
        
        # Creating an "OPEN BUTTON" to select and read files
        open_button = ttk.Button(self.ctrl_frame1, text='Open a File', 
                                  command=self.select_file)
        open_button.pack(expand=True)
        
       
        #Creating a distinct space in order to print all graphs at the same place
        self.graph = plot.Graph(tab_graphs)
        self.xml = export_xml()
        # self.calc = calculator.plot_calculation()
        
        
        #Creating a Combobox to display Orders of Graphs
        
        label = ttk.Label(self.ctrl_frame1, text="Please select an order:")
        label.pack(expand=True)
        self.selected_order = tk.StringVar()
        self.order_combo = ttk.Combobox(self.ctrl_frame1, textvariable=  self.selected_order, state='readonly')
        self.order_combo.pack(expand=True)
        self.order_combo['values']=list(self.orders.keys()) 
        self.order_combo.bind("<<ComboboxSelected>>", self.insert_order)
            
        
   
        

    
        #Creating Entries
        self.firstentry = tk.IntVar()
        self.secondentry = tk.IntVar()
        
        xstart_label = ttk.Label(self.ctrl_frame1, text="xstart:")
        xstart_label.pack(expand=True)
        self.xstart = ttk.Entry(self.ctrl_frame1, textvariable=self.firstentry)
        self.xstart.pack(expand=True)
        
        xend_label = ttk.Label(self.ctrl_frame1, text="xend:")
        xend_label.pack(expand=True)
        self.xend = ttk.Entry(self.ctrl_frame1, textvariable=self.secondentry)
        self.xend.pack(expand=True)
        
        
        
        
        
        
        #Creating a checkbutton to display error Graph
        display_error_bar = ttk.Checkbutton(self.ctrl_frame1, text='Display Error Graph',
                                           variable=self.errorbars,
                                           command=self.toggle_errorbars)
        display_error_bar.pack(expand=True)



        #Creating a button to Export XML
        export_button = ttk.Button(self.ctrl_frame1, text='Export' , command = self.export)
        export_button.pack(expand=True)



if __name__ == '__main__':
    app = App()
    app.build_gui()
    app.mainloop()