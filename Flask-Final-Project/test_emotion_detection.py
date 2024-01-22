import unittest
from EmotionDetection.emotion_detection import emotion_detector
class testEmotionDetection(unittest.TestCase):
    def test_joy(self):
        res = emotion_detector("I am glad this happened")["dominant_emotion"]
        self.assertEqual(res, "joy")
    def test_anger(self):
        res = emotion_detector("I am really mad about this")["dominant_emotion"]
        self.assertEqual(res, "anger")
    def test_disgust(self):
        res = emotion_detector("I feel disgusted just hearing about this")["dominant_emotion"]
        self.assertEqual(res, "disgust")
    def test_sadness(self):
        res = emotion_detector("I am so sad about this")["dominant_emotion"]
        self.assertEqual(res, "sadness")
    def test_fear(self):
        res = emotion_detector("I am really afraid that this will happen")["dominant_emotion"]
        self.assertEqual(res, "fear")

