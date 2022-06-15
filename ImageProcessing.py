from xxlimited import new
from GrayScale import Greyscale
from PIL import Image
option = input();
Input = Image.open("./Input.jpg") # image read
Output = Input.copy() # stores the final image
x,y = Input.size 
option = option.upper()
if(option == 'GRAYSCALE'):
    for i in range(x):
        for j in range(y):
            pixel = Input.getpixel((i,j)) # read pixel
            newPixel = Greyscale(pixel) # updates it
            Output.putpixel((i,j),newPixel) # write pixel
    Output.save("./Grayscale.jpg") 

