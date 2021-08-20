# Mini-project-Trickk
The project aims at implementing Image Steganography through a Web Application which enable users to hide an image inside the other image by uploading them. The user can also obtain the original images by uploading the encoded image.
The web application is protected using login credentials and the functionalities of encrypting and decrypting can only be accessed after logging in. The user can only see the images that were uploaded and processed through his account.
The Web Application is developed using Django framework for back-end and React.js framework for front-end. Image processing is powered by OpenCV and Pillow libraries of Python. The RESTful API architecture is supported by Django-Rest-Framework while the token authentication uses Django-Knox.

##List of API Routes used:
1. 'api/auth/register/': To register new user
2. 'api/auth/login/': To login a user using username and password.
3. 'api/auth/user/': To check if any user is logged in or not.
4. 'api/auth/logout/': To logout a user.
5. 'api/decrypt/': To decrypt an encrypted image.
6. 'api/encrypt/': To encrypt an image using other image.

##Algorithm:
There are numerous algorithms available for image steganography. For the implementation of this project we have opted the Least Significant Bit Steganography (LSB) technique. Each pixel has three values (RGB), each RGB value is 8-bit and the rightmost bits are least significant. So, if we change the rightmost bits it will have a small visual impact on the final image. This is the steganography key to hide an image inside another. Change the least significant bits from an image and include the most significant bits from the other image.

##References:
1. Alaa A. Jabbar Altaay, Shahrin bin Sahib, Mazdak Zamani “An Introduction to Image Steganography Techniques” November 2012 Conference: International Conference on Advanced Computer Science Applications and TechnologiesAt: Kuala Lumpur, MalaysiaVolume: ACSAT’12
2.	Ramadhan Mstafa, Christian Bach “Information Hiding in Images using Steganography Techniques” 2013 ASEE Northeast Section Conference
3.	Nagham Hamid, Abid Yahya, R. Badlishah Ahmad, Osamah M. Al-Qershi “Image Steganography Techniques: An Overview” International Journal of Computer Science and Security (IJCSS), Volume (6): Issue (3): 2012
4.	Arun Kumar Singh, Juhi Singh, Dr. Harsh Vikram Singh “Steganography in Images Using LSB Technique ” International Journal of Latest Trends in Engineering and Technology (IJLTET)
5.	https://www.geeksforgeeks.org/lsb-based-image-steganography-using-matlab/
6.	https://towardsdatascience.com/hiding-data-in-an-image-image-steganography-using-python-e491b68b1372
