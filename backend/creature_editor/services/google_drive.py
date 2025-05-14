from google.oauth2 import service_account
from googleapiclient.discovery import build
import os

def get_images_from_gen():
    scopes = ['https://www.googleapis.com/auth/drive.readonly']
    credentials = service_account.Credentials.from_service_account_file(
        os.getenv('GOOGLE_APPLICATION_CREDENTIALS'), scopes=scopes)
    service = build('drive', 'v3', credentials=credentials)

    # Placeholder for later query
    results = service.files().list(
        q="mimeType contains 'image/'",
        pageSize=10,
        fields="files(id, name)"
    ).execute()

    return results.get('files', [])
