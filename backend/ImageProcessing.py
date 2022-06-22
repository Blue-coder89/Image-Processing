from xxlimited import new
import urllib.request # to make the request of the image from the internet
from GrayScale import Greyscale
from PIL import Image
option = input();
urllib.request.urlretrieve("https://cdn1.vectorstock.com/i/1000x1000/37/90/close-up-of-colorful-eyes-cat-vector-23633790.jpg", "./Input.jpg") # To copy the image you get after making request in the local machine
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

