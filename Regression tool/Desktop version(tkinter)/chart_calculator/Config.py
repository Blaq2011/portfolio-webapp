import configparser
import logging


class ConfigClass(object):
    
    
    def __init__(self, config_file):
    
        cfg = configparser.ConfigParser()
        cfg.read(config_file)
        # print(cfg.sections())
        
        # print(config_file)
        ## inline comments apply to the config file
        
        def_sect = "DEFAULT"
        self.filepath          = cfg.get(def_sect, 'filepath') 
        self.first_column     = cfg.get(def_sect, 'first_Column') 
        self.second_column       = cfg.get(def_sect, 'second_Column')
        
        met_sect = "METHOD"
        self.xstart      = cfg.get(met_sect, "xstart") 
        self.xend     = cfg.get(met_sect, "xend") 
        self.errorbar_toggled     = cfg.get(met_sect, "Errorbar_Toggled") 
        self.Order_selected = cfg.get(met_sect, "Order_selected")
        
    def logfiles(self):
            
    
        logging.basicConfig(format='%(levelname)s %(asctime)s %(message)s',
                            filename='Logfiles.log',
                            filemode='a', 
                            level=logging.DEBUG)
        
        
    
        logging.info(80*"-")
        logging.info("Starting my script example_config.py")
        logging.info(80*"-")
        logging.info("read file ToolConfigFile.ini")
        
        try:
            config = ConfigClass(r'ToolConfigFile.ini')
            logging.info(str(config.__dict__))
        except Exception as e:
            logging.error(str(e))
    
    
    def create_config_file(self, filename, xaxis, yaxis,xstart, xend, errorbar, order):
      
        
        cfg = configparser.ConfigParser()
        cfg['DEFAULT'] = {'filepath': str(filename),
                          'first_Column': str( yaxis),
                          'second_Column': str(xaxis)}
        
        cfg['METHOD'] = {'xstart': str( xstart),
                          'xend': str(xend),
                          'Order_selected': str(order),
                          'Errorbar_Toggled': str(errorbar)}
                
        with open('ToolConfigFile.ini', 'w') as self.configfile:
                    cfg.write(self.configfile)
    





























































#######ROUGH


                
      
    # def create_methodconfig_file(self,xstart, xend, coeff):

        
    #     cfg = ConfigParser()
    #     # cfg['DEFAULT'] = {'Filepath': str(filename),
    #     #                   'First_Column': str( yaxis),
    #     #                   'Second_Column': str(xaxis)}
        
    #     cfg['METHOD'] = {'xstart': str( xstart),
    #                      'xend': str(xend),
    #                      'coefficient': str(coeff)}
                
    #     with open('ToolConfigFile.ini', 'w') as configfile:
    #                 cfg.write(configfile)
                          
                
              