import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

from .dyna_cmd_types import DynaCmd
from .sheet_enums import Sheet

def get_google_sheets_service():
    scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    credentials = service_account.Credentials.from_service_account_file(
        os.getenv('GOOGLE_APPLICATION_CREDENTIALS'), scopes=scopes)
    service = build('sheets', 'v4', credentials=credentials)
    return service

def get_dyna_cmd() -> DynaCmd:
    service = get_google_sheets_service()
    sheet = service.spreadsheets()

    spreadsheet_id = os.getenv('SHEET_ID')

    ranges = {
        'commands': f"{Sheet.Commands}!A2:A100",
        'eventTimeOptions': f"{Sheet.Events}!A2:B8",
        'eventTargetOptions': f"{Sheet.Events}!C2:C5",
        'eventConditionReference': f"{Sheet.Events}!D2:E10",
        'eventConditionValue': f"{Sheet.Events}!F1:Q10",
        'functions': f"{Sheet.Functions}!A2:B50",
        'variables': f"{Sheet.Variables}!A2:D100",
        'toggles': f"{Sheet.Toggles}!A2:A50",
    }

    # Grab values (batch get is slightly faster than individual gets)
    data = sheet.values().batchGet(
        spreadsheetId=spreadsheet_id,
        ranges=list(ranges.values()),
        majorDimension="COLUMNS"
    ).execute()

    responses = data.get('valueRanges', [])

    output = DynaCmd(
        Commands=responses[0].get('values', [[]])[0] if responses[0].get('values') else [],
        Events={
            'TimeOptions': responses[1].get('values', []),
            'TargetOptions': responses[2].get('values', [[]])[0] if responses[2].get('values') else [],
            'ConditionReference': responses[3].get('values', []),
            'ConditionValue': responses[4].get('values', [])
        },
        Functions=responses[5].get('values', []),
        Variable=responses[6].get('values', []),
        Toggles=responses[7].get('values', [[]])[0] if responses[7].get('values') else []
    )

    return output
