from enum import Enum

# Convert later

class Sheet(str, Enum):
    Commands    = "Commands"
    Events      = "Events"
    Functions   = "Functions"
    Variables   = "Variables"
    Toggles     = "Toggles"
