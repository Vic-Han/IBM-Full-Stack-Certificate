from flask import Flask, request
from flask_cors import CORS, cross_origin
from EmotionDetection.emotion_detection import emotion_detector

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Your existing code...

@app.route('/emotionDetector/<string:text_to_analyze>')
def emotionDetectorRoute(text_to_analyze):
    api_res = emotion_detector(text_to_analyze)
    return (f"For the given statement, the system response is 'anger': {api_res['anger']},"
        f"'disgust': {api_res['disgust']}, 'fear': {api_res['fear']},"
        f"'joy': {api_res['joy']}, and 'sadness': {api_res['sadness']}."
        f"The dominant emotion is {api_res['dominant_emotion']}")

if __name__ == '__main__':
    app.run(debug=True, port = 5000)