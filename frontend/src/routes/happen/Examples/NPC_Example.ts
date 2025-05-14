

// Each arg should be preceeded by a type followed by an underscore

enum Character_Expression {
  "Neutral",
  "Angry",
  "Confused",
  "Happy",
  "Sad",
  "Surprised",
  "Smile",
}

enum Direction {
  "None",
  "Up",
  "Down",
  "Left",
  "Right"
}

enum Speed {
  "Slow",
  "Normal",
  "Fast"
}

export const enum_dict : object = {
  expression: Character_Expression,
  num : 3
}




export const npc_sample = {
    "sequence": [
      {
        "action": "Speak",
        "args":{
            "ctx-enum_character_id": 1,
            "enum_expression": 2,
            "string_dialogue": "Now where were they..."
        }
      },
      {
        "action": "Move",
        "args":{
            "enum_direction": "Right",
            "int_steps": 3
        }
      },
      {
        "action": "Async",
        "sequence": [
          {
            "action": "Speak",
            "args":{
                "character_id": 1,
                "enum_expression": 0,
                "string_dialogue": "Maybe over here...",
                "enum_speed": "Slow"
            }
          }
        ]
      },
      {
        "action": "Move",
        "args":{
            "enum_direction": "Left",
            "int_steps": 3
        }
      },
      {
        "action": "Await"
      },
      {
        "action": "Delay",
        "args":{
            "time": 2
        }
      },
      {
        "action": "Speak",
        "args":{
            "character_id": 1,
            "enum_expression": "Surprised",
            "string_dialogue": "Aha!"
        }
      },
      {
        "action": "MoveTo",
        "args":{
            "position": {
                "x": "Player.x",
                "y": "Player.y - 1"
            }
        }
      },
      {
        "action": "Speak",
        "args":{
            "character_id": 1,
            "expression": "Smile",
            "dialogue": "Here, gonna need these right?"
        }
      },
      {
        "action": "GiveItemToPlayer",
        "args":{
            "item": "Hedron_Basic",
            "quantity": 5
        }
      },
      {
        "action": "MsgBox",
        "args":{
            "message": "Hedrons can be used to capture Aemon. \nHead in the tall grass to give them a try!",
            "image": "Tutorial_GIF"
        }
      }
    ]
  }
