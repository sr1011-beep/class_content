# c:\temp\my_package\main.py

# import os

# print(os.environ.get("PYTHONPATH", None))

# import gsc

# print(gsc.g1.name)
# print(gsc.g2.name)
# print(gsc.g3.name)

# import gsc # namespace package

# print(gsc.g1.name)

# import gsc.sub_gsc.sub_g1 as sub_g1

# print(sub_g1.name)

import sys

sys.path.append(r"C:\Temp\company_package")


import gsc.sub2_gsc.c_module as cm

print(cm.name)