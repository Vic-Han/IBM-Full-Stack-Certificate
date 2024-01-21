import requests
def emotion_detector(text_to_analyze):
    url = 'https://sn-watson-emotion.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/EmotionPredict'
    headers = {
        "grpc-metadata-mm-model-id" : "emotion_aggregated-workflow_lang_en_stock"
    } 
    json = {
        "raw_document" : {
            "text" : text_to_analyze
        }
    }
    
    response = requests.post(url, headers=headers, json=json)
    response = response.json()
    anger_score = response["emotionPredictions"][0]["emotion"]["anger"]
    disgust_score = response["emotionPredictions"][0]["emotion"]["disgust"]
    fear_score = response["emotionPredictions"][0]["emotion"]["fear"]
    sadness_score = response["emotionPredictions"][0]["emotion"]["sadness"]
    joy_score = response["emotionPredictions"][0]["emotion"]["joy"]
    
    dominant_emotion = "anger"
    dominant_score = anger_score
    if disgust_score > dominant_score:
        dominant_emotion = "disgust"
        dominant_score = disgust_score
    if fear_score > dominant_score:
        dominant_emotion = "fear"
        dominant_score = fear_score
    if sadness_score > dominant_score:
        dominant_emotion = "sadness"
        dominant_score = sadness_score
    if joy_score > dominant_score:
        dominant_emotion = "joy"
        dominant_score = joy_score
    result = {
        "anger" : anger_score,
        "disgust" : disgust_score,
        "fear" : fear_score,
        "joy" :joy_score,
        "sadness" : sadness_score,
        "dominant_emotion" : dominant_emotion
    }
    return result