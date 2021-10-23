import tensorflow as tf

foodClassification101   = tf.keras.models.load_model('./models/foodClassificationMobilenetv2.h5') # input shape of (224, 224, 3)
masknet                 = tf.keras.models.load_model('./models/faceMaskClassificationNasNetModel224.h5') # input shape of (224, 224, 3)
genderModel             = tf.keras.models.load_model('./models/GenderModal.h5') # input shape of (150, 150, 3)
emotionClassification   = tf.keras.models.load_model('./models/emotionDetection.h5') # input shape of (48, 48, 1)   
glassesModel            = tf.keras.models.load_model('./models/glassesDetection.h5') # input shape of (160, 160, 3)
ageClassifier           = tf.keras.models.load_model('./models/ageXception80.h5') # input shape of (80, 80, 1)   
birdsClassification     = tf.keras.models.load_model('./models/birdClassificationNasNetModel224.h5') # input shape of (224, 224, 3)
catVsDogModel           = tf.keras.models.load_model('./models/catVsDogMobilenetv224.h5') # input shape of (224, 224, 3)
dogClassification       = tf.keras.models.load_model('./models/dogClassificationNasNetModel224(78).h5') # input shape of (224, 224, 3)
flowerClassification    = tf.keras.models.load_model('./models/flower299NASnet244(76).h5') # input shape of (224, 224, 3)
wildlifeClassification  = tf.keras.models.load_model('./models/oregonWildlife224(92).h5') # input shape of (224, 224, 3)

dogInterpreter          = tf.lite.Interpreter(model_path = './models_quantized/dogClassificationMobileNet224(78)_quantized.tflite')
genderInterpreter       = tf.lite.Interpreter(model_path = './models_quantized/GenderModal_quantized.tflite')
maskInterpreter         = tf.lite.Interpreter(model_path = './models_quantized/faceMaskClassificationNasNetModel224_quantized.tflite')
catVsDogInterpreter     = tf.lite.Interpreter(model_path = './models_quantized/catVsDogMobilenetv224_quantized.tflite')
glassesInterpreter      = tf.lite.Interpreter(model_path = './models_quantized/glassesDetection_quantized.tflite')
birdsInterpreter        = tf.lite.Interpreter(model_path = './models_quantized/birdClassificationMobileNet224_quantized.tflite')
flwersInterpreter       = tf.lite.Interpreter(model_path = './models_quantized/flower299MobileNet244(76)_quantized.tflite')
wildlifeInterpreter     = tf.lite.Interpreter(model_path = './models_quantized/oregonWildlife224(92)_quantized.tflite')
emotionInterpreter      = tf.lite.Interpreter(model_path = './models_quantized/emotionDetection_quantized.tflite')
foodInterpreter         = tf.lite.Interpreter(model_path = './models_quantized/foodClassificationMobilenetv2_quantized.tflite')
