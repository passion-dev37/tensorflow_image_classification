import io
from flask import Flask, jsonify, request
from skimage import io


# IMPORT FUNCTIONS
from classifications.faceMaskClassification import maskClassification
from classifications.genderClassification import genderClassification
from classifications.catOrDog import catOrDogClassification
from classifications.emotionClassification import emotionClassificationURL
from classifications.glassesClassification import glassesClassificationURL
from classifications.foodClassification import foodClassificationURL
from classifications.dogClassification import dogClassificationURL
from classifications.birdsClassification import birdsClassificationURL
from classifications.wildlifeClassification import wildlifeClassificationURL
from classifications.ageClassification import ageClassificationURL
from classifications.everything import everythingURL
from classifications.flowerClassification import flowerClassificationURL
from helperFunctions.returnArray import returnArray
from fetchLabels import getLabels
app = Flask(__name__)

add='?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmYWNlfGVufDB8fHx8MTYzMjA1MDM4MQ&ixlib=rb-1.2.1&q=80&w=300'
# face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

@app.route('/fetchLabels', methods=['GET', 'POST'])
def sendLabels():
    labelType= request.args['labelsType']
    print('Labeltype is ---------', labelType)
    result= getLabels(labelType)
    return {'labels': result}
            

@app.route('/<classificationType>/urlRoute/<path:url>')
def dynamicRoute(classificationType, url):
    print('------------------------', classificationType)
    if "https://images.unsplash.com/photo" in url:
        url= url+ add 

    try:
        img = io.imread(url)  

    except:
        return {'data': 'ERROR: unable to read image'}
    
    if classificationType == "catvsDog":
        return catOrDogClassification(img)

    elif classificationType == "faceMaskClassification":
        return maskClassification(img)

    elif classificationType == "genderClassification":
        return genderClassification(img)

    elif classificationType == "emotionClassification":
        return emotionClassificationURL(img)

    elif classificationType == "glassesClassification":
        return glassesClassificationURL(img)

    elif classificationType == "foodClassification":
        return foodClassificationURL(img)

    elif classificationType == "dogClassification":
        return dogClassificationURL(img)

    elif classificationType == "birdsClassification":
        return birdsClassificationURL(img)

    elif classificationType == "wildlifeClassification":
        return wildlifeClassificationURL(img)

    elif classificationType == "everything":
        return everythingURL(img)

    elif classificationType == "ageClassification":
        return ageClassificationURL(img)

    elif classificationType == "flowerClassification":
        return flowerClassificationURL(img)

    else:
        return {'data': 'this route does not exist'}

@app.route('/upload-image/<classificationType>', methods=['POST'])
def uploadImageAndClassify(classificationType):
    if request.method != "POST" or not request.files:
        return {'data': 'no files were found'}

    if classificationType == "everything":
        return  everythingURL(returnArray(request))
    
    if classificationType == "faceMaskClassification":
        return  maskClassification(returnArray(request))  

    elif classificationType == "genderClassification":
        return  genderClassification(returnArray(request))

    elif classificationType == "catvsDog":
        return  catOrDogClassification(returnArray(request))  

    elif classificationType == "foodClassification":
        return  foodClassificationURL(returnArray(request))   

    elif classificationType == "flowerClassification":
        return  flowerClassificationURL(returnArray(request))

    else:
        return {'data': 'this route does not exist'}

@app.route('/cropped-image/<classificationType>', methods=['POST'])
def testing(classificationType):
    if request.method != "POST":
        return {'data': 'only POST method is supported'}
    
    dx= int(request.form['dx'])
    dy= int(request.form['dy'])
    dHeight= int(request.form['dHeight'])
    dWidth= int(request.form['dWidth'])
    url= request.form['url']

    img = io.imread(url)  

    croppedImage= img[dy:dy+dHeight, dx:dx+dWidth]

    if classificationType == "catvsDog":
        return catOrDogClassification(croppedImage)

    elif classificationType == "faceMaskClassification":
        return maskClassification(croppedImage)

    elif classificationType == "genderClassification":
        return genderClassification(croppedImage)

    elif classificationType == "emotionClassification":
        return emotionClassificationURL(croppedImage)

    elif classificationType == "glassesClassification":
        return glassesClassificationURL(croppedImage)

    elif classificationType == "foodClassification":
        return foodClassificationURL(croppedImage)

    elif classificationType == "dogClassification":
        return dogClassificationURL(croppedImage)

    elif classificationType == "birdsClassification":
        return birdsClassificationURL(croppedImage)

    elif classificationType == "wildlifeClassification":
        return wildlifeClassificationURL(croppedImage)

    elif classificationType == "everything":
        return everythingURL(croppedImage, isCropped=True)

    elif classificationType == "ageClassification":
        return ageClassificationURL(croppedImage)

    elif classificationType == "flowerClassification":
        return  flowerClassificationURL(croppedImage)

    else:
        return {'data': 'this route does not exist'}


if __name__ == '__main__':
    app.run(debug=True)