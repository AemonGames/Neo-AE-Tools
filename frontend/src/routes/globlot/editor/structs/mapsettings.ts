export interface MapEditorTheme{
    textColor : string,
    gridBackgroundColor : string,
    gridLineColor : string
}

export interface MapViewportSettings{
    showGrid : boolean
    theme : MapEditorTheme
}

export interface MapSettings{
    mapName : string,
    description : string,
    // areaOrIsland
    tileSize : number,
}