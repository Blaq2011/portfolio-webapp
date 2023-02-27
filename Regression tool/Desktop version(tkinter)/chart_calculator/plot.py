import tkinter as tk
import matplotlib as plt
plt.use('TkAgg')
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import (
    FigureCanvasTkAgg,
    NavigationToolbar2Tk
)


class Graph(Figure):

    def __init__(self, root):
        super().__init__(figsize=(6, 4), dpi=100)

        # create FigureCanvasTkAgg object
        self.figure_canvas = FigureCanvasTkAgg(self, root)

        # create the toolbar
        NavigationToolbar2Tk(self.figure_canvas, root)
        self.ax = self.add_subplot()
        # Creating a Canvas for the graph to be printed on
        self.figure_canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)

   
    def plot(self, title, percentiles, 
             q_curves, p_curves, 
             xaxis, yaxis, xstart, xend, 
             errorbars=False):
        
        self.ax.cla()  # This clears the axis for new graph to be printed each time the order is changed

        # create axes
        self.ax.set_title(title)
        self.ax.set_xlabel(xaxis)
        self.ax.set_ylabel(yaxis)
            
        for percent in percentiles:
            color = percentiles[percent]
            q = q_curves[percent]
            p = p_curves[percent]
            self.ax.plot(p.x, p.y, color=color)
            if errorbars:
                self.ax.errorbar(q.x, q.y, fmt='.', yerr=[q.err_low, q.err_high], color="black")
            else:
                self.ax.scatter(q.x, q.y,  10, color="black")
            
        self.ax.set_xbound(xstart, xend)
        self.ax.grid()

        self.figure_canvas.draw()
