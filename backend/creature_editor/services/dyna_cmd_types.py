from typing import List, Dict

# Might make into a model later

# This file contains the DynaCmd class, which is used to represent a dynamic command in the game.
class DynaCmd:
    def __init__(
        self,
        Commands: List[str],
        Events: Dict[str, List],
        Functions: List[List[str]],
        Variable: List[List[str]],
        Toggles: List[str]
    ):
        self.Commands = Commands
        self.Events = Events
        self.Functions = Functions
        self.Variable = Variable
        self.Toggles = Toggles
