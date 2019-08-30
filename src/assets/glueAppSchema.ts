/**
 * Copyright © 2014-2019 Tick42 OOD
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const schema ={
    "$id": "http://glue42.com/gd/application.json",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "ApplicationConfigSet",
    "description": "Schema describing the set of configurations for applications running in Glue42 Desktop.",
    "type": "array",
    "items": {
        "$ref": "#/definitions/application"
    },
    "definitions": {
        "application": {
            "title": "ApplicationConfig",
            "type": "object",
            "description": "Schema describing the configuration for an application running in Glue42 Desktop.",
            "required": [
                "type",
                "name",
                "details"
            ],
            "additionalProperties": false,
            "properties": {
                "type": {
                    "description": "Type of the application.",
                    "enum": [
                        "window",
                        "activity",
                        "exe",
                        "node",
                        "canvas"
                    ]
                },
                "details": {
                    "description": "Detailed configuration based on the application type.",
                    "oneOf": [
                        {
                            "$ref": "#/definitions/window"
                        },
                        {
                            "$ref": "#/definitions/activity"
                        },
                        {
                            "$ref": "#/definitions/exe"
                        },
                        {
                            "$ref": "#/definitions/node"
                        },
                        {
                            "$ref": "#/definitions/canvas"
                        }
                    ]
                },
                "name": {
                    "description": "Name of the application. Should be unique.",
                    "type": "string"
                },
                "version": {
                    "description": "Version of the application.",
                    "type": "string"
                },
                "title": {
                    "description": "Title used when visualizing the application.",
                    "type": "string"
                },
                "caption": {
                    "description": "User friendly (longer) description that can be used by the Glue42 Desktop clients to show more detailed application information.",
                    "type": "string"
                },
                "configMode": {
                    "description": "Specifies in which Glue42 Desktop configuration mode these applications will be available.",
                    "enum": [
                        "All",
                        "File",
                        "CM"
                    ],
                    "default": "All"
                },
                "tooltip": {
                    "description": "Tooltip (extended description) that will be used when visualizing the application.",
                    "type": "string"
                },
                "autoStart": {
                    "description": "If `true`, the application will auto-start.",
                    "type": "boolean",
                    "default": false
                },
                "runPriority": {
                    "description": "If the `runPriority` property is missing or is zero, the application is considered to be low priority, i.e. all current applications will be low priority until someone changes/sets their `runPriority` configurations.",
                    "type": "number",
                    "default": 0
                },
                "requiresSSO": {
                    "description": "This option is valid for system and auto-start applications and if it is `true`, they will auto-start after a successful SSO login. Note that user applications are always initialized (and this way auto-started) after SSO login., so this option is useless for them",
                    "type": "boolean",
                    "default": false
                },
                "shell": {
                    "description": "This option is valid for system applications and if `true`, the application will start after Glue42 Desktop initialization. Usually, this is a container based web UI application which acts as a Glue42 Desktop client.",
                    "type": "boolean",
                    "default": false
                },
                "ignoreSavedLayout": {
                    "description": "If `true`, the application default layout will not be auto-saved when it is closed and on the next start, if the layout exists, it will be ignored.",
                    "type": "boolean",
                    "default": false
                },
                "ignoreSaveOnClose": {
                    "description": "Deprecated use ignoreSavedLayout instead",
                    "type": "boolean",
                    "default": false
                },
                "shutdownApplicationName": {
                    "description": "Specify another application to be started in order to shut down the current application instances.",
                    "type": "string"
                },
                "activityTarget": {
                    "$ref": "#/definitions/activityTarget"
                },
                "icon": {
                    "description": "URL or the Base64 encoding (only the data part from the URI scheme) of the icon used as a taskbar icon for the application.",
                    "type": "string"
                },
                "disabled": {
                    "description": "If `true`, the application will be disabled.",
                    "type": "boolean",
                    "default": false
                },
                "hidden": {
                    "description": "If `true`, the application will not be visible in the App Manager.",
                    "type": "boolean",
                    "default": false
                },
                "allowMultiple": {
                    "description": "If `true`, multiple instances of the application can be started.",
                    "type": "boolean",
                    "default": true
                },
                "sortOrder": {
                    "description": "Defines the (ascending) order used by Glue42 Desktop when sending user applications list to its clients.",
                    "type": "integer",
                    "default": 1000
                },
                "saveMultipleInstances": {
                    "description": "When `false`, only the last application (or activity) instance will be saved in the default (startup) layout. When `true`, all instances will be saved.",
                    "type": "boolean"
                },
                "service": {
                    "description": "If `true`, the application will not be closed when restoring a layout.",
                    "type": "boolean",
                    "default": false
                },
                "customProperties": {
                    "description": "These name/value pairs are sent to the Glue42 Desktop clients. The Application Manager API exposes them as well, allowing custom UI's to interpret and use the values.",
                    "type": "object"
                }
            }
        },
        "window": {
            "title": "WindowConfig",
            "type": "object",
            "description": "Single window application.",
            "additionalProperties": false,
            "properties": {
                "url": {
                    "description": "Initial URL loaded when a new HTML container host window is created.",
                    "type": "string"
                },
                "name": {
                    "description": "This is a required parameter for the HTML container host `CreateWindow()` call. Glue42 Desktop supports internal macros in the window `name`, in order to have different window names in different scenarios.",
                    "type": "string"
                },
                "isSticky": {
                    "description": "If `true`, the newly created window will participate in sticky window operations.",
                    "type": "boolean",
                    "default": true
                },
                "left": {
                    "description": "Coordinate on the horizontal axis, allows context macros expansion.",
                    "type": "integer",
                    "default": 0
                },
                "top": {
                    "description": "Coordinate on the vertical axis, allows context macros expansion.",
                    "type": "integer",
                    "default": 0
                },
                "width": {
                    "description": "Width of the app window, allows context macros expansion.",
                    "type": "integer",
                    "default": 400
                },
                "height": {
                    "description": "Height of the app window, allows context macros expansion.",
                    "type": "integer",
                    "default": 400
                },
                "allowClose": {
                    "description": "If `false`, the window will not contain a close button.",
                    "type": "boolean",
                    "default": true
                },
                "allowTabClose": {
                    "description": "If `false`, the tab header will not contain a close button.",
                    "type": "boolean",
                    "default": true
                },
                "allowCollapse": {
                    "description": "If `false`, the window will not contain a collapse button.",
                    "type": "boolean",
                    "default": true
                },
                "allowForward": {
                    "description": "If `false`, the window will not contain an activity related forward button.",
                    "type": "boolean",
                    "default": true
                },
                "allowMaximize": {
                    "description": "If `false`, the window will not contain a maximize button.",
                    "type": "boolean",
                    "default": true
                },
                "allowMinimize": {
                    "description": "If `false`,the window will not contain a minimize button.",
                    "type": "boolean",
                    "default": true
                },
                "allowUnstick": {
                    "description": "If `false`, the window will not be able to be unstuck.",
                    "type": "boolean",
                    "default": true
                },
                "allowChannels": {
                    "description": "If `false`, the window will not show the channel selector.",
                    "type": "boolean",
                    "default": false
                },
                "allowLockUnlock": {
                    "description": "If `false`, the window will not contain a lock/unlock button.",
                    "type": "boolean",
                    "default": false
                },
                "autoSnap": {
                    "description": "If `true`, when the move operation ends the window will snap to one of the approaching edges of another window (if any of the approaching edges are marked with red).",
                    "type": "boolean",
                    "default": true
                },
                "autoAlign": {
                    "description": "When `true`, a snapped window will adjust its bounds in order to have equal width/height and/or to occupy the space between other windows (if any).",
                    "type": "boolean",
                    "default": true
                },
                "icon": {
                    "description": "URL or the Base64 encoding (only the data part from the URI scheme) of the icon used as a taskbar icon for the window. If not specified, it will use the icon from the application configuration.",
                    "type": "string"
                },
                "borderColor": {
                    "description": "Can be a colour name, such as \"red\", or a hex-encoded RGB or ARGB value.",
                    "type": "string"
                },
                "backgroundColor": {
                    "description": "Background colour of the Electron window. Can be a 6 or a 3 digit hex value (#7FA or #1A2B30).",
                    "type": "string",
                    "pattern": "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"
                },
                "collapseHeight": {
                    "description": "Defines the height of the window when collapsed.",
                    "type": "number",
                    "default": -1
                },
                "devToolsEnable": {
                    "description": "If `true`, allows opening a developer console (using `F12`) for the new window.",
                    "type": "boolean",
                    "default": true
                },
                "downloadSettings": {
                    "default": {},
                    "$ref": "system.json#/definitions/downloadConfig"
                },
                "isCollapsed": {
                    "description": "If `true`, the window will start collapsed.",
                    "type": "boolean",
                    "default": false
                },
                "isPopup": {
                    "description": "If `true`, the window will open as a pop-up, sharing the lifetime and environment of the opener.",
                    "type": "boolean",
                    "default": false
                },
                "focus": {
                    "description": "If `false`, the window will not take focus when created.",
                    "type": "boolean",
                    "default": true
                },
                "hasMoveAreas": {
                    "description": "If `false`, a window in HTML mode can not be moved.",
                    "type": "boolean",
                    "default": true
                },
                "hasSizeAreas": {
                    "description": "If `false`, a window cannot be resized by dragging its borders, maximizing, etc.",
                    "type": "boolean",
                    "default": true
                },
                "hidden": {
                    "description": "If `true`, the window will start as a hidden window.",
                    "type": "boolean",
                    "default": false
                },
                "historyNavigationEnabled": {
                    "description": "If `true`, will allow users to navigate back (`CTRL+Left`) and forward (`CTRL+Right`) through the web page history.",
                    "type": "boolean",
                    "default": true
                },
                "maxHeight": {
                    "description": "Specify the maximum window height.",
                    "type": "number"
                },
                "maxWidth": {
                    "description": "Specify the maximum window width.",
                    "type": "number"
                },
                "minHeight": {
                    "description": "Specify the minimum window height.",
                    "type": "number",
                    "default": 30
                },
                "minWidth": {
                    "description": "Specify the minimum window width.",
                    "type": "number",
                    "default": 50
                },
                "mode": {
                    "description": "HTML Container window type. Possible values are `flat`, `html`, `tab`.",
                    "enum": [
                        "flat",
                        "tab",
                        "html"
                    ],
                    "type": "string",
                    "default": "flat"
                },
                "serviceWindow": {
                    "description": "A legacy setting which indicates whether the app should be hidden (also provides other relevant settings). Currently not used.",
                    "type": "boolean",
                    "default": false
                },
                "printToPdfSettings": {
                    "type": "object"
                },
                "moveAreaThickness": {
                    "description": "How much of the outer window area is to be considered as a sizing area (meaning you can move the window using it). The string value corresponds to the left, top, right and bottom borders.",
                    "type": "string",
                    "default": "0, 12, 0, 0",
                    "pattern": "^(?:[0-9 ]+,)*[0-9 ]+$"
                },
                "moveAreaTopMargin": {
                    "description": "The HTML Container window can contain a move area thickness top margin. The margin is related to the top border of `moveAreaThickness` only. The string value corresponds to the left, top, right and bottom.",
                    "type": "string",
                    "default": "0, 0, 0, 0",
                    "pattern": "^(?:[0-9 ]+,)*[0-9 ]+$"
                },
                "onTop": {
                    "description": "If `true`, the window will appear on top of the Z-order.",
                    "type": "boolean",
                    "default": false
                },
                "relativeTo": {
                    "description": "The window ID of the window that will be used to relatively position the new window. Can be combined with `relativeDirection`.",
                    "type": "string"
                },
                "relativeDirection": {
                    "description": "Direction (`bottom`, `top`, `left`, `right`) of positioning the window relatively to the `relativeTo` window. Considered only if `relativeTo` is supplied.",
                    "type": "string",
                    "default": "right"
                },
                "showInTaskbar": {
                    "description": "If `false`, the window will not appear in the taskbar.",
                    "type": "boolean",
                    "default": true
                },
                "showTitleBar": {
                    "description": "Whether the window will have a window title bar.",
                    "type": "boolean",
                    "default": true
                },
                "sizeAreaThickness": {
                    "description": "How much of the outer window area is to be considered as a sizing area (meaning you can resize the window using it). The string value corresponds to the left, top, right and bottom borders.",
                    "type": "string",
                    "default": "5, 5, 5, 5",
                    "pattern": "^(?:[0-9 ]+,)*[0-9 ]+$"
                },
                "snappingEdges": {
                    "description": "Specifies the active Sticky Window snapping edges. Possible combinations are: `top`, `left`, `right`, `bottom`, `all` and any combination of them (e.g. `left, right`).",
                    "type": "string",
                    "default": "all"
                },
                "startLocation": {
                    "description": "Window startup location",
                    "oneOf": [
                        {
                            "type": "string",
                            "enum": [
                                "center",
                                "topCenter",
                                "bottomCenter",
                                "leftCenter",
                                "rightCenter",
                                "full",
                                "topFull",
                                "bottomFull",
                                "leftFull",
                                "rightFull"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "location": {
                                    "type": "string",
                                    "enum": [
                                        "center",
                                        "topCenter",
                                        "bottomCenter",
                                        "leftCenter",
                                        "rightCenter",
                                        "full",
                                        "topFull",
                                        "bottomFull",
                                        "leftFull",
                                        "rightFull"
                                    ]
                                },
                                "display": {
                                    "description": "The identifying number of the monitor (e.g., 1, 2, 3 or \"main\")",
                                    "type": "string"
                                }
                            },
                            "additionalProperties": false
                        }
                    ]
                },
                "frameColor": {
                    "description": "Specifies the sticky frame color. Accepts hex color as a string (e.g., `#666666`) or named HTML colors (e.g., `red`)",
                    "type": "string"
                },
                "stickyFrameColor": {
                    "description": "Specifies the color that indicates on which side the windows will stick.",
                    "type": "string",
                    "default": "#5b8dc9"
                },
                "stickyGroup": {
                    "description": "If set, the sticky window can only stick to windows that belong to the same group.",
                    "type": "string",
                    "default": "Any"
                },
                "tabGroupId": {
                    "description": "Specifies the tab group ID. If two or more tab windows are defined with same ID, they will be hosted in the same tab window.",
                    "type": "string"
                },
                "tabIndex": {
                    "description": "Specifies the tab position index. Tab windows in the same tab group are ordered by their position index. Use negative index to make the tab active.",
                    "type": "number"
                },
                "tabSelected": {
                    "description": "Tab selected.",
                    "type": "boolean",
                    "default": true
                },
                "tabTitle": {
                    "description": "Tab title.",
                    "type": "string",
                    "default": ""
                },
                "tabWidth": {
                    "description": "Specifies the tab width.",
                    "type": "number",
                    "default": 0
                },
                "hideTabHeader": {
                    "description": "Hides the tab header.",
                    "type": "boolean",
                    "default": false
                },
                "tabToolTip": {
                    "description": "Tab tooltip.",
                    "type": "string",
                    "default": ""
                },
                "title": {
                    "description": "Sets the window title. To work properly, there should be a title HTML tag in the page.",
                    "type": "string"
                },
                "loader": {
                    "description": "Object that defines loader behavior.",
                    "type": "object",
                    "additionalProperties": false,
                    "default": {},
                    "properties": {
                        "enabled": {
                            "description": "If `true`, enables page loaders.",
                            "type": "boolean",
                            "default": true
                        },
                        "type": {
                            "description": "The loader animation type. Check \"Loader Animations\" for possible options.",
                            "type": "string",
                            "default": "DoubleBounce"
                        },
                        "background": {
                            "description": "Changes the background of the loader page. Accepts hex color as a string (e.g., `#666666`) or named HTML colors (e.g., `red`).",
                            "type": "string",
                            "default": "#1C2D3B"
                        },
                        "speed": {
                            "description": "Changes the animation speed. A bigger number means faster animation.",
                            "type": "number",
                            "default": 1
                        },
                        "size": {
                            "description": "Use this to set an absolute size to the loader animation in pixels. Note that not all loader types support that setting.",
                            "type": "number",
                            "default": 1
                        },
                        "sizeFactor": {
                            "description": "Use this to set the size of the loader animation as a factor of the window size.",
                            "type": "number",
                            "default": 0.3
                        },
                        "hideOnLoad": {
                            "description": "Use this to hide the loader once the page is loaded.",
                            "type": "boolean",
                            "default": true
                        },
                        "text": {
                            "description": "Use this to display text on the loading page.",
                            "type": "string",
                            "default": "Loading"
                        },
                        "textSize": {
                            "description": "Use this to set loader text font size.",
                            "type": "number",
                            "default": 12
                        },
                        "textColor": {
                            "description": "Use this to set loader text color. Accepts hex color as a string (e.g., `#666666`) or named HTML colors (e.g., `red`).",
                            "type": "string",
                            "default": "#F1F1F1"
                        }
                    }
                },
                "useRandomFrameColor": {
                    "description": "If `true`, will set a random (from a predefined list of colors) frame color to the new window.",
                    "type": "boolean",
                    "default": false
                },
                "windowState": {
                    "description": "If set, the window will start in the specified state (maximized, minimized, normal).",
                    "type": "string",
                    "default": "normal"
                },
                "injectGlue": {
                    "description": "This is `true`/`false` or an object that will be used to initiate Glue42.",
                    "type": "object",
                    "required": [
                        "version"
                    ],
                    "additionalProperties": false,
                    "properties": {
                        "version": {
                            "type": "string",
                            "description": "Can be a version string."
                        },
                        "autoInit": {
                            "default": false,
                            "oneOf": [
                                {
                                    "type": "boolean"
                                },
                                {
                                    "type": "object",
                                    "additionalProperties": true
                                }
                            ]
                        }
                    }
                },
                "context": {
                    "description": "Custom object associated with the window.",
                    "type": "object"
                },
                "autoOpenDevTools": {
                    "description": "If set, dev tools will start automatically.",
                    "type": "boolean",
                    "default": false
                },
                "processAffinity": {
                    "description": "Controls process reuse.",
                    "default": true,
                    "oneOf": [
                        {
                            "description": "Whether process reuse is enabled for that window.",
                            "type": "boolean"
                        },
                        {
                            "description": "Process affinity tag (windows with the same tag will be merged together).",
                            "type": "string"
                        }
                    ]
                },
                "sfMode": {
                    "description": "Set to `true` to run the window in Salesforce mode (resolving the issues preventing Salesforce to run in a desktop container).",
                    "type": "boolean",
                    "default": false
                },
                "registerHtmlContainer": {
                    "description": "Whether to inject the `htmlContainer` object. It will be used for legacy applications.",
                    "type": "boolean",
                    "default": false
                },
                "channelId": {
                    "description": "ID of the channel.",
                    "type": "string"
                },
                "canvasPlacement": {
                    "$ref": "#/definitions/canvasPlacement"
                },
                "contextMenuEnabled": {
                    "description": "When set to `true`, will enable the native browser context menu.",
                    "type": "boolean"
                },
                "contextMenuMode": {
                    "description": "Supported values: `native` and `custom`. If `native`, then the native menu will be shown. Otherwise, an Interop method will be invoked with context menu and spell check info.",
                    "type": "string",
                    "default": "native"
                },
                "security": {
                    "$ref": "system.json#/definitions/securityConfig"
                }
            },
            "required": [
                "url"
            ]
        },
        "activity": {
            "title": "activityConfig",
            "type": "object",
            "description": "Defines an activity as a set of activity window types. Also defines the other activity related parameters (like layout and initial context).",
            "additionalProperties": false,
            "properties": {
                "activityType": {
                    "type": "string"
                },
                "owner": {
                    "$ref": "#/definitions/activityWindow"
                },
                "windows": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/activityWindow"
                    }
                },
                "layout": {
                    "$ref": "#/definitions/activityLayout"
                },
                "initialContext": {
                    "description": "Initial activity context in a JSON format (not parsed for now and used as is).",
                    "type": "object"
                },
                "hideGroupHeader": {
                    "description": "If `true`, there will be no header for any window groups that are in the activity window.",
                    "type": "boolean"
                },
                "autoSaveContext": {
                    "description": "Activity context can be saved as part of a saved layout. The activity owner window (the JavaScript code) can register a callback to describe the members of the context that should be saved. If no handler is registered, then by default no activity context will be saved. By using this option and setting its value to `true`, the user has an option to save activity context for legacy applications (i.e. these that haven't registered such callbacks).",
                    "type": "boolean"
                },
                "saveOwnerOnly": {
                    "description": "When an activity application is saved, by default only the activity owner window information will be stored. This will \"work out of the box\" for legacy activities that don’t support saving/restoring layouts and contexts. When this is `false`, all activity windows (or the ones configured using the options below) will be saved.",
                    "type": "boolean",
                    "default": true
                },
                "includeTypesToLayout": {
                    "description": "Comma separated list of window types which should be included in the activity application auto-saved layout.",
                    "type": "string"
                },
                "ignoreTypesFromLayout": {
                    "description": "Comma separated list of window types which should be excluded from the activity application auto-saved layout. Note that `ignoreTypesFromLayout` has priority, i.e. if a window type is defined in both lists, it will be excluded. Also, if `includeTypesToLayout` is specified but not `ignoreTypesFromLayout`, then the types in the `includeTypesToLayout` list will be included in the layout and the rest will be excluded and vice versa.",
                    "type": "string"
                }
            },
            "required": [
                "owner"
            ]
        },
        "exe": {
            "title": "EXEConfig",
            "type": "object",
            "description": "Executable application. Could be anything that the OS can execute via the appropriate system calls.",
            "additionalProperties": false,
            "properties": {
                "showConsole": {
                    "description": "If `true`, the console will be visible.",
                    "type": "boolean",
                    "default": false
                },
                "useShellExecute": {
                    "description": "If `true`, `path` is not used (and must be empty) and the specified command can contain a well known resource type (like URL) which will be executed via the \"shell execute\" option, i.e. using the associated application. Note that `useShellExecute=true` is not compatible with `trackingType=Environment`.",
                    "type": "boolean",
                    "default": false
                },
                "path": {
                    "description": "This is the working directory of the target application/script and could either be relative to the Glue42 Desktop startup directory, or an absolute path. The path must exist and will be combined with the command parameter, if it doesn’t contain a root drive. Required, if `shellExecute` is false, otherwise must be empty.",
                    "type": "string"
                },
                "command": {
                    "description": "This is the target application/script that will be executed (when `useShellExecute=false`) or a resource that will be opened via an associated application if `useShellExecute=true`. When `useShellExecute=false`, a command target file must exist. It could contain relative (to the Glue42 Desktop startup folder) or an absolute file path.",
                    "type": "string"
                },
                "parameters": {
                    "description": "Optional parameters that will be used when starting the target application/script or opening the resource. The content is used as is, no checks performed.",
                    "type": "string"
                },
                "windowStyle": {
                    "description": "Specifies the target's main window style (if supported).",
                    "enum": [
                        "Normal",
                        "Hidden",
                        "Minimized",
                        "Maximized"
                    ],
                    "default": "Normal"
                },
                "trackingType": {
                    "description": "Specifies how to track the lifetime of the target application process , i.e. to determine when it is started and stopped.",
                    "enum": [
                        "None",
                        "Process",
                        "Environment",
                        "Monitor",
                        "AGM"
                    ],
                    "default": "Process"
                },
                "targetProcess": {
                    "description": "Specifies the target process name which should be found and checked for passed special environment values, this way finding the stated process ID. Used when `trackingType=Environment`.",
                    "type": "string"
                },
                "passGlueToken": {
                    "description": "This option is valid for external user applications and if it is `true`, when they are started a valid GW3 token will be sent.",
                    "type": "boolean",
                    "default": false
                },
                "glueTokenArgument": {
                    "description": "The name of the token argument.",
                    "type": "string",
                    "default": "--token"
                },
                "left": {
                    "description": "Coordinate on the horizontal axis, allows context macros expansion.",
                    "type": "integer",
                    "default": 0
                },
                "top": {
                    "description": "Coordinate on the vertical axis, allows context macros expansion.",
                    "type": "integer",
                    "default": 0
                },
                "width": {
                    "description": "Width of the app window, allows context macros expansion.",
                    "type": "integer",
                    "default": 400
                },
                "height": {
                    "description": "Height of the app window, allows context macros expansion.",
                    "type": "integer",
                    "default": 400
                },
                "tabGroupId": {
                    "description": "Specifies the tab group ID. If two or more tab windows are defined with same ID, they will be hosted in the same tab window.",
                    "type": "string"
                },
                "mode": {
                    "description": "HTML Container window type. Possible values are `flat`, `html`, `tab`.",
                    "enum": [
                        "flat",
                        "tab",
                        "html"
                    ],
                    "type": "string",
                    "default": "flat"
                },
                "tabIndex": {
                    "description": "Specifies the tab position index. Tab windows in the same tab group are ordered by their position index. Use negative index to make the tab active.",
                    "type": "number"
                },
                "relativeTo": {
                    "description": "The window ID of the window that will be used to relatively position the new window. Can be combined with `relativeDirection`",
                    "type": "string"
                },
                "relativeDirection": {
                    "description": "Direction (`bottom`, `top`, `left`, `right`) of positioning the window relatively to the `relativeTo` window. Considered only if `relativeTo` is supplied.",
                    "type": "string",
                    "default": "right"
                },
                "allowChannels": {
                    "description": "If `false`, the window will not show the channel selector.",
                    "type": "boolean",
                    "default": false
                },
                "channelId": {
                    "description": "ID of the channel.",
                    "type": "string"
                },
                "canvasPlacement": {
                    "$ref": "#/definitions/canvasPlacement"
                },
                "logging": {
                    "description": "If `true`, the `stdout` and `stderr` will be saved in the log folder under the `application` folder with the name of the application.",
                    "type": "boolean",
                    "default": false
                },
                "startFailedMessage": {
                    "description": "Error message that should be displayed to users if the `exe` fails to start.",
                    "type": "string"
                }
            }
        },
        "node": {
            "title": "NodeConfig",
            "type": "object",
            "description": "Node application",
            "additionalProperties": false,
            "properties": {
                "showConsole": {
                    "description": "If `true`, the console of the Node.js script will be visible,",
                    "type": "boolean",
                    "default": false
                },
                "path": {
                    "description": "This is the path to the JavaScript file to be executed in `Node.js`.",
                    "type": "string"
                },
                "passGlueToken": {
                    "description": "If `true`, when the app is started, a valid GW3 token will be set as an environment variable - `gwToken`.",
                    "type": "boolean",
                    "default": false
                },
                "debug": {
                    "description": "Enable debugging. Same as inspect.",
                    "default": false,
                    "oneOf": [
                        {
                            "description": "Enable debugging on the default port 9229.",
                            "type": "boolean"
                        },
                        {
                            "description": "Enable debugging on port.",
                            "type": "string",
                            "additionalProperties": false
                        }
                    ],
                    "additionalProperties": false
                },
                "inspect": {
                    "description": "Enable the inspector agent. If `boolean`, listens on the default address and port (127.0.0.1:9229). If `number`, listens on the port number.",
                    "default": false,
                    "oneOf": [
                        {
                            "description": "Enable debugging on the default port 9229.",
                            "type": "boolean"
                        },
                        {
                            "description": "Enable debugging on port.",
                            "type": "number",
                            "additionalProperties": false
                        }
                    ],
                    "additionalProperties": false
                },
                "inspectBrk": {
                    "description": "Enable the inspector agent and break before the user code starts. If `boolean`, listens on the default address and port (127.0.0.1:9229). If `number`, listens on the port number.",
                    "default": false,
                    "oneOf": [
                        {
                            "description": "Enable debugging on the default port 9229.",
                            "type": "boolean"
                        },
                        {
                            "description": "Enable debugging on port.",
                            "type": "number",
                            "additionalProperties": false
                        }
                    ],
                    "additionalProperties": false
                },
                "parameters": {
                    "description": "Optional parameters that will be used when starting the application/script.",
                    "type": "string"
                }
            }
        },
        "activityWindow": {
            "title": "activityWindow",
            "type": "object",
            "description": "A window which takes part in an activity and may or may not be the owner.",
            "additionalProperties": false,
            "properties": {
                "type": {
                    "description": "The application identifier.",
                    "type": "string"
                },
                "name": {
                    "description": "The name of the application.",
                    "type": "string"
                },
                "left": {
                    "description": "Coordinate on the horizontal axis.",
                    "type": "integer"
                },
                "top": {
                    "description": "Coordinate on the vertical axis.",
                    "type": "integer"
                },
                "width": {
                    "description": "Width of the app window.",
                    "type": "integer",
                    "default": 400
                },
                "height": {
                    "description": "Height of the app window.",
                    "type": "integer",
                    "default": 400
                }
            },
            "required": [
                "type",
                "name",
                "left",
                "top",
                "width",
                "height"
            ]
        },
        "activityLayout": {
            "title": "activityLayout",
            "type": "object",
            "description": "Specifies the `mode` and `cellSize` of the layout.",
            "additionalProperties": false,
            "properties": {
                "mode": {
                    "enum": [
                        "pixels",
                        "percents"
                    ],
                    "default": "pixels"
                },
                "cellSize": {
                    "type": "integer",
                    "default": 1
                },
                "cellWidth": {
                    "type": "integer"
                },
                "cellHeight": {
                    "type": "integer"
                },
                "screen": {
                    "default": "main",
                    "type": [
                        "string",
                        "integer"
                    ],
                    "description": "Can specify the target screen by index or \"main\" to indicate the primary display device."
                }
            }
        },
        "activityTarget": {
            "title": "activityTarget",
            "type": "object",
            "description": "Specifies how this application will be registered as an activity window.",
            "additionalProperties": false,
            "properties": {
                "enabled": {
                    "description": "Whether to register the application as an activity window.",
                    "type": "boolean",
                    "default": false
                },
                "windowType": {
                    "description": "Specifies the activity window type that will be associated with this application, i.e. when there is a request from the activity manager to create this type, an application instance is started. Defaults to the application name.",
                    "type": "string"
                },
                "isIndependent": {
                    "description": "Whether this activity window type can act as an independent window, i.e. to belong to any activity.",
                    "type": "boolean",
                    "default": false
                }
            },
            "required": [
                "enabled"
            ]
        },
        "canvas": {
            "title": "canvasConfig",
            "type": "object",
            "description": "Defines a canvas layout.",
            "additionalProperties": false,
            "properties": {
                "lanes": {
                    "type": "number"
                },
                "horizontal": {
                    "type": "boolean"
                },
                "launcherApp": {
                    "type": "string"
                },
                "detailWindow": {
                    "type": "string"
                },
                "caption": {
                    "type": "string"
                },
                "workspace": {
                    "type": "string"
                },
                "workspaceTitle": {
                    "type": "string"
                },
                "workspaceContext": {
                    "type": "object"
                },
                "autoStartLauncherApp": {
                    "type": "boolean",
                    "default": true
                },
                "icon": {
                    "type": "string"
                },
                "apps": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/canvasApplication"
                    }
                },
                "ignoreSavedLayout": {
                    "type": "boolean",
                    "default": false
                },
                "bounds": {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "left": {
                            "description": "Coordinate on the horizontal axis.",
                            "type": "integer"
                        },
                        "top": {
                            "description": "Coordinate on the vertical axis.",
                            "type": "integer"
                        },
                        "width": {
                            "description": "Width of the app window.",
                            "type": "integer"
                        },
                        "height": {
                            "description": "Height of the app window.",
                            "type": "integer"
                        }
                    }
                },
                "windowState": {
                    "description": "If set, the window will start in the specified state (maximized, minimized, normal)",
                    "type": "string"
                }
            },
            "required": [
                "lanes"
            ]
        },
        "canvasApplication": {
            "title": "canvasApplicationConfig",
            "type": "object",
            "description": "Defines a canvas application",
            "additionalProperties": false,
            "properties": {
                "name": {
                    "type": "string"
                },
                "lane": {
                    "type": "number"
                },
                "positionInLane": {
                    "type": "number"
                },
                "showCaption": {
                    "type": "boolean"
                },
                "showFrame": {
                    "type": "boolean"
                },               
                "tabGroup": {
                    "type": "string"
                },
                "tabTitle": {
                    "type": "string"
                },
                "height": {
                    "type": "number"
                },
                "maxHeight": {
                    "type": "number"
                },
                "minHeight": {
                    "type": "number"
                },
                "width": {
                    "type": "number"
                },
                "maxWidth": {
                    "type": "number"
                },
                "minWidth": {
                    "type": "number"
                },
                "selected": {
                    "type": "boolean"
                },
                "tabIndex": {
                    "type": "number"
                },
                "maximized": {
                    "type": "boolean"
                },
                "inMaximizedTab": {
                    "type": "boolean"
                },
                "tabAllowDrop": {
                    "type": "boolean"
                },
                "tabAllowExtract": {
                    "type": "boolean"
                },
                "disableTileMode": {
                    "type": "boolean"
                }
            },
            "required": [
                "name",
                "lane"
            ]
        },
        "canvasPlacement": {
            "title": "CanvasPlacementConfig",
            "type": "object",
            "properties": {
                "frameId": {
                    "type": "string"
                },
                "canvasId": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "lane": {
                    "type": "number"
                },
                "positionInLane": {
                    "type": "number"
                },
                "showCaption": {
                    "type": "boolean"
                },
                "showFrame": {
                    "type": "boolean"
                },
                "showBorder": {
                    "type": "boolean"
                },
                "tabGroup": {
                    "type": "string"
                },
                "tabTitle": {
                    "type": "string"
                },
                "height": {
                    "type": "number"
                },
                "fixedHeight": {
                    "type": "number"
                },
                "maxHeight": {
                    "type": "number"
                },
                "minHeight": {
                    "type": "number"
                },
                "width": {
                    "type": "number"
                },
                "fixedWidth": {
                    "type": "number"
                },
                "maxWidth": {
                    "type": "number"
                },
                "minWidth": {
                    "type": "number"
                },
                "selected": {
                    "type": "boolean"
                },
                "tabIndex": {
                    "type": "number"
                },
                "maximized": {
                    "type": "boolean"
                },
                "inMaximizedTab": {
                    "type": "boolean"
                },
                "tabAllowDrop": {
                    "type": "boolean"
                },
                "tabAllowExtract": {
                    "type": "boolean"
                },
                "disableTileMode": {
                    "type": "boolean"
                },
                "canvasWindowId": {
                    "type": "string"
                },
                "channelId": {
                    "type": "string"
                },
                "context": {
                    "type": "object"
                },
                "activityType": {
                    "type": "string"
                },
                "activityId": {
                    "type": "string"
                },
                "activityWindowType": {
                    "type": "string"
                },
                "isOwner": {
                    "type": "boolean"
                },
                "laneAllowDrop": {
                    "type": "boolean"
                },
                "laneAllowResize": {
                    "type": "boolean"
                }
            },
            "additionalProperties": false
        }
    }
};

export default schema;